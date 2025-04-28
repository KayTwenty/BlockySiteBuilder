"use client";

import { useEditorStore } from "@/store/editorStore";

export function TextBlock({ id, content }: { id: string; content: any }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation(); // <--- IMPORTANT
    updateBlock(id, { ...content, paragraph: e.target.value });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // <--- IMPORTANT
    deleteBlock(id);
  };

  return (
    <div className="p-6 border rounded relative">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-xs bg-red-500 text-white rounded px-2 py-1"
      >
        Delete
      </button>
      <textarea
        value={content.paragraph || ""}
        onChange={handleChange}
        placeholder="Type your text here..."
        className="w-full resize-none bg-transparent outline-none text-lg"
        rows={4}
      />
    </div>
  );
}
