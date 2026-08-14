import React from "react";

function QuizLoading({
  topic,
  difficulty,
  questionCount,
}) {
  const displayTopic = topic || "Selected Topic";
  const displayDifficulty = difficulty || "Selected Level";
  const displayQuestionCount =
    questionCount || "Selected Count";

  return (
    <div className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl rounded-[2rem] border border-indigo-500/20 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12">

        {/* ===================================================
            AI ICON
        ==================================================== */}

        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-500/10 text-5xl shadow-xl shadow-indigo-500/10">

          <span className="animate-pulse">
            🤖
          </span>

        </div>

        {/* ===================================================
            TITLE
        ==================================================== */}

        <div className="text-center">

          <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold tracking-[0.15em] text-indigo-300">
            SKILLORA AI
          </span>

          <h1 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Creating Your Quiz...
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Skillora AI is preparing personalized questions based
            on your selected topic, difficulty, and question count.
          </p>

        </div>

        {/* ===================================================
            SELECTED QUIZ INFORMATION
        ==================================================== */}

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* TOPIC */}

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
              📚
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Topic
            </p>

            <p className="mt-2 truncate text-lg font-bold text-indigo-400">
              {displayTopic}
            </p>

          </div>

          {/* DIFFICULTY */}

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
              🎯
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Difficulty
            </p>

            <p className="mt-2 text-lg font-bold text-purple-400">
              {displayDifficulty}
            </p>

          </div>

          {/* QUESTION COUNT */}

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-xl">
              📝
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Questions
            </p>

            <p className="mt-2 text-lg font-bold text-cyan-400">
              {displayQuestionCount}
            </p>

          </div>

        </div>

        {/* ===================================================
            LOADING AREA
        ==================================================== */}

        <div className="mt-10">

          <div className="flex items-center justify-between">

            <p className="text-sm font-semibold text-slate-300">
              Preparing your questions
            </p>

            <span className="flex items-center gap-2 text-sm text-indigo-400">

              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />

              AI Working

            </span>

          </div>

          {/* LOADING BAR */}

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">

            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          </div>

          <p className="mt-3 text-center text-sm text-slate-500">
            Generating questions with AI...
          </p>

        </div>

        {/* ===================================================
            STEPS
        ==================================================== */}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm text-emerald-400">
              ✓
            </span>

            <span className="text-sm text-slate-400">
              Reading preferences
            </span>

          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm text-indigo-400">
              ✦
            </span>

            <span className="text-sm text-slate-400">
              Creating questions
            </span>

          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-sm text-purple-400">
              ✨
            </span>

            <span className="text-sm text-slate-400">
              Preparing quiz
            </span>

          </div>

        </div>

        {/* ===================================================
            TIP
        ==================================================== */}

        <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 text-center">

          <p className="text-sm font-bold text-indigo-300">
            💡 WHILE YOU WAIT
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Take a moment to focus. Once your quiz is ready,
            answer each question carefully. Skillora AI will
            analyze your performance after you finish.
          </p>

        </div>

      </div>

    </div>
  );
}

export default QuizLoading;