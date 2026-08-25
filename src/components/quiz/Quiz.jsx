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

  const totalQuestions =
    questions.length || questionCount || 0;

  const question =
    questions?.[currentQuestion - 1];

  const options = useMemo(() => {
    if (!question?.options) {
      return [];
    }

    if (
      typeof question.options === "object" &&
      !Array.isArray(question.options)
    ) {
      return Object.entries(question.options);
    }

    if (Array.isArray(question.options)) {
      return question.options.map(
        (option, index) => [
          String.fromCharCode(65 + index),
          option,
        ]
      );
    }

    return [];
  }, [question]);

  const progress =
    totalQuestions > 0
      ? Math.round(
          (currentQuestion / totalQuestions) * 100
        )
      : 0;

  const normalizeAnswer = (answer) => {
    if (
      answer === null ||
      answer === undefined
    ) {
      return "";
    }

    return String(answer)
      .trim()
      .toUpperCase();
  };

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
        normalizedUserAnswer ===
          normalizedCorrectAnswer;

      return {
        ...q,
        questionNumber: index + 1,
        userAnswer,
        correctAnswer,
        isCorrect,
      };
    });
  }, [questions, userAnswers]);

  const score = results.filter(
    (item) => item.isCorrect
  ).length;

  const percentage =
    totalQuestions > 0
      ? Math.round(
          (score / totalQuestions) * 100
        )
      : 0;

  const wrongCount =
    totalQuestions - score;

  const handleFinishQuiz = () => {
    if (!selectedAnswer) {
      alert("Please select an answer first.");
      return;
    }

    setShowResult(true);
  };

  const handleRestart = () => {
    window.location.reload();
  };


  /* =========================================================
     RESULT SCREEN
  ========================================================== */

  if (showResult) {
    return (
      <div className="premium-quiz-page">

        <div className="quiz-result-shell">

          {/* RESULT HERO */}

          <section className="quiz-result-hero">

            <div className="result-glow" />

            <div className="result-icon">
              {percentage >= 80
                ? "🏆"
                : percentage >= 50
                ? "🎉"
                : "💪"}
            </div>

            <span className="result-eyebrow">
              QUIZ COMPLETED
            </span>

            <h1>
              Your learning result
            </h1>

            <p>
              {topic}
              <span>•</span>
              {difficulty}
            </p>

          </section>


          {/* SCORE GRID */}

          <section className="result-score-grid">

            <div className="result-stat-card">

              <span>
                SCORE
              </span>

              <strong>
                {score}/{totalQuestions}
              </strong>

            </div>

            <div className="result-stat-card accent">

              <span>
                PERCENTAGE
              </span>

              <strong>
                {percentage}%
              </strong>

            </div>

            <div className="result-stat-card success">

              <span>
                CORRECT
              </span>

              <strong>
                {score}
              </strong>

            </div>

            <div className="result-stat-card danger">

              <span>
                WRONG
              </span>

              <strong>
                {wrongCount}
              </strong>

            </div>

          </section>


          {/* REVIEW */}

          <section className="quiz-review-section">

            <div className="review-heading">

              <div>

                <span>
                  PERFORMANCE
                </span>

                <h2>
                  Question review
                </h2>

              </div>

              <div className="review-count">
                {totalQuestions} Questions
              </div>

            </div>


            <div className="review-list">

              {results.map((item) => (

                <article
                  key={item.questionNumber}
                  className={`review-card ${
                    item.isCorrect
                      ? "is-correct"
                      : "is-wrong"
                  }`}
                >

                  <div className="review-card-header">

                    <div className="review-number">
                      {String(
                        item.questionNumber
                      ).padStart(2, "0")}
                    </div>

                    <div className="review-question">

                      <span
                        className={`review-status ${
                          item.isCorrect
                            ? "correct"
                            : "wrong"
                        }`}
                      >
                        {item.isCorrect
                          ? "✓ Correct"
                          : "✕ Wrong"}
                      </span>

                      <h3>
                        {item.question}
                      </h3>

                    </div>

                  </div>


                  {/* OPTIONS */}

                  <div className="review-options">

                    {Object.entries(
                      item.options || {}
                    ).map(
                      ([letter, text]) => {

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
                          "";

                        if (isCorrectOption) {
                          optionClass =
                            "correct-option";
                        } else if (
                          isUserOption &&
                          !isCorrectOption
                        ) {
                          optionClass =
                            "wrong-option";
                        }

                        return (
                          <div
                            key={letter}
                            className={`review-option ${optionClass}`}
                          >

                            <span className="review-option-letter">
                              {letter}
                            </span>

                            <span className="review-option-text">
                              {text}
                            </span>

                            {isCorrectOption && (
                              <span className="review-option-label">
                                ✓ Correct
                              </span>
                            )}

                            {isUserOption &&
                              !isCorrectOption && (
                                <span className="review-option-label wrong">
                                  Your Answer
                                </span>
                              )}

                          </div>
                        );
                      }
                    )}

                  </div>


                  {/* ANSWER SUMMARY */}

                  <div className="answer-summary">

                    <div
                      className={`answer-box ${
                        item.isCorrect
                          ? "correct-answer-box"
                          : "wrong-answer-box"
                      }`}
                    >

                      <span>
                        YOUR ANSWER
                      </span>

                      <strong>
                        {item.userAnswer
                          ? `${item.userAnswer}. ${
                              item.options?.[
                                item.userAnswer
                              ] || ""
                            }`
                          : "Not answered"}
                      </strong>

                    </div>


                    <div className="answer-box correct-answer-box">

                      <span>
                        CORRECT ANSWER
                      </span>

                      <strong>
                        {item.correctAnswer
                          ? `${item.correctAnswer}. ${
                              item.options?.[
                                item.correctAnswer
                              ] || ""
                            }`
                          : "Correct answer unavailable"}
                      </strong>

                    </div>

                  </div>


                  {/* EXPLANATION */}

                  {item.explanation && (
                    <div className="review-explanation">

                      <span>
                        💡 Explanation
                      </span>

                      <p>
                        {item.explanation}
                      </p>

                    </div>
                  )}

                </article>

              ))}

            </div>

          </section>


          {/* RESULT ACTIONS */}

          <div className="quiz-result-actions">

            <button
              type="button"
              onClick={handleRestart}
              className="premium-primary-button"
            >
              <span>
                🔄
              </span>

              Take Another Quiz
            </button>

            <button
              type="button"
              onClick={onBack}
              className="premium-secondary-button"
            >
              ← Back to Quiz Setup
            </button>

          </div>

        </div>

      </div>
    );
  }


  /* =========================================================
     QUESTION SAFETY
  ========================================================== */

  if (!question) {
    return (
      <div className="quiz-empty-state">

        <div className="quiz-empty-card">

          <div>
            ⚠️
          </div>

          <h2>
            Unable to load this question
          </h2>

          <p>
            Please go back and generate the quiz again.
          </p>

        </div>

      </div>
    );
  }


  /* =========================================================
     MAIN QUIZ
  ========================================================== */

  return (
    <div className="premium-quiz-page">

      <div className="premium-quiz-shell">

        {/* TOP BAR */}

        <div className="quiz-playing-topbar">

          <div>

            <div className="quiz-playing-meta">

              <span>
                {difficulty}
              </span>

              <span>
                •
              </span>

              <strong>
                {topic}
              </strong>

            </div>

            <h1>
              Question {currentQuestion}
              <span>
                / {totalQuestions}
              </span>
            </h1>

          </div>


          <div className="quiz-progress-info">

            <span>
              Progress
            </span>

            <strong>
              {progress}%
            </strong>

          </div>

        </div>


        {/* PROGRESS BAR */}

        <div className="premium-progress">

          <div
            className="premium-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        {/* QUESTION CARD */}

        <main className="premium-question-card">

          <div className="question-card-header">

            <span>
              QUESTION {String(
                currentQuestion
              ).padStart(2, "0")}
            </span>

            <div className="question-status-dot" />

          </div>


          <h2 className="premium-question-title">
            {question.question}
          </h2>


          {/* OPTIONS */}

          <div className="premium-options-grid">

            {options.map(
              ([letter, text]) => {

                const isSelected =
                  normalizeAnswer(
                    selectedAnswer
                  ) ===
                  normalizeAnswer(letter);

                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() =>
                      onAnswerSelect(letter)
                    }
                    className={`premium-option ${
                      isSelected
                        ? "is-selected"
                        : ""
                    }`}
                  >

                    <span
                      className={`premium-option-letter ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                    >
                      {letter}
                    </span>

                    <span className="premium-option-text">
                      {text}
                    </span>

                    <span
                      className={`premium-option-radio ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                    >
                      {isSelected
                        ? "✓"
                        : ""}
                    </span>

                  </button>
                );
              }
            )}

          </div>


          {/* NAVIGATION */}

          <div className="premium-question-footer">

            <button
              type="button"
              onClick={onBack}
              className="premium-back-button"
            >
              ← Back
            </button>


            {currentQuestion <
            totalQuestions ? (

              <button
                type="button"
                onClick={onNext}
                disabled={!selectedAnswer}
                className={`premium-next-button ${
                  !selectedAnswer
                    ? "disabled"
                    : ""
                }`}
              >
                Next Question
                <span>
                  →
                </span>
              </button>

            ) : (

              <button
                type="button"
                onClick={handleFinishQuiz}
                disabled={!selectedAnswer}
                className={`premium-finish-button ${
                  !selectedAnswer
                    ? "disabled"
                    : ""
                }`}
              >
                Finish Quiz
                <span>
                  ✓
                </span>
              </button>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Quiz;