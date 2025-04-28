"use client";

import Sidebar from "@/components/Sidebar";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEditorStore } from "@/store/editorStore";
import { CSS } from "@dnd-kit/utilities";
import { BlockRenderer } from "@/components/BlockRenderer";
import { useSession } from "next-auth/react";

export default function EditorPage() {
  const { blocks, moveBlock } = useEditorStore();
  const { data: session } = useSession();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);
      moveBlock(oldIndex, newIndex);
    }
  };

  async function saveSite() {
    if (!session?.user?.id) {
      alert("Not logged in");
      return;
    }

    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: session.user.email?.split("@")[0] || "demo",
        site_name: "test-site",
        user_id: session.user.id,
        data: blocks,
      }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Site saved!");
    } else {
      alert("Failed to save site.");
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Editor Canvas */}
      <main className="flex-1 bg-gray-50 p-10 overflow-y-auto relative">
        <div className="max-w-4xl mx-auto space-y-10">
          {blocks.length === 0 && (
            <div className="text-center text-gray-400 mt-20 text-lg">
              Start adding blocks to build your site!
            </div>
          )}

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block) => (
                <div key={block.id} className="bg-white rounded-2xl shadow p-6 transition-all">
                  <BlockRenderer block={block} editing={true} />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Save Button */}
        <button
          onClick={saveSite}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition"
        >
          Save Site
        </button>
      </main>
    </div>
  );
}
