"use client";

import { useEditorStore } from "@/store/editorStore";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar() {
  const { addBlock } = useEditorStore();

  const addNewBlock = (type: string) => {
    addBlock({
      id: uuidv4(),
      type,
      content: {},
    });
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
      <div>
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-10 text-center">BlockBuilder</h1>

        {/* Block Buttons */}
        <div className="space-y-4">
          <button onClick={() => addNewBlock("hero")} className="bg-purple-600 hover:bg-purple-700 p-3 rounded w-full transition">
            ➕ Hero Section
          </button>
          <button onClick={() => addNewBlock("text")} className="bg-blue-600 hover:bg-blue-700 p-3 rounded w-full transition">
            ➕ Text Block
          </button>
          <button onClick={() => addNewBlock("image")} className="bg-green-600 hover:bg-green-700 p-3 rounded w-full transition">
            ➕ Image Block
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-center text-gray-400 mt-10">
        Powered by BlockBuilder
      </div>
    </aside>
  );
}
