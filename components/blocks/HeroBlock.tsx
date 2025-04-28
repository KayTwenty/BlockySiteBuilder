"use client";

import { useEditorStore } from "@/store/editorStore";
import { useState } from "react";

export function HeroBlock({ id, content, editing = false }: { id: string; content: any; editing?: boolean }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);
  const [hoveringToolbar, setHoveringToolbar] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(id, { ...content, heading: e.target.value });
  };

  const handleSubheadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(id, { ...content, subheading: e.target.value });
  };

  const setBackground = (bgClass: string) => {
    updateBlock(id, { ...content, background: bgClass });
  };

  const backgroundClass = content.background || "bg-gradient-to-r from-purple-500 to-pink-500";

  return (
    <div className={`relative ${backgroundClass} text-white rounded-2xl p-10 text-center shadow-lg transition-all`}>
      {editing && (focused || hoveringToolbar) && (
        <div
          className="absolute -top-16 left-6 bg-white p-2 rounded shadow flex space-x-2 z-20"
          onMouseEnter={() => setHoveringToolbar(true)}
          onMouseLeave={() => setHoveringToolbar(false)}
        >
          {/* Preset Background Buttons */}
          <button onClick={() => setBackground("bg-gradient-to-r from-purple-500 to-pink-500")} className="w-8 h-8 rounded bg-gradient-to-r from-purple-500 to-pink-500" title="Purple/Pink"></button>
          <button onClick={() => setBackground("bg-gradient-to-r from-blue-500 to-cyan-500")} className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-cyan-500" title="Blue/Cyan"></button>
          <button onClick={() => setBackground("bg-gradient-to-r from-green-500 to-lime-400")} className="w-8 h-8 rounded bg-gradient-to-r from-green-500 to-lime-400" title="Green/Lime"></button>
          <button onClick={() => setBackground("bg-white")} className="w-8 h-8 rounded bg-white border" title="White"></button>
          <button onClick={() => setBackground("bg-black")} className="w-8 h-8 rounded bg-black" title="Black"></button>
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

      {/* Inputs */}
      <input
        value={content.heading || ""}
        onChange={handleHeadingChange}
        placeholder="Main Heading..."
        className="bg-transparent outline-none w-full text-4xl font-bold mb-4 text-center placeholder-white"
        disabled={!editing}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)}
      />
      <input
        value={content.subheading || ""}
        onChange={handleSubheadingChange}
        placeholder="Subheading..."
        className="bg-transparent outline-none w-full text-lg font-light text-center placeholder-white"
        disabled={!editing}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)}
      />
    </div>
  );
}
