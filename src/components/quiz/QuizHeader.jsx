import React from "react";

function QuizHeader({
  title = "AI Quiz",
  topic = "General",
  difficulty = "Medium",
  currentQuestion = 1,
  totalQuestions = 10,
  onExit,
}) {
  const progress =
    totalQuestions > 0
      ? Math.round((currentQuestion / totalQuestions) * 100)
      : 0;

  return (
    <div className="w-full border-b border-white/10 bg-slate-900/80 px-6 py-5 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl">

        {/* Top row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Left */}
          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={onExit}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
              title="Exit Quiz"
            >
              ←
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                {topic}
              </p>

              <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                {title}
              </h1>
            </div>

          </div>

          {/* Right */}
          <div className="flex items-center gap-2">

            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300">
              {difficulty}
            </span>

            <span className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-300">
              {currentQuestion} / {totalQuestions}
            </span>

          </div>

        </div>

        {/* Progress section */}
        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs text-slate-400">
              Quiz Progress
            </span>

            <span className="text-xs font-semibold text-indigo-400">
              {progress}%
            </span>

          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}

export default QuizHeader;