import { supabase } from "../supabase/supabase";

// ==========================================
// GET CURRENT USER
// ==========================================

const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  return user;
};

// ==========================================
// GET ALL COURSE PROGRESS
// ==========================================

export const getProgress = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("course_progress")
    .select(`
      *,
      courses (
        id,
        title,
        description,
        category,
        level,
        thumbnail_url,
        total_lessons,
        xp_reward
      )
    `)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Get progress error:", error);
    throw error;
  }

  return data || [];
};

// ==========================================
// GET PROGRESS FOR ONE COURSE
// ==========================================

export const getCourseProgress = async (courseId) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("course_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .maybeSingle();

  if (error) {
    console.error("Get course progress error:", error);
    throw error;
  }

  return data;
};

// ==========================================
// UPDATE COURSE PROGRESS
// ==========================================

export const updateProgress = async ({
  courseId,
  progressPercent,
  completedLessons,
  totalLessons,
  completed = false,
}) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const progressData = {
    user_id: user.id,
    course_id: courseId,
    progress_percent: progressPercent,
    completed_lessons: completedLessons,
    total_lessons: totalLessons,
    completed,
    last_accessed: new Date().toISOString(),
    completed_at: completed
      ? new Date().toISOString()
      : null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("course_progress")
    .upsert(progressData, {
      onConflict: "user_id,course_id",
    })
    .select()
    .single();

  if (error) {
    console.error("Update progress error:", error);
    throw error;
  }

  return data;
};