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
    <div className="relative w-full overflow-hidden border-b border-white/[0.08] bg-[#080d1d]/95 px-4 py-4 backdrop-blur-2xl sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-[-140px] h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="absolute right-1/4 top-[-140px] h-72 w-72 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onExit}
              className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-xl text-slate-300 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-x-1 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
              title="Exit Quiz"
            >
              ←
            </button>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.9)]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-300">
                  AI Powered Assessment
                </p>
              </div>

              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                {title}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Stay focused and choose the best answer.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 shadow-xl shadow-black/20">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                Topic
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                {topic}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-400/15 bg-purple-500/[0.07] px-4 py-3 shadow-xl shadow-purple-950/20">
              <p className="text-[9px] font-bold uppercase tracking-widest text-purple-300/70">
                Difficulty
              </p>

              <p className="mt-1 text-sm font-semibold text-purple-200">
                {difficulty}
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.08] px-4 py-3 shadow-xl shadow-indigo-950/30">
              <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-300/70">
                Question
              </p>

              <p className="mt-1 text-sm font-bold text-indigo-200">
                {currentQuestion}
                <span className="mx-1 text-slate-600">/</span>
                {totalQuestions}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-300">
                Quiz Progress
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Complete every question to finish your assessment
              </p>
            </div>

            <div className="rounded-full border border-indigo-400/15 bg-indigo-500/[0.08] px-3 py-1">
              <span className="text-xs font-bold text-indigo-300">
                {progress}%
              </span>
            </div>
          </div>

          <div className="relative h-3 w-full overflow-hidden rounded-full border border-white/[0.04] bg-white/[0.04]">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_20px_rgba(139,92,246,0.55)] transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
              }}
            >
              <div className="absolute right-0 top-0 h-full w-8 bg-white/20 blur-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizHeader;