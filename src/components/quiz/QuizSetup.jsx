import React, { useState } from "react";

function QuizSetup({
  topics = [],
  selectedTopic,
  setSelectedTopic,
  difficulty = "Medium",
  setDifficulty,
  questionCount = 10,
  setQuestionCount,
  onStartQuiz,
  loading = false,
}) {
  const [customTopic, setCustomTopic] = useState("");

  const handleCustomTopicChange = (event) => {
    const value = event.target.value;

    setCustomTopic(value);

    if (value.trim()) {
      setSelectedTopic(value.trim());
    } else {
      setSelectedTopic("");
    }
  };

  const handleTopicSelect = (topicId) => {
    setCustomTopic("");
    setSelectedTopic(topicId);
  };

  const selectedTopicData = topics.find(
    (topic) => topic.id === selectedTopic
  );

  return (
    <div className="quiz-setup">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="quiz-hero">

        <div className="quiz-hero-content">

          <div className="quiz-eyebrow">
            <span className="quiz-eyebrow-dot" />
            AI POWERED LEARNING
          </div>

          <h1 className="quiz-hero-title">
            Build your
            <span> perfect quiz.</span>
          </h1>

          <p className="quiz-hero-description">
            Choose what you want to learn, set your challenge level,
            and let Skillora AI create a personalized quiz for you.
          </p>

          <div className="quiz-hero-features">

            <span>
              <b>✦</b>
              AI Generated
            </span>

            <span>
              <b>◈</b>
              Personalized
            </span>

            <span>
              <b>⚡</b>
              Instant Results
            </span>

          </div>

        </div>

        <div className="quiz-hero-orb quiz-hero-orb-one" />
        <div className="quiz-hero-orb quiz-hero-orb-two" />

      </section>


      {/* =====================================================
          TOPIC SECTION
      ====================================================== */}

      <section className="quiz-section">

        <div className="quiz-section-header">

          <div>

            <div className="quiz-section-kicker">
              STEP 01
            </div>

            <h2>
              What do you want to master?
            </h2>

            <p>
              Choose a topic below or create your own learning challenge.
            </p>

          </div>

          <div className="quiz-topic-count">
            <span>Available topics</span>
            <strong>{topics.length}</strong>
          </div>

        </div>


        {/* ===================================================
            TOPIC GRID
        ==================================================== */}

        <div className="quiz-topic-grid">

          {topics.map((topic, index) => {

            const selected =
              selectedTopic === topic.id && !customTopic;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleTopicSelect(topic.id)}
                className={`quiz-topic-card ${
                  selected ? "is-selected" : ""
                }`}
              >

                <div className="quiz-topic-card-top">

                  <div className="quiz-topic-icon">
                    {topic.icon}
                  </div>

                  <span className="quiz-topic-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <div className="quiz-topic-content">

                  <h3>
                    {topic.name}
                  </h3>

                  <p>
                    {topic.description}
                  </p>

                </div>

                <div className="quiz-topic-action">

                  <span>
                    {selected
                      ? "Selected"
                      : "Choose topic"}
                  </span>

                  <span className="quiz-topic-arrow">
                    →
                  </span>

                </div>

                {selected && (
                  <div className="quiz-topic-selected">
                    ✓
                  </div>
                )}

              </button>
            );
          })}

        </div>


        {/* ===================================================
            CUSTOM TOPIC
        ==================================================== */}

        <div
          className={`quiz-custom-topic ${
            customTopic ? "is-active" : ""
          }`}
        >

          <div className="quiz-custom-icon">
            ✦
          </div>

          <div className="quiz-custom-content">

            <div>

              <span>
                CUSTOM TOPIC
              </span>

              <h3>
                Learn anything you want
              </h3>

              <p>
                Enter a subject, technology, concept, or skill.
              </p>

            </div>

            <div className="quiz-custom-input-wrapper">

              <input
                id="custom-topic"
                type="text"
                value={customTopic}
                onChange={handleCustomTopicChange}
                placeholder="Try Machine Learning, Cybersecurity, Cloud Computing..."
              />

              <span className="quiz-input-icon">
                ✦
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SETTINGS
      ====================================================== */}

      <section className="quiz-settings-section">

        <div className="quiz-section-header">

          <div>

            <div className="quiz-section-kicker purple">
              STEP 02
            </div>

            <h2>
              Shape your challenge
            </h2>

            <p>
              Adjust the difficulty and length of your quiz.
            </p>

          </div>

        </div>


        <div className="quiz-settings-grid">

          {/* =================================================
              DIFFICULTY
          ================================================== */}

          <div className="quiz-setting-card">

            <div className="quiz-setting-header">

              <div>

                <span className="quiz-setting-label">
                  Difficulty
                </span>

                <p>
                  Choose your challenge level.
                </p>

              </div>

              <span className="quiz-setting-icon">
                🎯
              </span>

            </div>


            <div className="quiz-difficulty-grid">

              {["Easy", "Medium", "Hard"].map((level) => {

                const selected =
                  difficulty === level;

                const levelIcon =
                  level === "Easy"
                    ? "🌱"
                    : level === "Medium"
                    ? "⚡"
                    : "🔥";

                const levelDescription =
                  level === "Easy"
                    ? "Build confidence"
                    : level === "Medium"
                    ? "Balanced challenge"
                    : "Push your limits";

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setDifficulty(level)
                    }
                    className={`quiz-difficulty-option ${
                      selected ? "is-selected" : ""
                    }`}
                  >

                    <span className="difficulty-icon">
                      {levelIcon}
                    </span>

                    <strong>
                      {level}
                    </strong>

                    <small>
                      {levelDescription}
                    </small>

                    {selected && (
                      <span className="difficulty-check">
                        ✓
                      </span>
                    )}

                  </button>
                );
              })}

            </div>

          </div>


          {/* =================================================
              QUESTION COUNT
          ================================================== */}

          <div className="quiz-setting-card">

            <div className="quiz-setting-header">

              <div>

                <span className="quiz-setting-label">
                  Question Count
                </span>

                <p>
                  Decide how long your learning challenge will be.
                </p>

              </div>

              <span className="quiz-setting-icon">
                📝
              </span>

            </div>


            <div className="quiz-count-grid">

              {[5, 10, 15, 20].map((count) => {

                const selected =
                  questionCount === count;

                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() =>
                      setQuestionCount(count)
                    }
                    className={`quiz-count-option ${
                      selected ? "is-selected" : ""
                    }`}
                  >

                    <strong>
                      {count}
                    </strong>

                    <span>
                      Questions
                    </span>

                    {selected && (
                      <span className="count-check">
                        ✓
                      </span>
                    )}

                  </button>
                );
              })}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CONFIGURATION
      ====================================================== */}

      <section className="quiz-final-card">

        <div className="quiz-final-content">

          <div>

            <span className="quiz-section-kicker">
              FINAL CONFIGURATION
            </span>

            <h2>
              Your quiz is almost ready.
            </h2>

            <p>
              Review your selections and generate your personalized AI quiz.
            </p>

          </div>


          <div className="quiz-final-summary">

            <div className="quiz-summary-item">

              <span>
                TOPIC
              </span>

              <strong>
                {selectedTopicData?.name ||
                  customTopic ||
                  "Not selected"}
              </strong>

            </div>


            <div className="quiz-summary-item">

              <span>
                DIFFICULTY
              </span>

              <strong>
                {difficulty}
              </strong>

            </div>


            <div className="quiz-summary-item">

              <span>
                QUESTIONS
              </span>

              <strong>
                {questionCount}
              </strong>

            </div>

          </div>

        </div>


        <div className="quiz-final-action">

          <div className="quiz-ready-message">

            <span className="quiz-ready-dot" />

            <span>
              {selectedTopic
                ? "Ready to test your knowledge?"
                : "Select a topic to continue"}
            </span>

          </div>


          <button
            type="button"
            onClick={onStartQuiz}
            disabled={!selectedTopic || loading}
            className={`quiz-generate-button ${
              !selectedTopic || loading
                ? "is-disabled"
                : ""
            }`}
          >

            {loading ? (
              <>
                <span className="quiz-spinner" />

                <span>
                  Generating Quiz...
                </span>
              </>
            ) : (
              <>
                <span>
                  Generate AI Quiz
                </span>

                <span className="generate-arrow">
                  →
                </span>
              </>
            )}

          </button>

        </div>

      </section>

      <div className="quiz-footer-note">
        Powered by Skillora AI • Personalized for your learning journey
      </div>

    </div>
  );
}

export default QuizSetup;