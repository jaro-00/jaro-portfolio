import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/db';
import { getUserFromRequest } from '@/app/lib/auth';

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("secnotes")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await request.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("secnotes")
      .insert([{ title, content, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}