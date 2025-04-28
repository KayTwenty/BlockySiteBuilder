"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardClient() {
  const { data: session } = useSession();
  const [sites, setSites] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSites() {
      if (!session?.user?.id) return;

      const res = await fetch("/api/my-sites");
      const data = await res.json();
      setSites(data.sites || []);
    }

    fetchSites();
  }, [session?.user?.id]);

  async function handleDelete(siteId: string) {
    const confirmed = confirm("Are you sure you want to delete this site?");
    if (!confirmed) return;

    const res = await fetch(`/api/my-sites?id=${siteId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setSites((prev) => prev.filter((site) => site.id !== siteId));
    } else {
      alert("Failed to delete site");
    }
  }

  return (
    <div className="min-h-screen p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {session?.user?.email ?? "Loading..."}
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Create Site Button */}
      <div className="mb-6">
        <Link href="/editor">
          <button className="bg-blue-500 text-white p-3 rounded">
            + Create New Site
          </button>
        </Link>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.length === 0 ? (
          <p>No sites yet. Create your first one!</p>
        ) : (
          sites.map((site) => (
            <div
              key={site.id}
              className="border p-6 rounded-lg shadow hover:shadow-lg transition relative"
            >
              <Link href={`/${site.username}/${site.site_name}`}>
                <h2 className="text-xl font-bold">{site.site_name}</h2>
                <p className="text-gray-500">
                  {site.created_at ? site.created_at.split("T")[0] : "No date"}
                </p>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(site.id)}
                className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
