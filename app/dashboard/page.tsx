"use client";

import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
