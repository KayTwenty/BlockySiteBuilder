"use client";

import { useEditorStore } from "@/store/editorStore";
import { useState } from "react";

export function ButtonBlock({ id, content, editing = false }: { id: string; content: any; editing?: boolean }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);
  const [focused, setFocused] = useState(false);

  const handleChange = (field: string, value: string) => {
    updateBlock(id, { ...content, [field]: value });
  };

  const buttonText = content.text || "Click Me";
  const buttonColor = content.color || "bg-blue-500";
  const buttonLink = content.link || "#";

  return (
    <div className="relative bg-gray-50 border border-gray-300 rounded-2xl p-6 text-center shadow hover:shadow-lg transition-all">
      {/* Floating Toolbar */}
      {editing && focused && (
        <div className="absolute -top-14 left-6 bg-white p-2 rounded shadow flex space-x-2 z-20">
          {/* Color options */}
          <button onClick={() => handleChange("color", "bg-blue-500")} className="w-6 h-6 rounded bg-blue-500"></button>
          <button onClick={() => handleChange("color", "bg-green-500")} className="w-6 h-6 rounded bg-green-500"></button>
          <button onClick={() => handleChange("color", "bg-purple-500")} className="w-6 h-6 rounded bg-purple-500"></button>
          <button onClick={() => handleChange("color", "bg-red-500")} className="w-6 h-6 rounded bg-red-500"></button>
        </div>
      )}

      {/* Delete Button */}
      {editing && (
        <button
          onClick={() => deleteBlock(id)}
          className="absolute top-2 right-2 text-xs bg-red-500 text-white rounded px-2 py-1"
        >
          Delete
        </button>
      )}

      {/* Button Display */}
      <a href={buttonLink} target="_blank" rel="noopener noreferrer">
        <button
          className={`${buttonColor} text-white px-6 py-3 rounded-lg font-semibold text-lg transition hover:brightness-110`}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 100)}
        >
          {editing ? (
            <input
              value={buttonText}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Button Text"
              className="bg-transparent text-center outline-none placeholder-white"
            />
          ) : (
            buttonText
          )}
        </button>
      </a>

      {/* Link Editor */}
      {editing && (
        <input
          value={buttonLink}
          onChange={(e) => handleChange("link", e.target.value)}
          placeholder="Paste URL here"
          className="block mx-auto mt-4 bg-transparent border-b border-gray-400 outline-none text-center text-sm"
        />
      )}
    </div>
  );
}
