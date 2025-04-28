import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, site_name, user_id, data } = await req.json();

  const { error } = await supabase.from("sites").insert([
    { username, site_name, user_id, data }
  ]);

  if (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}
