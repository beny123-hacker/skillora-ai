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
  const hasAnswer = selectedAnswer !== null && selectedAnswer !== "";

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      {/* Previous Button */}

      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstQuestion || disabled}
        className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
          isFirstQuestion || disabled
            ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600"
            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span>←</span>
        <span>Previous</span>
      </button>

      {/* Question Indicator */}

      <div className="order-first text-center sm:order-none">

        <p className="text-xs text-slate-500">
          Question
        </p>

        <p className="mt-1 text-sm font-bold text-slate-300">
          {currentQuestion}{" "}
          <span className="font-normal text-slate-500">
            / {totalQuestions}
          </span>
        </p>

      </div>

      {/* Next / Submit Button */}

      {!isLastQuestion ? (

        <button
          type="button"
          onClick={onNext}
          disabled={!hasAnswer || disabled}
          className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition ${
            !hasAnswer || disabled
              ? "cursor-not-allowed bg-indigo-500/20 text-indigo-400/50"
              : "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500"
          }`}
        >
          <span>Next</span>
          <span>→</span>
        </button>

      ) : (

        <button
          type="button"
          onClick={onSubmit}
          disabled={!hasAnswer || disabled}
          className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition ${
            !hasAnswer || disabled
              ? "cursor-not-allowed bg-emerald-500/20 text-emerald-400/50"
              : "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500"
          }`}
        >
          <span>Submit Quiz</span>
          <span>✓</span>
        </button>

      )}

    </div>
  );
}

export default QuizNavigation;