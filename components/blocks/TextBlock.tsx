"use client";

import { useEditorStore } from "@/store/editorStore";
import { useState, useRef } from "react";

export function TextBlock({ id, content, editing = false }: { id: string; content: any; editing?: boolean }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);

  const [focused, setFocused] = useState(false);
  const [hoveringToolbar, setHoveringToolbar] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateBlock(id, { ...content, paragraph: e.target.value });
  };

  const applyStyle = (newStyles: any) => {
    updateBlock(id, { ...content, ...newStyles });
  };

  const currentType = content.type || "p";
  const currentBold = content.bold || false;
  const currentItalic = content.italic || false;
  const currentSize = content.size || "medium";

  // Dynamic styling
  let baseClasses = "w-full bg-transparent outline-none resize-none text-center";
  if (currentType === "h1") baseClasses += " text-4xl font-bold";
  else if (currentType === "h2") baseClasses += " text-2xl font-semibold";
  else baseClasses += " text-lg";

  if (currentBold) baseClasses += " font-bold";
  if (currentItalic) baseClasses += " italic";

  if (currentSize === "small") baseClasses += " text-sm";
  else if (currentSize === "large") baseClasses += " text-xl";

  return (
    <div className="relative bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow hover:shadow-lg transition-all">
      {editing && (focused || hoveringToolbar) && (
        <div
          className="absolute -top-14 left-6 bg-white p-2 rounded shadow flex space-x-2 z-20"
          onMouseEnter={() => setHoveringToolbar(true)}
          onMouseLeave={() => setHoveringToolbar(false)}
        >
          {/* Type Buttons */}
          <button
            onClick={() => applyStyle({ type: "h1" })}
            className={`px-2 py-1 rounded ${currentType === "h1" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
          >
            H1
          </button>
          <button
            onClick={() => applyStyle({ type: "h2" })}
            className={`px-2 py-1 rounded ${currentType === "h2" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
          >
            H2
          </button>
          <button
            onClick={() => applyStyle({ type: "p" })}
            className={`px-2 py-1 rounded ${currentType === "p" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
          >
            P
          </button>

          {/* Bold & Italic */}
          <button
            onClick={() => applyStyle({ bold: !currentBold })}
            className={`px-2 py-1 rounded ${currentBold ? "bg-purple-500 text-white" : "bg-gray-200"}`}
          >
            B
          </button>
          <button
            onClick={() => applyStyle({ italic: !currentItalic })}
            className={`px-2 py-1 rounded ${currentItalic ? "bg-purple-500 text-white" : "bg-gray-200"}`}
          >
            I
          </button>

          {/* Font Size */}
          <select
            onChange={(e) => applyStyle({ size: e.target.value })}
            value={currentSize}
            className="px-2 py-1 rounded bg-gray-200"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
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

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={content.paragraph || ""}
        onChange={handleChange}
        placeholder="Type your text here..."
        rows={5}
        className={baseClasses + " placeholder-gray-400"}
        disabled={!editing}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)} // slight delay so mouse enter is caught
      />
    </div>
  );
}
