"use client";

import { useEditorStore } from "@/store/editorStore";

export function HeroBlock({ id, content }: { id: string; content: any }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // <--- IMPORTANT
    updateBlock(id, { ...content, heading: e.target.value });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // <--- IMPORTANT
    deleteBlock(id);
  };

  return (
    <section className="bg-blue-100 p-10 rounded-md text-center relative">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-xs bg-red-500 text-white rounded px-2 py-1"
      >
        Delete
      </button>
      <input
        type="text"
        value={content.heading || ""}
        onChange={handleChange}
        placeholder="Hero Heading..."
        className="text-3xl font-bold bg-transparent outline-none text-center w-full"
      />
      <p className="text-gray-600 mt-2">Catchy subtitle here!</p>
    </section>
  );
}
