import { supabase } from "../supabase/supabase";

// =====================================================
// GET COURSES
// =====================================================

export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }

  return data || [];
};

// =====================================================
// GET LESSONS
// =====================================================

export const getLessons = async (courseId) => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("lesson_order", {
      ascending: true,
    });

  if (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }

  return data || [];
};

// =====================================================
// GET LESSON PROGRESS
// =====================================================

export const getLessonProgress = async (userId) => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Error fetching lesson progress:",
      error
    );

    throw error;
  }

  return data || [];
};

// =====================================================
// GET COURSE PROGRESS
// =====================================================

export const getCourseProgress = async (userId) => {
  if (!userId) return [];

  const { data, error } = await supabase
    .from("course_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Error fetching course progress:",
      error
    );

    throw error;
  }

  return data || [];
};

// =====================================================
// FIND OR CREATE YOUTUBE COURSE
// =====================================================

export const getOrCreateYoutubeCourse = async ({
  userId,
  title,
  description,
  category = "YouTube",
  level = "YouTube Learning",
  totalLessons = 0,
}) => {
  if (!userId || !title) {
    throw new Error(
      "userId and title are required."
    );
  }

  // Check whether course already exists
  const { data: existingCourses, error: searchError } =
    await supabase
      .from("courses")
      .select("*")
      .eq("title", title)
      .eq("category", category)
      .limit(1);

  if (searchError) {
    console.error(
      "Course search error:",
      searchError
    );

    throw searchError;
  }

  if (
    existingCourses &&
    existingCourses.length > 0
  ) {
    return existingCourses[0];
  }

  // Create course
  const { data, error } = await supabase
    .from("courses")
    .insert({
      title,
      description,
      category,
      level,
      total_lessons: totalLessons,
      xp_reward: totalLessons * 10,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Course creation error:",
      error
    );

    throw error;
  }

  return data;
};

// =====================================================
// FIND OR CREATE YOUTUBE LESSON
// =====================================================

export const getOrCreateYoutubeLesson = async ({
  courseId,
  video,
  lessonOrder,
}) => {
  if (!courseId || !video?.youtubeId) {
    throw new Error(
      "courseId and video.youtubeId are required."
    );
  }

  // Check existing lesson
  const { data: existingLesson, error: searchError } =
    await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .eq("youtube_id", video.youtubeId)
      .maybeSingle();

  if (searchError) {
    console.error(
      "Lesson search error:",
      searchError
    );

    throw searchError;
  }

  if (existingLesson) {
    return existingLesson;
  }

  // Create lesson
  const { data, error } = await supabase
    .from("lessons")
    .insert({
      course_id: courseId,
      title: video.title || "YouTube Lesson",
      description:
        video.description ||
        "YouTube learning resource",
      content: video.youtubeUrl || "",
      youtube_id: video.youtubeId,
      lesson_order: lessonOrder,
      duration_minutes: 0,
      xp_reward: 10,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Lesson creation error:",
      error
    );

    throw error;
  }

  return data;
};

// =====================================================
// SAVE LESSON PROGRESS
// =====================================================

export const saveLessonProgress = async ({
  userId,
  lessonId,
  progressPercent = 100,
  completed = true,
  timeSpent = 0,
}) => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: userId,
        lesson_id: lessonId,
        progress_percent: progressPercent,
        completed,
        time_spent: timeSpent,
        last_accessed: now,
        completed_at: completed ? now : null,
        updated_at: now,
      },
      {
        onConflict:
          "user_id,lesson_id",
      }
    )
    .select()
    .single();

  if (error) {
    console.error(
      "Save lesson progress error:",
      error
    );

    throw error;
  }

  return data;
};

// =====================================================
// SAVE COURSE PROGRESS
// =====================================================

export const saveCourseProgress = async ({
  userId,
  courseId,
  completedLessons,
  totalLessons,
}) => {
  const completed =
    Number(completedLessons) || 0;

  const total =
    Number(totalLessons) || 0;

  const progress =
    total > 0
      ? Math.round(
          (completed / total) * 100
        )
      : 0;

  const isCompleted =
    total > 0 &&
    completed >= total;

  const now =
    new Date().toISOString();

  const { data, error } = await supabase
    .from("course_progress")
    .upsert(
      {
        user_id: userId,
        course_id: courseId,
        completed_lessons: completed,
        total_lessons: total,
        progress_percent: progress,
        completed: isCompleted,
        last_accessed: now,
        completed_at: isCompleted
          ? now
          : null,
        updated_at: now,
      },
      {
        onConflict:
          "user_id,course_id",
      }
    )
    .select()
    .single();

  if (error) {
    console.error(
      "Save course progress error:",
      error
    );

    throw error;
  }

  return data;
};