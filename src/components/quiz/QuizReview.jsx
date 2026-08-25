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
    (_, index) =>
      answers[index] !== undefined &&
      answers[index] !== null
  ).length;

  const unansweredCount =
    questions.length - answeredCount;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.09] bg-gradient-to-br from-[#151d31] via-[#101729] to-[#0b1020] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:p-10">
        <div className="pointer-events-none absolute left-1/4 top-[-150px] h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[-180px] right-1/4 h-80 w-80 rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 text-4xl shadow-2xl shadow-indigo-950/30">
              🔍
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-300">
              Final Review
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Review Your Answers
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
              Check your progress and make any final changes before submitting your quiz.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-emerald-400/15 bg-emerald-500/[0.07] p-6 text-center shadow-lg shadow-emerald-950/10">
              <div className="text-2xl">✓</div>

              <p className="mt-3 text-3xl font-bold text-emerald-300">
                {answeredCount}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300/60">
                Answered
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/15 bg-amber-500/[0.07] p-6 text-center shadow-lg shadow-amber-950/10">
              <div className="text-2xl">!</div>

              <p className="mt-3 text-3xl font-bold text-amber-300">
                {unansweredCount}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-amber-300/60">
                Unanswered
              </p>
            </div>

            <div className="rounded-3xl border border-indigo-400/15 bg-indigo-500/[0.07] p-6 text-center shadow-lg shadow-indigo-950/10">
              <div className="text-2xl">◈</div>

              <p className="mt-3 text-3xl font-bold text-indigo-300">
                {questions.length}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-indigo-300/60">
                Total Questions
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/[0.08] bg-[#090f1d]/70 p-5 sm:p-8">
            <div className="flex flex-col gap-2 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-lg font-bold text-white">
                  Question Navigator
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Select any question to review or change your answer.
                </p>
              </div>

              <span className="text-xs font-medium text-slate-500">
                {answeredCount} of {questions.length} completed
              </span>
            </div>

            <div className="mt-7 grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
              {questions.map((_, index) => {
                const isAnswered =
                  answers[index] !== undefined &&
                  answers[index] !== null;

                const isCurrent =
                  currentQuestion === index;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      onQuestionSelect?.(index)
                    }
                    className={`relative flex aspect-square items-center justify-center rounded-2xl border text-sm font-bold transition-all duration-300 ${
                      isCurrent
                        ? "scale-105 border-indigo-300/50 bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)]"
                        : isAnswered
                        ? "border-emerald-400/20 bg-emerald-500/[0.08] text-emerald-300 hover:-translate-y-1 hover:border-emerald-400/45"
                        : "border-white/[0.08] bg-white/[0.025] text-slate-400 hover:-translate-y-1 hover:border-amber-400/35 hover:bg-amber-500/[0.06] hover:text-amber-300"
                    }`}
                  >
                    {index + 1}

                    {isAnswered && !isCurrent && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#101827] bg-emerald-500 text-[10px] text-white">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-5 border-t border-white/[0.06] pt-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                Answered
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
                Unanswered
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.7)]" />
                Current
              </div>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="mt-6 flex gap-4 rounded-3xl border border-amber-400/15 bg-gradient-to-r from-amber-500/[0.08] to-transparent p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-xl">
                ⚠
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-200">
                  You still have unanswered questions
                </h4>

                <p className="mt-1 text-xs leading-6 text-slate-400">
                  {unansweredCount}{" "}
                  {unansweredCount === 1
                    ? "question is"
                    : "questions are"}{" "}
                  waiting for an answer. You can still submit or return and complete them.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={onBackToQuiz}
              className="rounded-2xl border border-white/[0.09] bg-white/[0.035] px-6 py-4 text-sm font-bold text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/25 hover:bg-white/[0.07] hover:text-white"
            >
              ← Back to Quiz
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className="rounded-2xl border border-emerald-300/20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-[0_15px_40px_rgba(16,185,129,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)]"
            >
              Submit Quiz ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizReview;