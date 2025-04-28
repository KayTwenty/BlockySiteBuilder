"use client";

import { templates } from "@/templates/templates";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/store/editorStore";

export default function TemplatePicker() {
  const router = useRouter();
  const { setBlocks } = useEditorStore();

  const selectTemplate = (template: any) => {
    setBlocks(template.blocks);
    router.push("/editor");
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-10">Choose a Template</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => selectTemplate(template)}
          >
            <h2 className="text-xl font-bold mb-2">{template.name}</h2>
            <p className="text-gray-500">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
