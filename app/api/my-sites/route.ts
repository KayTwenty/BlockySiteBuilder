import { supabase } from "@/lib/supabaseClient";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ sites: [] }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", token.sub);

  if (error) {
    console.error(error);
    return NextResponse.json({ sites: [] }, { status: 500 });
  }

  return NextResponse.json({ sites: data });
}
