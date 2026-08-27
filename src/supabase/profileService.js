import { supabase } from "./supabase";

// ==========================================
// CHECK USERNAME EXISTS
// ==========================================

export async function checkUsernameExists(username) {
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return !!data;
}

// ==========================================
// CHECK EMAIL EXISTS
// ==========================================

export async function checkEmailExists(email) {
  const { data, error } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return !!data;
}

// ==========================================
// CHECK PHONE EXISTS
// ==========================================

export async function checkPhoneExists(phone) {
  const { data, error } = await supabase
    .from("profiles")
    .select("phone")
    .eq("phone", phone)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return !!data;
}

// ==========================================
// CREATE PROFILE
// ==========================================

export async function createProfile({
  id,
  full_name,
  username,
  email,
  phone,
}) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        id,
        full_name,
        username,
        email,
        phone,

        email_verified: false,
        phone_verified: false,

        avatar_url: "",

        bio: "",

        role: "student",

        streak: 0,

        xp: 0,

        level: 1,

        roadmap_progress: 0,

        department: "",

        year: "",

        college_name: "",

        interests: [],

        dream_company: "",

        career_goal: "",
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// GET PROFILE
// ==========================================

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// UPDATE PROFILE
// ==========================================

export async function updateProfile(
  userId,
  updates
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// UPDATE AVATAR
// ==========================================

export async function updateAvatar(
  userId,
  avatar_url
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// UPDATE ROADMAP PROGRESS
// ==========================================

export async function updateRoadmapProgress(
  userId,
  progress
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      roadmap_progress: progress,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// UPDATE XP
// ==========================================

export async function updateXP(userId, xp) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      xp,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// UPDATE STREAK
// ==========================================

export async function updateStreak(
  userId,
  streak
) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      streak,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// ==========================================
// DELETE PROFILE
// ==========================================

export async function deleteProfile(userId) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (error) {
    throw error;
  }

  return true;
}