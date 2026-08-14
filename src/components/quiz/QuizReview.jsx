import React from "react";

function QuizReview({
  questions = [],
  answers = {},
  currentQuestion = 0,
  onQuestionSelect,
  onBackToQuiz,
  onSubmit,
}) {
  const answeredCount = questions.filter(
    (_, index) => answers[index] !== undefined && answers[index] !== null
  ).length;

  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="mx-auto w-full max-w-3xl">

      {/* Header */}

      <div className="mb-8 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
          🔍
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
          Review Your Answers
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Check your answers before submitting the quiz.
        </p>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

        {/* Answered */}

        <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5 text-center">

          <div className="text-2xl">
            ✅
          </div>

          <p className="mt-2 text-2xl font-bold text-emerald-400">
            {answeredCount}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Answered
          </p>

        </div>

        {/* Unanswered */}

        <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-5 text-center">

          <div className="text-2xl">
            ⚠️
          </div>

          <p className="mt-2 text-2xl font-bold text-yellow-400">
            {unansweredCount}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Unanswered
          </p>

        </div>

        {/* Total */}

        <div className="col-span-2 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5 text-center sm:col-span-1">

          <div className="text-2xl">
            📝
          </div>

          <p className="mt-2 text-2xl font-bold text-indigo-400">
            {questions.length}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Total
          </p>

        </div>

      </div>

      {/* Question Grid */}

      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900 p-6 sm:p-8">

        <div className="mb-5">

          <h3 className="font-bold text-white">
            Question Overview
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Click a question to return to it.
          </p>

        </div>

        <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">

          {questions.map((_, index) => {

            const isAnswered =
              answers[index] !== undefined &&
              answers[index] !== null;

            const isCurrent = currentQuestion === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => onQuestionSelect?.(index)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-bold transition-all ${
                  isCurrent
                    ? "border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : isAnswered
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/50"
                    : "border-yellow-500/20 bg-yellow-500/5 text-yellow-400 hover:border-yellow-500/40"
                }`}
                title={`Question ${index + 1}`}
              >
                {index + 1}

                {isAnswered && !isCurrent && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">
                    ✓
                  </span>
                )}
              </button>
            );
          })}

        </div>

        {/* Legend */}

        <div className="mt-7 flex flex-wrap gap-5 border-t border-white/5 pt-5">

          <div className="flex items-center gap-2 text-xs text-slate-400">

            <span className="h-3 w-3 rounded-full bg-emerald-500" />

            Answered

          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">

            <span className="h-3 w-3 rounded-full bg-yellow-500" />

            Unanswered

          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">

            <span className="h-3 w-3 rounded-full bg-indigo-500" />

            Current

          </div>

        </div>

      </div>

      {/* Warning */}

      {unansweredCount > 0 && (

        <div className="mt-6 flex gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

          <div className="text-xl">
            ⚠️
          </div>

          <div>

            <h4 className="text-sm font-semibold text-yellow-300">
              You have unanswered questions
            </h4>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              You still have {unansweredCount} unanswered{" "}
              {unansweredCount === 1 ? "question" : "questions"}.
              You can submit now or return to them before finishing.
            </p>

          </div>

        </div>

      )}

      {/* Actions */}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">

        <button
          type="button"
          onClick={onBackToQuiz}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Back to Quiz
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:from-emerald-500 hover:to-teal-500"
        >
          Submit Quiz ✓
        </button>

      </div>

    </div>
  );
}

export default QuizReview;