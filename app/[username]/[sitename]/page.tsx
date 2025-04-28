import { supabase } from "@/lib/supabaseClient";
import { BlockRenderer } from "@/components/BlockRenderer";

export default async function Page({ params }: { params: { username: string; sitename: string } }) {
  const { username, sitename } = params;

  const { data, error } = await supabase
    .from("sites")
    .select("data")
    .eq("username", username)
    .eq("site_name", sitename)
    .single();

  if (error || !data) {
    return <div className="p-10 text-center">Site not found.</div>;
  }

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      {data.data.blocks.map((block: any) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </main>
  );
}
