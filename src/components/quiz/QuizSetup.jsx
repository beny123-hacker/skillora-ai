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

  // =========================================================
  // CUSTOM TOPIC
  // =========================================================

  const handleCustomTopicChange = (event) => {
    const value = event.target.value;

    setCustomTopic(value);

    if (value.trim()) {
      setSelectedTopic(value.trim());
    } else {
      setSelectedTopic("");
    }
  };

  // =========================================================
  // PRESET TOPIC
  // =========================================================

  const handleTopicSelect = (topicId) => {
    setCustomTopic("");
    setSelectedTopic(topicId);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="flex min-h-[calc(100vh-220px)] w-full flex-col justify-center">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-10 text-center">

        <span className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-indigo-300">
          ✨ AI POWERED QUIZ
        </span>

        <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Create Your Quiz 🧠
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg">
          Choose a topic, customize your difficulty and question count,
          and let Skillora AI generate a personalized quiz for you.
        </p>

      </div>

      {/* =====================================================
          TOPIC SECTION
      ====================================================== */}

      <section>

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-lg font-bold text-indigo-400">
              1
            </div>

            <div>

              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Choose a topic
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Select one of the available topics or enter your own.
              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            PRESET TOPICS
        ==================================================== */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {topics.map((topic) => {

            const selected =
              selectedTopic === topic.id && !customTopic;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => handleTopicSelect(topic.id)}
                className={`group flex min-h-[190px] flex-col rounded-3xl border p-7 text-left transition-all duration-300 ${
                  selected
                    ? "border-indigo-500 bg-indigo-500/10 shadow-xl shadow-indigo-500/10"
                    : "border-white/10 bg-slate-900/80 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-slate-900"
                }`}
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl transition ${
                      selected
                        ? "bg-indigo-500/20"
                        : "bg-white/5 group-hover:bg-indigo-500/10"
                    }`}
                  >
                    {topic.icon}
                  </div>

                  {selected && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                      ✓
                    </div>
                  )}

                </div>

                <h4 className="mt-6 text-lg font-bold text-white">
                  {topic.name}
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {topic.description}
                </p>

              </button>
            );
          })}

        </div>

        {/* ===================================================
            CUSTOM TOPIC
        ==================================================== */}

        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-lg">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
              ✨
            </div>

            <div className="flex-1">

              <label
                htmlFor="custom-topic"
                className="text-base font-bold text-white"
              >
                Or enter your own topic
              </label>

              <p className="mt-1 text-sm text-slate-500">
                Enter any subject, technology, or concept you want
                to practice.
              </p>

              <input
                id="custom-topic"
                type="text"
                value={customTopic}
                onChange={handleCustomTopicChange}
                placeholder="Example: Operating Systems, DBMS, Machine Learning..."
                className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SETTINGS SECTION
      ====================================================== */}

      <section className="mt-12">

        <div className="mb-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-lg font-bold text-purple-400">
              2
            </div>

            <div>

              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Customize your quiz
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Choose the difficulty and number of questions.
              </p>

            </div>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* =================================================
              DIFFICULTY
          ================================================== */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-base font-bold text-white">
                  Difficulty
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  How challenging should the questions be?
                </p>

              </div>

              <span className="text-2xl">🎯</span>

            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">

              {["Easy", "Medium", "Hard"].map((level) => {

                const selected = difficulty === level;

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`rounded-2xl border px-3 py-4 text-sm font-bold transition-all ${
                      selected
                        ? "border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-lg shadow-indigo-500/10"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-indigo-500/30 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}

            </div>

          </div>

          {/* =================================================
              QUESTION COUNT
          ================================================== */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-base font-bold text-white">
                  Number of Questions
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  How many questions do you want?
                </p>

              </div>

              <span className="text-2xl">📝</span>

            </div>

            <div className="mt-6 grid grid-cols-4 gap-3">

              {[5, 10, 15, 20].map((count) => {

                const selected = questionCount === count;

                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`rounded-2xl border px-2 py-4 text-sm font-bold transition-all ${
                      selected
                        ? "border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-lg shadow-indigo-500/10"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-indigo-500/30 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {count}
                  </button>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SUMMARY
      ====================================================== */}

      <div className="mt-10 rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-indigo-300">
              Quiz Configuration
            </p>

            <p className="mt-1 text-sm text-slate-400">

              {selectedTopic
                ? `Ready to generate a ${difficulty.toLowerCase()} quiz`
                : "Select a topic to continue"}

            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            <span className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              {difficulty}
            </span>

            <span className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300">
              {questionCount} Questions
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          GENERATE BUTTON
      ====================================================== */}

      <div className="flex justify-center pb-8 pt-10">

        <button
          type="button"
          onClick={onStartQuiz}
          disabled={!selectedTopic || loading}
          className={`group flex min-w-[280px] items-center justify-center gap-3 rounded-2xl px-8 py-5 text-base font-bold transition-all duration-300 ${
            !selectedTopic || loading
              ? "cursor-not-allowed bg-indigo-500/20 text-indigo-300/50"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20 hover:-translate-y-1 hover:from-indigo-400 hover:to-purple-500"
          }`}
        >

          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

              <span>
                Generating Quiz...
              </span>
            </>
          ) : (
            <>
              <span>
                Generate AI Quiz
              </span>

              <span className="text-xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </>
          )}

        </button>

      </div>

    </div>
  );
}

export default QuizSetup;