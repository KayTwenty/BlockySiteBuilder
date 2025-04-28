"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore } from "@/store/editorStore";
import { BlockRenderer } from "@/components/BlockRenderer";
import { v4 as uuidv4 } from "uuid";

export default function EditorPage() {
  const { blocks, addBlock, moveBlock } = useEditorStore();

  const addNewBlock = (type: string) => {
    addBlock({
      id: uuidv4(),
      type,
      content: {},
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);
      moveBlock(oldIndex, newIndex);
    }
  };

  const saveSite = async () => {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "demo", // hardcoded for now
        site_name: "test-site",
        data: blocks,
      }),
    });

    const result = await res.json();
    if (result.success) {
      alert("Site saved!");
    } else {
      alert("Failed to save site.");
    }
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Blocks</h2>
        <button className="block w-full bg-blue-500 text-white p-2 rounded mb-2" onClick={() => addNewBlock("hero")}>
          Hero Section
        </button>
        <button className="block w-full bg-green-500 text-white p-2 rounded" onClick={() => addNewBlock("text")}>
          Text Block
        </button>
        <button className="block w-full bg-yellow-500 text-white p-2 rounded mt-2" onClick={() => addNewBlock("image")}>
          Image Block
        </button>
      </aside>

      {/* Canvas */}
      <main className="flex-1 bg-white p-10 overflow-y-auto">
        {blocks.length === 0 && (
          <p className="text-gray-400 text-center mt-20">Drag blocks here to start building.</p>
        )}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-6">
              {blocks.map((block) => (
                <SortableBlock key={block.id} block={block} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>

      {/* Save Button (fixed to bottom right) */}
      <button
        className="fixed bottom-10 right-10 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition"
        onClick={saveSite}
      >
        Save Site
      </button>
    </div>
  );
}

function SortableBlock({ block }: { block: any }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div ref={setNodeRef} style={style} className="relative border rounded shadow bg-white">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center w-full h-10 bg-gray-200 cursor-grab rounded-t-md"
          title="Drag here"
        >
          <div className="text-gray-600 text-xl">☰</div>
        </div>
  
        {/* Actual Block Content */}
        <div className="p-6">
          <BlockRenderer block={block} />
        </div>
      </div>
    );
}
