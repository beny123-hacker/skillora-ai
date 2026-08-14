import { supabase } from "../supabase/supabase";

// ==========================================
// GET ALL COURSES
// ==========================================

export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get courses error:", error);
    throw error;
  }

  return data || [];
};

// ==========================================
// GET ONE COURSE
// ==========================================

export const getCourse = async (courseId) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error) {
    console.error("Get course error:", error);
    throw error;
  }

  return data;
};

// ==========================================
// GET LESSONS FOR COURSE
// ==========================================

export const getLessons = async (courseId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("lesson_order", { ascending: true });

  if (error) {
    console.error("Get lessons error:", error);
    throw error;
  }

  return data || [];
};

// ==========================================
// GET ONE LESSON
// ==========================================

export const getLesson = async (lessonId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", lessonId)
    .single();

  if (error) {
    console.error("Get lesson error:", error);
    throw error;
  }

  return data;
};