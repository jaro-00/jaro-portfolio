const supabase = require("../db/db");

// POST /notes - Create a new note for the authenticated user
// Requires: authenticateToken middleware (user must be logged in)
// Expected request body: { title: string, content: string }
/**
 * Create a new note belonging to the authenticated user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const user_id = req.user?.id;

  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data, error } = await supabase
      .from("secnotes")
      .insert([{ title, content, user_id }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add note" });
  }
};

// GET /notes - Fetch all notes for the authenticated user
// Requires: authenticateToken middleware (user must be logged in)
/**
 * Return all notes for the authenticated user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.notes = async (req, res) => {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data, error } = await supabase
      .from("secnotes")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// PUT /notes/:id - Update a note (only if user owns it)
// Requires: authenticateToken middleware (user must be logged in)
/**
 * Update a note by id (only if owned by the authenticated user).
 *
 * Accepts partial updates; omitted fields are not modified.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const user_id = req.user?.id;

  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  // Build an update object dynamically so the client can send only the field(s) it wants to change.
  // If a field is omitted (undefined), it will not be touched.
  const updateData = { updated_at: new Date() };
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;

  // Ensure at least one updatable field was provided.
  if (Object.keys(updateData).length === 1) {
    return res.status(400).json({ error: "At least one field (title or content) must be provided" });
  }

  try {
    // Only allow updates on notes that belong to the authenticated user.
    const { data, error } = await supabase
      .from("secnotes")
      .update(updateData)
      .eq('id', Number(id))
      .eq('user_id', user_id)
      .select()
      .single();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update note" });
  }
};

// DELETE /notes/:id - Delete a note (only if user owns it)
// Requires: authenticateToken middleware (user must be logged in)
/**
 * Delete a note by id (only if owned by the authenticated user).
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data, error } = await supabase
      .from("secnotes")
      .delete()
      .eq('id', Number(id))
      .eq('user_id', user_id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
