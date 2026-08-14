import React, { useMemo, useState } from "react";

function Quiz({
  topic,
  difficulty,
  questionCount,
  currentQuestion,
  questions = [],
  selectedAnswer,
  userAnswers = {},
  onAnswerSelect,
  onNext,
  onBack,
}) {
  const [showResult, setShowResult] = useState(false);

  // =========================================================
  // ACTUAL QUESTION COUNT
  // =========================================================

  const totalQuestions = questions.length || questionCount || 0;

  // =========================================================
  // CURRENT QUESTION
  // =========================================================

  const question = questions?.[currentQuestion - 1];

  // =========================================================
  // OPTIONS
  // =========================================================

  const options = useMemo(() => {
    if (!question?.options) {
      return [];
    }

    // Object format:
    // {
    //   A: "Answer A",
    //   B: "Answer B",
    //   C: "Answer C",
    //   D: "Answer D"
    // }

    if (
      typeof question.options === "object" &&
      !Array.isArray(question.options)
    ) {
      return Object.entries(question.options);
    }

    // Array format:
    // ["Answer A", "Answer B", "Answer C", "Answer D"]

    if (Array.isArray(question.options)) {
      return question.options.map((option, index) => [
        String.fromCharCode(65 + index),
        option,
      ]);
    }

    return [];
  }, [question]);

  // =========================================================
  // PROGRESS
  // =========================================================

  const progress =
    totalQuestions > 0
      ? Math.round((currentQuestion / totalQuestions) * 100)
      : 0;

  // =========================================================
  // NORMALIZE ANSWER
  // =========================================================

  const normalizeAnswer = (answer) => {
    if (answer === null || answer === undefined) {
      return "";
    }

    return String(answer).trim().toUpperCase();
  };

  // =========================================================
  // RESULT CALCULATION
  // =========================================================

  const results = useMemo(() => {
    return questions.map((q, index) => {
      const userAnswer =
        userAnswers?.[index + 1] || null;

      const correctAnswer =
        q?.answer ||
        q?.correctAnswer ||
        q?.correct_answer ||
        null;

      const normalizedUserAnswer =
        normalizeAnswer(userAnswer);

      const normalizedCorrectAnswer =
        normalizeAnswer(correctAnswer);

      const isCorrect =
        normalizedUserAnswer !== "" &&
        normalizedCorrectAnswer !== "" &&
        normalizedUserAnswer === normalizedCorrectAnswer;

      return {
        ...q,
        questionNumber: index + 1,
        userAnswer,
        correctAnswer,
        isCorrect,
      };
    });
  }, [questions, userAnswers]);

  // =========================================================
  // SCORE
  // =========================================================

  const score = results.filter(
    (item) => item.isCorrect
  ).length;

  const percentage =
    totalQuestions > 0
      ? Math.round((score / totalQuestions) * 100)
      : 0;

  const wrongCount =
    totalQuestions - score;

  // =========================================================
  // FINISH QUIZ
  // =========================================================

  const handleFinishQuiz = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first.");
      return;
    }

    setShowResult(true);
  };

  // =========================================================
  // RESTART
  // =========================================================

  const handleRestart = () => {
    window.location.reload();
  };

  // =========================================================
  // RESULT PAGE
  // =========================================================

  if (showResult) {
    return (
      <div className="min-h-[calc(100vh-150px)] w-full">

        <div className="mx-auto flex w-full max-w-[1500px] flex-col">

          {/* =================================================
              RESULT HEADER
          ================================================= */}

          <div className="rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-8 text-center shadow-2xl sm:p-10 lg:p-12">

            <div className="text-5xl sm:text-6xl">
              {percentage >= 80
                ? "🏆"
                : percentage >= 50
                ? "🎉"
                : "💪"}
            </div>

            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Quiz Completed
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Your Quiz Result
            </h1>

            <p className="mt-3 text-base text-slate-400">
              {topic} <span className="text-slate-600">•</span>{" "}
              {difficulty}
            </p>

            {/* SCORE CARDS */}

            <div className="mx-auto mt-9 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Score */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                <p className="text-sm text-slate-500">
                  Score
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  {score}/{totalQuestions}
                </p>

              </div>

              {/* Percentage */}

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                <p className="text-sm text-slate-500">
                  Percentage
                </p>

                <p className="mt-2 text-4xl font-bold text-indigo-400">
                  {percentage}%
                </p>

              </div>

              {/* Correct */}

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

                <p className="text-sm text-slate-500">
                  Correct
                </p>

                <p className="mt-2 text-4xl font-bold text-emerald-400">
                  {score}
                </p>

              </div>

              {/* Wrong */}

              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

                <p className="text-sm text-slate-500">
                  Wrong
                </p>

                <p className="mt-2 text-4xl font-bold text-red-400">
                  {wrongCount}
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              QUESTION REVIEW
          ================================================= */}

          <div className="mt-10">

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                  Performance
                </p>

                <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                  Question Review
                </h2>

              </div>

              <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400">
                {totalQuestions} Questions
              </span>

            </div>

            {/* =================================================
                EACH QUESTION
            ================================================= */}

            <div className="space-y-6">

              {results.map((item) => (

                <div
                  key={item.questionNumber}
                  className={`rounded-[1.75rem] border p-6 shadow-xl sm:p-8 ${
                    item.isCorrect
                      ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                      : "border-red-500/30 bg-red-500/[0.04]"
                  }`}
                >

                  {/* QUESTION HEADER */}

                  <div className="flex items-start gap-4">

                    {/* NUMBER */}

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        item.isCorrect
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {item.questionNumber}
                    </div>

                    <div className="min-w-0 flex-1">

                      {/* STATUS */}

                      <div className="mb-3">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            item.isCorrect
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {item.isCorrect
                            ? "✓ Correct"
                            : "✕ Wrong"}
                        </span>

                      </div>

                      {/* QUESTION */}

                      <h3 className="text-lg font-semibold leading-relaxed text-white sm:text-xl lg:text-2xl">
                        {item.question}
                      </h3>

                    </div>

                  </div>

                  {/* =================================================
                      OPTIONS
                  ================================================= */}

                  <div className="mt-7 grid gap-4 md:grid-cols-2">

                    {Object.entries(
                      item.options || {}
                    ).map(([letter, text]) => {

                      const normalizedLetter =
                        normalizeAnswer(letter);

                      const normalizedCorrect =
                        normalizeAnswer(
                          item.correctAnswer
                        );

                      const normalizedUser =
                        normalizeAnswer(
                          item.userAnswer
                        );

                      const isCorrectOption =
                        normalizedLetter ===
                        normalizedCorrect;

                      const isUserOption =
                        normalizedLetter ===
                        normalizedUser;

                      let optionClass =
                        "border-white/10 bg-slate-950/60 text-slate-300";

                      if (isCorrectOption) {
                        optionClass =
                          "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
                      } else if (
                        isUserOption &&
                        !isCorrectOption
                      ) {
                        optionClass =
                          "border-red-500/50 bg-red-500/10 text-red-300";
                      }

                      return (
                        <div
                          key={letter}
                          className={`rounded-2xl border p-5 ${optionClass}`}
                        >

                          <div className="flex items-start gap-4">

                            {/* LETTER */}

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/20 font-bold">
                              {letter}
                            </span>

                            {/* TEXT */}

                            <span className="flex-1 text-sm leading-6 sm:text-base">
                              {text}
                            </span>

                            {/* CORRECT LABEL */}

                            {isCorrectOption && (
                              <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-400">
                                ✓ Correct
                              </span>
                            )}

                            {/* WRONG USER LABEL */}

                            {isUserOption &&
                              !isCorrectOption && (
                                <span className="shrink-0 rounded-full bg-red-500/10 px-2 py-1 text-xs font-bold text-red-400">
                                  ✕ Your Answer
                                </span>
                              )}

                          </div>

                        </div>
                      );
                    })}

                  </div>

                  {/* =================================================
                      ANSWER SUMMARY
                  ================================================= */}

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">

                    {/* USER ANSWER */}

                    <div
                      className={`rounded-2xl border p-5 ${
                        item.isCorrect
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-red-500/20 bg-red-500/5"
                      }`}
                    >

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Your Answer
                      </p>

                      <p
                        className={`mt-2 text-sm font-semibold leading-6 sm:text-base ${
                          item.isCorrect
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {item.userAnswer
                          ? `${item.userAnswer}. ${
                              item.options?.[
                                item.userAnswer
                              ] || ""
                            }`
                          : "Not answered"}
                      </p>

                    </div>

                    {/* CORRECT ANSWER */}

                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Correct Answer
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6 text-emerald-400 sm:text-base">
                        {item.correctAnswer
                          ? `${item.correctAnswer}. ${
                              item.options?.[
                                item.correctAnswer
                              ] || ""
                            }`
                          : "Correct answer unavailable"}
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      EXPLANATION
                  ================================================= */}

                  {item.explanation && (

                    <div className="mt-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.04] p-5">

                      <p className="mb-2 text-sm font-bold text-indigo-400">
                        💡 Explanation
                      </p>

                      <p className="text-sm leading-7 text-slate-300">
                        {item.explanation}
                      </p>

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="flex flex-col justify-center gap-4 py-10 sm:flex-row">

            <button
              type="button"
              onClick={handleRestart}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 font-bold text-white shadow-xl shadow-indigo-500/10 transition hover:-translate-y-1 hover:from-indigo-400 hover:to-purple-500"
            >
              🔄 Take Another Quiz
            </button>

            <button
              type="button"
              onClick={onBack}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              ← Back to Quiz Setup
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // QUESTION SAFETY
  // =========================================================

  if (!question) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center">

        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">

          <div className="text-4xl">
            ⚠️
          </div>

          <p className="mt-4 text-lg font-semibold text-red-400">
            Unable to load this question.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Please go back and generate the quiz again.
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN QUIZ PAGE
  // =========================================================

  return (
    <div className="min-h-[calc(100vh-170px)] w-full">

      {/* =====================================================
          FULL AVAILABLE QUIZ AREA
      ====================================================== */}

      <div className="mx-auto flex min-h-[calc(100vh-190px)] w-full max-w-[1500px] flex-col">

        {/* ===================================================
            TOP INFO
        ==================================================== */}

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="mb-2 flex flex-wrap items-center gap-2">

                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
                  {difficulty} Quiz
                </span>

                <span className="text-slate-600">
                  •
                </span>

                <span className="text-sm text-slate-400">
                  {topic}
                </span>

              </div>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Question {currentQuestion} of{" "}
                {totalQuestions}
              </h2>

            </div>

            <div className="sm:text-right">

              <p className="text-sm text-slate-500">
                Progress
              </p>

              <p className="mt-1 text-xl font-bold text-indigo-400">
                {progress}%
              </p>

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* ===================================================
            MAIN QUESTION AREA
        ==================================================== */}

        <div className="mt-6 flex flex-1">

          <div className="flex w-full flex-col rounded-[2rem] border border-white/10 bg-slate-900/80 p-7 shadow-2xl sm:p-9 lg:p-12">

            {/* =================================================
                QUESTION
            ================================================= */}

            <div>

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-indigo-400">
                Question {currentQuestion}
              </p>

              <h1 className="max-w-6xl text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl">
                {question.question}
              </h1>

            </div>

            {/* =================================================
                OPTIONS
            ================================================= */}

            <div className="mt-9 grid flex-1 content-start gap-5 md:grid-cols-2">

              {options.map(([letter, text]) => {

                const isSelected =
                  normalizeAnswer(selectedAnswer) ===
                  normalizeAnswer(letter);

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() =>
                      onAnswerSelect(letter)
                    }
                    className={`group min-h-[120px] w-full rounded-2xl border p-6 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/10"
                        : "border-white/10 bg-slate-950/50 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-white/5"
                    }`}
                  >

                    <div className="flex h-full items-start gap-5">

                      {/* OPTION LETTER */}

                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                          isSelected
                            ? "bg-indigo-500 text-white"
                            : "bg-slate-800 text-slate-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-400"
                        }`}
                      >
                        {letter}
                      </span>

                      {/* OPTION TEXT */}

                      <span
                        className={`pt-1 text-base leading-7 lg:text-lg ${
                          isSelected
                            ? "font-semibold text-white"
                            : "text-slate-300"
                        }`}
                      >
                        {text}
                      </span>

                    </div>

                  </button>
                );
              })}

            </div>

            {/* =================================================
                NAVIGATION
            ================================================= */}

            <div className="mt-10 flex flex-col-reverse gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

              {/* BACK */}

              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                ← Back
              </button>

              {/* NEXT / FINISH */}

              {currentQuestion <
              totalQuestions ? (

                <button
                  type="button"
                  onClick={onNext}
                  disabled={!selectedAnswer}
                  className={`rounded-xl px-9 py-3.5 font-semibold transition ${
                    selectedAnswer
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:-translate-y-0.5"
                      : "cursor-not-allowed bg-slate-800 text-slate-500"
                  }`}
                >
                  Next Question →
                </button>

              ) : (

                <button
                  type="button"
                  onClick={handleFinishQuiz}
                  disabled={!selectedAnswer}
                  className={`rounded-xl px-9 py-3.5 font-semibold transition ${
                    selectedAnswer
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:-translate-y-0.5"
                      : "cursor-not-allowed bg-slate-800 text-slate-500"
                  }`}
                >
                  Finish Quiz 🎉
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Quiz;