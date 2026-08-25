import React from "react";

function QuizNavigation({
  currentQuestion = 1,
  totalQuestions = 10,
  selectedAnswer = null,
  onPrevious,
  onNext,
  onSubmit,
  isFirstQuestion = false,
  isLastQuestion = false,
  disabled = false,
}) {
  const hasAnswer =
    selectedAnswer !== null &&
    selectedAnswer !== "";

  return (
    <div className="mt-7 rounded-3xl border border-white/[0.08] bg-[#111827]/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstQuestion || disabled}
          className={`group flex min-w-[150px] items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
            isFirstQuestion || disabled
              ? "cursor-not-allowed border-white/[0.04] bg-white/[0.02] text-slate-600"
              : "border-white/[0.08] bg-white/[0.035] text-slate-300 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-white/[0.07] hover:text-white"
          }`}
        >
          <span className="text-lg transition-transform group-hover:-translate-x-1">
            ←
          </span>

          Previous
        </button>

        <div className="order-first flex flex-col items-center sm:order-none">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
            Current Position
          </p>

          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl font-bold text-white">
              {String(currentQuestion).padStart(2, "0")}
            </span>

            <span className="text-sm text-slate-600">
              /
            </span>

            <span className="text-sm font-semibold text-slate-500">
              {String(totalQuestions).padStart(2, "0")}
            </span>
          </div>
        </div>

        {!isLastQuestion ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!hasAnswer || disabled}
            className={`group flex min-w-[170px] items-center justify-center gap-3 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-300 ${
              !hasAnswer || disabled
                ? "cursor-not-allowed border border-indigo-500/10 bg-indigo-500/10 text-indigo-300/40"
                : "border border-indigo-400/20 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-[0_12px_35px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(79,70,229,0.45)]"
            }`}
          >
            Next Question

            <span className="text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!hasAnswer || disabled}
            className={`group flex min-w-[190px] items-center justify-center gap-3 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-300 ${
              !hasAnswer || disabled
                ? "cursor-not-allowed bg-emerald-500/10 text-emerald-300/40"
                : "border border-emerald-400/20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-[0_12px_35px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(16,185,129,0.35)]"
            }`}
          >
            Submit Quiz

            <span className="text-lg transition-transform group-hover:scale-110">
              ✓
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizNavigation;