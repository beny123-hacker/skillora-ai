import { supabase } from "../supabase/supabase";

// ==========================================
// GET NOTES
// ==========================================

export const getNotes = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
};

// ==========================================
// CREATE NOTE
// ==========================================

export const createNote = async (note) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("notes")
    .insert({
      ...note,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

// ==========================================
// UPDATE NOTE
// ==========================================

export const updateNote = async (noteId, updates) => {
  const { data, error } = await supabase
    .from("notes")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", noteId)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// ==========================================
// DELETE NOTE
// ==========================================

export const deleteNote = async (noteId) => {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId);

  if (error) throw error;

  return true;
};