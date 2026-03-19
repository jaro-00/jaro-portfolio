const { stat } = require("fs");
const supabase = require("../db/db");

exports.createTask = async (req, res) => {
  const { title, description, taskstatus } = req.body;
  const user_id = req.user?.id;

  if (!title) return res.status(400).json({ error: "Title is required" });
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, description, taskstatus, user_id }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add task" });
  }
};

exports.tasks = async (req, res) => {
  const user_id = req.user?.id;
  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user_id)
      .order("id", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const user_id = req.user?.id;

  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  // Build an update object dynamically so the client can send only the field(s) it wants to change.
  // If a field is omitted (undefined), it will not be touched.
  const updateData = { updated_at: new Date() };
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.description = description;
   if (status !== undefined) updateData.status = status;

  // Ensure at least one updatable field was provided.
  if (Object.keys(updateData).length === 1) {
    return res.status(400).json({ error: "At least one field (title or description) must be provided" });
  }

  try {
    // Only allow updates on notes that belong to the authenticated user.
    const { data, error } = await supabase
      .from("tasks")
      .update(updateData)
      .eq('id', Number(id))
      .eq('user_id', user_id)
      .select()
      .single();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user?.id;

  if (!user_id) return res.status(401).json({ error: "Unauthorized" });

  try {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq('id', Number(id))
      .eq('user_id', user_id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
};