import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/db';
import { getUserFromRequest } from '@/app/lib/auth';

/**
 * Update a note by id (only if owned by the authenticated user).
 *
 * Auth: `Authorization: Bearer <jwt>`.
 * Accepts partial JSON body: `{ title?: string, content?: string }`.
 *
 * @param {Request} request
 * @param {{ params: { id: string } }} ctx
 * @returns {Promise<import('next/server').NextResponse>}
 */
export async function PUT(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'Invalid task id' }, { status: 400 });
  }

  const { title, description, status } = await request.json();

  const updateData = { updated_at: new Date().toISOString() };
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  if (Object.keys(updateData).length === 1) {
    return NextResponse.json(
      { error: 'At least one field (title or content) must be provided' },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
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

/**
 * Delete a task by id (only if owned by the authenticated user).
 *
 * Auth: `Authorization: Bearer <jwt>`.
 *
 * @param {Request} request
 * @param {{ params: { id: string } }} ctx
 * @returns {Promise<import('next/server').NextResponse>}
 */
export async function DELETE(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: 'Invalid task id' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete Task' },
      { status: 500 },
    );
  }
}

