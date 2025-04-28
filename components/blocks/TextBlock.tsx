"use client";

import { useEditorStore } from "@/store/editorStore";

export function TextBlock({ id, content, editing = false }: { id: string; content: any; editing?: boolean }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateBlock(id, { ...content, paragraph: e.target.value });
  };

  return (
    <div className="relative p-6 border rounded">
      {editing && (
        <button
          onClick={() => deleteBlock(id)}
          className="absolute top-2 right-2 text-xs bg-red-500 text-white rounded px-2 py-1"
        >
          Delete
        </button>
      )}
      <textarea
        value={content.paragraph || ""}
        onChange={handleChange}
        placeholder="Type your text here..."
        className="w-full resize-none bg-transparent outline-none text-lg"
        rows={4}
        disabled={!editing} // Lock editing when just viewing
      />
    </div>
  );
}
