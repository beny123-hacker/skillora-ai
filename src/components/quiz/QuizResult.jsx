import React from "react";

function QuizResult({
  questions,
  answers,
  topic,
  onTryAgain,
}) {
  const total = questions.length;

  const correctCount = questions.filter(
    (question, index) =>
      answers[index + 1] === question.answer
  ).length;

  const wrongCount = questions.filter(
    (question, index) => {
      const userAnswer =
        answers[index + 1];

      return (
        userAnswer &&
        userAnswer !== question.answer
      );
    }
  ).length;

  const unansweredCount =
    total - correctCount - wrongCount;

  const percentage =
    total > 0
      ? Math.round(
          (correctCount / total) * 100
        )
      : 0;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="relative overflow-hidden rounded-[36px] border border-indigo-400/15 bg-gradient-to-br from-[#171f35] via-[#101729] to-[#0a0f1e] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.4)] sm:p-10">
        <div className="pointer-events-none absolute left-1/4 top-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="pointer-events-none absolute right-1/4 top-[100px] h-[350px] w-[350px] rounded-full bg-purple-600/[0.07] blur-[130px]" />

        <div className="relative text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] border border-amber-300/20 bg-gradient-to-br from-amber-400/20 to-orange-500/10 text-5xl shadow-[0_20px_50px_rgba(245,158,11,0.15)]">
            🏆
          </div>

          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.35em] text-indigo-300">
            Assessment Complete
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Quiz Results
          </h1>

          <p className="mt-4 text-sm text-slate-400">
            Performance summary for{" "}
            <span className="font-semibold text-indigo-200">
              {topic}
            </span>
          </p>

          <div className="mx-auto mt-10 flex h-52 w-52 items-center justify-center rounded-full bg-[conic-gradient(#6366f1_0deg,#8b5cf6_220deg,#1e293b_220deg,#1e293b_360deg)] p-[8px] shadow-[0_20px_70px_rgba(79,70,229,0.25)]">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/[0.06] bg-[#0b1020]">
              <span className="text-5xl font-bold text-white">
                {percentage}%
              </span>

              <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Final Score
              </span>

              <span className="mt-4 text-sm font-semibold text-indigo-300">
                {correctCount} / {total} correct
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-emerald-400/15 bg-emerald-500/[0.07] p-6">
              <p className="text-4xl font-bold text-emerald-300">
                {correctCount}
              </p>

              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-emerald-300/60">
                Correct Answers
              </p>
            </div>

            <div className="rounded-3xl border border-red-400/15 bg-red-500/[0.07] p-6">
              <p className="text-4xl font-bold text-red-300">
                {wrongCount}
              </p>

              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-300/60">
                Incorrect Answers
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/15 bg-amber-500/[0.07] p-6">
              <p className="text-4xl font-bold text-amber-300">
                {unansweredCount}
              </p>

              <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-amber-300/60">
                Not Answered
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-col gap-3 border-l-2 border-indigo-500 pl-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-300">
            Detailed Analysis
          </p>

          <h2 className="text-3xl font-bold text-white">
            Question Review
          </h2>

          <p className="text-sm text-slate-500">
            Review your answers and understand each correct solution.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {questions.map(
            (question, index) => {
              const questionNumber =
                index + 1;

              const userAnswer =
                answers[questionNumber];

              const correctAnswer =
                question.answer;

              const isCorrect =
                userAnswer === correctAnswer;

              const options =
                question.options || {};

              return (
                <div
                  key={
                    question.id ||
                    questionNumber
                  }
                  className={`overflow-hidden rounded-[28px] border bg-[#101727]/80 shadow-xl shadow-black/20 ${
                    isCorrect
                      ? "border-emerald-400/20"
                      : "border-red-400/20"
                  }`}
                >
                  <div className="relative overflow-hidden border-b border-white/[0.06] p-6 sm:p-8">
                    <div
                      className={`absolute left-0 top-0 h-full w-1 ${
                        isCorrect
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      }`}
                    />

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-5">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold ${
                            isCorrect
                              ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                              : "border-red-400/20 bg-red-500/10 text-red-300"
                          }`}
                        >
                          {String(
                            questionNumber
                          ).padStart(2, "0")}
                        </div>

                        <div>
                          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                            Question {questionNumber}
                          </p>

                          <h3 className="text-lg font-semibold leading-8 text-white sm:text-xl">
                            {question.question}
                          </h3>
                        </div>
                      </div>

                      <div
                        className={`w-fit rounded-full border px-4 py-2 text-xs font-bold ${
                          isCorrect
                            ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                            : "border-red-400/20 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {isCorrect
                          ? "✓ Correct"
                          : "✕ Incorrect"}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
                    {["A", "B", "C", "D"].map(
                      (key) => {
                        const isUserAnswer =
                          userAnswer === key;

                        const isCorrectAnswer =
                          correctAnswer === key;

                        let optionStyle =
                          "border-white/[0.07] bg-white/[0.025] text-slate-400";

                        if (
                          isCorrectAnswer
                        ) {
                          optionStyle =
                            "border-emerald-400/30 bg-emerald-500/[0.09] text-emerald-100";
                        }

                        if (
                          isUserAnswer &&
                          !isCorrectAnswer
                        ) {
                          optionStyle =
                            "border-red-400/30 bg-red-500/[0.09] text-red-100";
                        }

                        return (
                          <div
                            key={key}
                            className={`relative flex min-h-[72px] items-center gap-4 rounded-2xl border p-4 ${optionStyle}`}
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#182238] font-bold text-slate-300">
                              {key}
                            </div>

                            <span className="flex-1 text-sm leading-6">
                              {options[key]}
                            </span>

                            {isCorrectAnswer && (
                              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                                Correct
                              </span>
                            )}

                            {isUserAnswer &&
                              !isCorrectAnswer && (
                                <span className="rounded-full bg-red-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-red-300">
                                  Your Choice
                                </span>
                              )}
                          </div>
                        );
                      }
                    )}
                  </div>

                  {question.explanation && (
                    <div className="mx-6 mb-6 rounded-3xl border border-indigo-400/15 bg-gradient-to-r from-indigo-500/[0.09] to-purple-500/[0.04] p-6 sm:mx-8 sm:mb-8">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-lg">
                          💡
                        </div>

                        <p className="text-sm font-bold text-indigo-200">
                          Explanation
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        {question.explanation}
                      </p>
                    </div>
                  )}

                  <div className="grid gap-4 border-t border-white/[0.06] bg-black/[0.12] px-6 py-5 text-sm sm:grid-cols-2 sm:px-8">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                        Your Answer
                      </p>

                      <p
                        className={`mt-1 font-semibold ${
                          isCorrect
                            ? "text-emerald-300"
                            : "text-red-300"
                        }`}
                      >
                        {userAnswer
                          ? `${userAnswer} — ${options[userAnswer]}`
                          : "Not answered"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                        Correct Answer
                      </p>

                      <p className="mt-1 font-semibold text-emerald-300">
                        {correctAnswer} —{" "}
                        {
                          options[
                            correctAnswer
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="py-12 text-center">
        <button
          type="button"
          onClick={onTryAgain}
          className="group inline-flex items-center gap-3 rounded-2xl border border-indigo-300/20 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-[0_15px_45px_rgba(79,70,229,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(79,70,229,0.45)]"
        >
          <span className="transition-transform duration-300 group-hover:rotate-180">
            ↻
          </span>

          Take Another Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizResult;