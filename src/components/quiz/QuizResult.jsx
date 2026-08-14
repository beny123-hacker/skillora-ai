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
      const userAnswer = answers[index + 1];

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
      ? Math.round((correctCount / total) * 100)
      : 0;

  return (
    <div className="mx-auto w-full max-w-6xl">

      {/* =====================================================
          RESULT HEADER
      ===================================================== */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/15 text-4xl">
          🏆
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-indigo-400">
          Quiz Completed
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Great Job! 🎉
        </h1>

        <p className="mt-2 text-slate-400">
          Here is your performance for{" "}
          <span className="font-medium text-white">
            {topic}
          </span>
        </p>

        {/* Score */}

        <div className="mx-auto mt-8 flex max-w-md items-center justify-center">

          <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-8 border-indigo-500/30 bg-slate-950">

            <span className="text-4xl font-bold text-white">
              {correctCount}/{total}
            </span>

            <span className="mt-1 text-sm text-slate-400">
              {percentage}%
            </span>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <p className="text-3xl font-bold text-emerald-400">
              {correctCount}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Correct
            </p>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-3xl font-bold text-red-400">
              {wrongCount}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Wrong
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
            <p className="text-3xl font-bold text-yellow-400">
              {unansweredCount}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Unanswered
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          QUESTION REVIEW
      ===================================================== */}

      <div className="mt-8 space-y-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Question Review
          </h2>

          <p className="mt-1 text-slate-400">
            See which answers you got right and wrong.
          </p>
        </div>

        {questions.map((question, index) => {

          const questionNumber = index + 1;

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
              key={question.id || questionNumber}
              className={`
                overflow-hidden rounded-3xl border bg-slate-900/80
                ${
                  isCorrect
                    ? "border-emerald-500/30"
                    : "border-red-500/30"
                }
              `}
            >

              {/* Question heading */}

              <div className="border-b border-white/10 p-6">

                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">

                  <div className="flex gap-4">

                    <div
                      className={`
                        flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold
                        ${
                          isCorrect
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        }
                      `}
                    >
                      {questionNumber}
                    </div>

                    <h3 className="text-lg font-semibold leading-relaxed text-white">
                      {question.question}
                    </h3>

                  </div>

                  <div
                    className={`
                      rounded-full px-4 py-1.5 text-sm font-semibold
                      ${
                        isCorrect
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }
                    `}
                  >
                    {isCorrect
                      ? "✓ Correct"
                      : "✗ Wrong"}
                  </div>

                </div>

              </div>

              {/* Options */}

              <div className="space-y-3 p-6">

                {["A", "B", "C", "D"].map((key) => {

                  const isUserAnswer =
                    userAnswer === key;

                  const isCorrectAnswer =
                    correctAnswer === key;

                  let optionStyle =
                    "border-white/10 bg-slate-950/50 text-slate-300";

                  if (isCorrectAnswer) {
                    optionStyle =
                      "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                  }

                  if (
                    isUserAnswer &&
                    !isCorrectAnswer
                  ) {
                    optionStyle =
                      "border-red-500/50 bg-red-500/10 text-red-300";
                  }

                  return (
                    <div
                      key={key}
                      className={`flex items-center gap-4 rounded-2xl border p-4 ${optionStyle}`}
                    >

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 font-bold">
                        {key}
                      </div>

                      <span className="flex-1">
                        {options[key]}
                      </span>

                      {/* Status */}

                      {isCorrectAnswer && (
                        <span className="font-semibold text-emerald-400">
                          ✓ Correct Answer
                        </span>
                      )}

                      {isUserAnswer &&
                        !isCorrectAnswer && (
                          <span className="font-semibold text-red-400">
                            ✗ Your Answer
                          </span>
                        )}

                    </div>
                  );
                })}

              </div>

              {/* Explanation */}

              {question.explanation && (
                <div className="mx-6 mb-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

                  <p className="font-semibold text-indigo-300">
                    💡 Explanation
                  </p>

                  <p className="mt-2 leading-relaxed text-slate-300">
                    {question.explanation}
                  </p>

                </div>
              )}

              {/* Answer summary */}

              <div className="border-t border-white/10 bg-slate-950/40 px-6 py-4">

                <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">

                  <span className="text-slate-400">
                    Your answer:{" "}
                    <span
                      className={
                        isCorrect
                          ? "font-semibold text-emerald-400"
                          : "font-semibold text-red-400"
                      }
                    >
                      {userAnswer
                        ? `${userAnswer} - ${options[userAnswer]}`
                        : "Not answered"}
                    </span>
                  </span>

                  <span className="text-slate-400">
                    Correct answer:{" "}
                    <span className="font-semibold text-emerald-400">
                      {correctAnswer} -{" "}
                      {options[correctAnswer]}
                    </span>
                  </span>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* =====================================================
          TRY AGAIN
      ===================================================== */}

      <div className="py-10 text-center">

        <button
          type="button"
          onClick={onTryAgain}
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02]"
        >
          🔄 Take Another Quiz
        </button>

      </div>

    </div>
  );
}

export default QuizResult;