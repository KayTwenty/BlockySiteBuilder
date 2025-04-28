import { supabase } from "@/lib/supabaseClient";
import { BlockRenderer } from "@/components/BlockRenderer";

interface Props {
  params: {
    username: string;
    sitename: string;
  };
}

export default async function PublicSitePage({ params }: Props) {
  const { username, sitename } = params;

  const { data: site, error } = await supabase
    .from("sites")
    .select("*")
    .eq("username", username)
    .eq("site_name", sitename)
    .single();

  if (error || !site) {
    console.error("Site not found:", error);
    return <div className="p-10 text-center">Site not found.</div>;
  }

  let blocks: any[] = [];

  try {
    if (site.data) {
      blocks = Array.isArray(site.data) ? site.data : JSON.parse(site.data);
    }
  } catch (err) {
    console.error("Failed parsing site blocks:", err);
  }

  return (
    <div className="min-h-screen p-10">
      {blocks.length === 0 ? (
        <p className="text-center text-gray-400">No content yet.</p>
      ) : (
        blocks.map((block) => (
          <div key={block.id} className="mb-6">
            <BlockRenderer block={block} editing={false} />
          </div>
        ))
      )}
    </div>
  );
}
