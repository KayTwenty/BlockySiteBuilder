"use client";

import { useEditorStore } from "@/store/editorStore";

export function HeroBlock({ id, content, editing = false }: { id: string; content: any; editing?: boolean }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(id, { ...content, heading: e.target.value });
  };

  const handleSubheadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(id, { ...content, subheading: e.target.value });
  };

  return (
    <div className="relative p-10 bg-gray-100 rounded-lg text-center">
      {editing && (
        <button
          onClick={() => deleteBlock(id)}
          className="absolute top-2 right-2 text-xs bg-red-500 text-white rounded px-2 py-1"
        >
          Delete
        </button>
      )}
      <input
        value={content.heading || ""}
        onChange={handleHeadingChange}
        placeholder="Heading..."
        className="text-4xl font-bold bg-transparent outline-none w-full text-center mb-2"
        disabled={!editing}
      />
      <input
        value={content.subheading || ""}
        onChange={handleSubheadingChange}
        placeholder="Subheading..."
        className="text-xl text-gray-600 bg-transparent outline-none w-full text-center"
        disabled={!editing}
      />
    </div>
  );
}
