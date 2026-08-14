import { useState } from "react";

import {
  FaRobot,
  FaMagic,
  FaBookOpen,
  FaGlobe,
  FaLayerGroup,
  FaCopy,
  FaFileWord,
} from "react-icons/fa";

function AINotesGenerator() {
  // =========================
  // FORM STATE
  // =========================

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [language, setLanguage] = useState("English");
  const [format, setFormat] = useState("Short Notes");

  // =========================
  // AI STATE
  // =========================

  const [loading, setLoading] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [error, setError] = useState("");

  // =========================
  // GET NOTES TEXT
  // =========================

  const getNotesText = () => {
    if (!generatedNotes) {
      return "";
    }

    if (typeof generatedNotes === "string") {
      return generatedNotes;
    }

    return (
      generatedNotes.notes ||
      generatedNotes.content ||
      generatedNotes.output ||
      ""
    );
  };

  // =========================
  // GENERATE NOTES
  // =========================

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedNotes(null);

    try {
      const response = await fetch(
        "http://localhost:5678/webhook-test/skillora-ai",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            module: "notes",
            topic: topic.trim(),
            difficulty,
            language,
            format,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to connect to n8n.");
      }

      const data = await response.json();

      console.log("n8n response:", data);

      setGeneratedNotes(data);
    } catch (err) {
      console.error("AI Notes Error:", err);

      setError(
        "Unable to generate notes. Make sure your n8n webhook is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // COPY NOTES
  // =========================

  const handleCopyNotes = async () => {
    const notesText = getNotesText();

    if (!notesText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(notesText);

      alert("Notes copied successfully! 📋");
    } catch (error) {
      console.error("Copy failed:", error);

      alert("Unable to copy notes.");
    }
  };

  // =========================
  // DOWNLOAD WORD
  // =========================

  const handleDownloadWord = () => {
    const notesText = getNotesText();

    if (!notesText) {
      return;
    }

    const safeNotes = notesText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Skillora AI Notes</title>
        </head>

        <body>

          <h1>Skillora AI - Generated Notes</h1>

          <p>
            <strong>Topic:</strong> ${topic}
          </p>

          <p>
            <strong>Difficulty:</strong> ${difficulty}
          </p>

          <p>
            <strong>Language:</strong> ${language}
          </p>

          <p>
            <strong>Format:</strong> ${format}
          </p>

          <hr />

          <pre
            style="
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 1.6;
              white-space: pre-wrap;
            "
          >${safeNotes}</pre>

        </body>
      </html>
    `;

    const blob = new Blob(
      ["\ufeff", htmlContent],
      {
        type: "application/msword",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `Skillora-AI-${topic
      .trim()
      .replace(/[^a-z0-9]+/gi, "-")}.doc`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================
  // UI
  // =========================

  return (
    <section className="mt-14">

      <div className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900">

        {/* =========================
            HEADER
        ========================= */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl text-white">
              <FaRobot />
            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">
                AI Notes Generator
              </h2>

              <p className="mt-2 text-indigo-100">
                Generate complete study notes in seconds using Skillora AI.
              </p>

            </div>

          </div>

        </div>

        {/* =========================
            BODY
        ========================= */}

        <div className="p-8">

          {/* TOPIC */}

          <div>

            <label className="mb-3 block font-semibold text-white">
              Topic
            </label>

            <input
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setError("");
              }}
              placeholder="Example: React Hooks"
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
            />

          </div>

          {/* =========================
              OPTIONS
          ========================= */}

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {/* DIFFICULTY */}

            <div>

              <label className="mb-3 flex items-center gap-2 font-semibold text-white">

                <FaLayerGroup />

                Difficulty

              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none"
              >

                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>

              </select>

            </div>

            {/* LANGUAGE */}

            <div>

              <label className="mb-3 flex items-center gap-2 font-semibold text-white">

                <FaGlobe />

                Language

              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none"
              >

                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>

              </select>

            </div>

            {/* FORMAT */}

            <div>

              <label className="mb-3 flex items-center gap-2 font-semibold text-white">

                <FaBookOpen />

                Notes Format

              </label>

              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none"
              >

                <option>Short Notes</option>
                <option>Detailed Notes</option>
                <option>Interview Notes</option>
                <option>Exam Notes</option>

              </select>

            </div>

          </div>

          {/* =========================
              AI TIPS
          ========================= */}

          <div className="mt-8 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">

            <h3 className="font-semibold text-indigo-300">
              💡 AI Tips
            </h3>

            <ul className="mt-3 space-y-2 text-slate-300">

              <li>
                • Be specific with your topic.
              </li>

              <li>
                • Choose "Detailed Notes" for complete explanations.
              </li>

              <li>
                • Interview Notes include common interview questions.
              </li>

              <li>
                • Exam Notes focus on important concepts.
              </li>

            </ul>

          </div>

          {/* =========================
              ERROR
          ========================= */}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

          {/* =========================
              GENERATE BUTTON
          ========================= */}

          <div className="mt-10">

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-4 text-lg font-semibold text-white transition ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : "hover:scale-[1.02]"
              }`}
            >

              <FaMagic />

              {loading
                ? "Generating Notes..."
                : "Generate Notes with AI"}

            </button>

          </div>

          {/* =========================
              GENERATED NOTES
          ========================= */}

          {generatedNotes && (
            <div className="mt-10 rounded-3xl border border-slate-700 bg-slate-800 p-7">

              {/* HEADER + ACTION BUTTONS */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <FaRobot />
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    AI Generated Notes
                  </h3>

                </div>

                {/* ACTION BUTTONS */}

                <div className="flex gap-3">

                  {/* COPY */}

                  <button
                    type="button"
                    onClick={handleCopyNotes}
                    className="flex items-center gap-2 rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
                  >

                    <FaCopy />

                    Copy

                  </button>

                  {/* DOWNLOAD WORD */}

                  <button
                    type="button"
                    onClick={handleDownloadWord}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >

                    <FaFileWord />

                    Download Word

                  </button>

                </div>

              </div>

              {/* =========================
                  NOTES CONTENT
              ========================= */}

              <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-6">

                <div className="whitespace-pre-wrap leading-8 text-slate-300">

                  {getNotesText()}

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default AINotesGenerator;