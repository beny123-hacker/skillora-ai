import React from "react";
import "../../styles/quiz.css";

function QuizLoading({
  topic,
  difficulty,
  questionCount,
}) {
  const displayTopic = topic || "Selected Topic";
  const displayDifficulty = difficulty || "Selected Level";
  const displayQuestionCount =
    questionCount || "Selected Count";

  return (
    <div className="quiz-loading-page">

      {/* Ambient background */}
      <div className="quiz-loading-orb quiz-loading-orb-one" />
      <div className="quiz-loading-orb quiz-loading-orb-two" />

      <div className="quiz-loading-container">

        {/* =====================================================
            TOP BRAND
        ====================================================== */}

        <div className="quiz-loading-brand">
          <div className="quiz-loading-brand-icon">
            ✦
          </div>

          <div>
            <span>SKILLORA</span>
            <small>AI QUIZ ENGINE</small>
          </div>
        </div>


        {/* =====================================================
            MAIN AI VISUAL
        ====================================================== */}

        <div className="quiz-ai-visual">

          <div className="quiz-ai-ring quiz-ai-ring-one" />
          <div className="quiz-ai-ring quiz-ai-ring-two" />

          <div className="quiz-ai-core">
            <span>✦</span>
          </div>

          <div className="quiz-ai-particle quiz-ai-particle-one">
            +
          </div>

          <div className="quiz-ai-particle quiz-ai-particle-two">
            ✦
          </div>

          <div className="quiz-ai-particle quiz-ai-particle-three">
            ·
          </div>

        </div>


        {/* =====================================================
            TITLE
        ====================================================== */}

        <div className="quiz-loading-heading">

          <div className="quiz-generating-badge">
            <span className="quiz-live-dot" />
            AI IS WORKING
          </div>

          <h1>
            Creating your quiz
            <span className="quiz-loading-dots">
              ...
            </span>
          </h1>

          <p>
            Skillora AI is crafting questions specifically
            for your selected learning session.
          </p>

        </div>


        {/* =====================================================
            QUIZ SUMMARY
        ====================================================== */}

        <div className="quiz-loading-summary">

          {/* Topic */}

          <div className="quiz-summary-item">

            <div className="quiz-summary-icon topic-icon">
              <span>⌁</span>
            </div>

            <div className="quiz-summary-content">

              <span className="quiz-summary-label">
                TOPIC
              </span>

              <strong>
                {displayTopic}
              </strong>

            </div>

          </div>


          <div className="quiz-summary-divider" />


          {/* Difficulty */}

          <div className="quiz-summary-item">

            <div className="quiz-summary-icon difficulty-icon">
              <span>◈</span>
            </div>

            <div className="quiz-summary-content">

              <span className="quiz-summary-label">
                DIFFICULTY
              </span>

              <strong>
                {displayDifficulty}
              </strong>

            </div>

          </div>


          <div className="quiz-summary-divider" />


          {/* Questions */}

          <div className="quiz-summary-item">

            <div className="quiz-summary-icon questions-icon">
              <span>≡</span>
            </div>

            <div className="quiz-summary-content">

              <span className="quiz-summary-label">
                QUESTIONS
              </span>

              <strong>
                {displayQuestionCount}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================================
            GENERATION PROGRESS
        ====================================================== */}

        <div className="quiz-generation-section">

          <div className="quiz-generation-header">

            <div>
              <span className="quiz-generation-eyebrow">
                GENERATION STATUS
              </span>

              <strong>
                Preparing your experience
              </strong>
            </div>

            <span className="quiz-generation-percent">
              AI
            </span>

          </div>


          <div className="quiz-progress-track">

            <div className="quiz-progress-fill">
              <div className="quiz-progress-glow" />
            </div>

          </div>


          <div className="quiz-progress-caption">
            <span>
              Generating personalized questions
            </span>

            <span>
              Please wait...
            </span>
          </div>

        </div>


        {/* =====================================================
            AI PROCESS STEPS
        ====================================================== */}

        <div className="quiz-loading-steps">

          {/* Step 1 */}

          <div className="quiz-loading-step completed">

            <div className="quiz-step-icon">
              ✓
            </div>

            <div className="quiz-step-text">
              <strong>
                Preferences analyzed
              </strong>

              <span>
                Understanding your quiz settings
              </span>
            </div>

          </div>


          {/* Step 2 */}

          <div className="quiz-loading-step active">

            <div className="quiz-step-icon">
              <span className="quiz-step-spinner" />
            </div>

            <div className="quiz-step-text">
              <strong>
                Questions being generated
              </strong>

              <span>
                AI is building your questions
              </span>
            </div>

          </div>


          {/* Step 3 */}

          <div className="quiz-loading-step">

            <div className="quiz-step-icon">
              3
            </div>

            <div className="quiz-step-text">
              <strong>
                Quiz preparation
              </strong>

              <span>
                Finalizing your learning session
              </span>
            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER TIP
        ====================================================== */}

        <div className="quiz-loading-tip">

          <div className="quiz-tip-icon">
            ✦
          </div>

          <div>
            <strong>
              Smart learning is on the way
            </strong>

            <p>
              Your questions are being generated based on
              the topic, difficulty and number of questions
              you selected.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default QuizLoading;