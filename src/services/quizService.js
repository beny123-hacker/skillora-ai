import { supabase } from "../supabase/supabase";

// GET QUIZZES

export const getQuizzes = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
};

// GET QUIZ

export const getQuiz = async (quizId) => {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", quizId)
    .single();

  if (error) throw error;

  return data;
};

// SAVE QUIZ ATTEMPT

export const saveQuizAttempt = async ({
  quizId,
  score,
  total,
  percentage,
  answers,
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert({
      quiz_id: quizId,
      user_id: user.id,
      score,
      total,
      percentage,
      answers,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

// GET USER QUIZ ATTEMPTS

export const getQuizAttempts = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("*")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false });

  if (error) throw error;

  return data || [];
};