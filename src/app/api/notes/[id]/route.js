import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/db';
import { getUserFromRequest } from '@/app/lib/auth';

export async function PUT(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'Invalid note id' }, { status: 400 });
  }

  const { title, content } = await request.json();

  const updateData = { updated_at: new Date().toISOString() };
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;

  if (Object.keys(updateData).length === 1) {
    return NextResponse.json(
      { error: 'At least one field (title or content) must be provided' },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from('secnotes')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'Invalid note id' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('secnotes')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 },
    );
  }
}

