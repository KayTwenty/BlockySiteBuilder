"use client";

import { useEditorStore } from "@/store/editorStore";
import { supabase } from "@/lib/supabaseClient";

export function ImageBlock({ id, content, editing = false }: { id: string; content: any; editing?: boolean }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);
  const deleteBlock = useEditorStore((state) => state.deleteBlock);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const fileExt = file.name.split(".").pop();
      const fileName = `${id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage.from("uploads").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (error) {
        console.error("Upload error:", error);
        return;
      }

      const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);

      if (data?.publicUrl) {
        updateBlock(id, { ...content, imageUrl: data.publicUrl });
      }
    }
  };

  return (
    <div className="relative bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow hover:shadow-lg transition-all">
      {editing && (
        <button
          onClick={() => deleteBlock(id)}
          className="absolute top-2 right-2 text-xs bg-red-500 text-white rounded px-2 py-1"
        >
          Delete
        </button>
      )}

      {content.imageUrl ? (
        <img src={content.imageUrl} alt="Uploaded" className="max-w-full mx-auto rounded-lg shadow-md" />
      ) : (
        editing && (
          <label className="block cursor-pointer bg-white border-2 border-dashed border-green-400 p-10 rounded-lg">
            <p className="text-green-500">Click to upload an image</p>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )
      )}
    </div>
  );
}
