import { useState } from "react";

import {
  FaRobot,
  FaMagic,
  FaBookOpen,
  FaGlobe,
  FaLayerGroup,
  FaCopy,
  FaFileWord,
  FaCheck,
} from "react-icons/fa";

function AINotesGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [language, setLanguage] = useState("English");
  const [format, setFormat] = useState("Short Notes");

  const [loading, setLoading] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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
      generatedNotes.text ||
      ""
    );
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Enter a topic to generate your notes.");
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
        "Unable to generate notes. Please make sure your n8n workflow is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyNotes = async () => {
    const notesText = getNotesText();

    if (!notesText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(notesText);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

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
              line-height: 1.7;
              white-space: pre-wrap;
            "
          >${safeNotes}</pre>
        </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", htmlContent], {
      type: "application/msword",
    });

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

  return (
    <section className="ai-notes-generator">
      <div className="ai-notes-workspace">
        <div className="ai-notes-workspace-glow glow-left" />
        <div className="ai-notes-workspace-glow glow-right" />

        {/* HEADER */}

        <div className="ai-notes-header">
          <div className="ai-notes-title-area">
            <div className="ai-notes-robot-icon">
              <FaRobot />
            </div>

            <div>
              <span className="ai-notes-label">
                <FaMagic />
                SKILLORA AI
              </span>

              <h2>
                What do you want
                <span> to learn?</span>
              </h2>

              <p>
                Enter any topic and let AI create personalized study notes for
                you.
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}

        <div className="ai-notes-form">
          {/* TOPIC */}

          <div className="ai-topic-field">
            <label htmlFor="learning-topic">
              Learning Topic
            </label>

            <input
              id="learning-topic"
              type="text"
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleGenerate();
                }
              }}
              placeholder="What would you like to learn? e.g. React Hooks"
            />
          </div>

          {/* OPTIONS */}

          <div className="ai-notes-options">
            {/* DIFFICULTY */}

            <div className="ai-select-field">
              <label htmlFor="difficulty">
                <FaLayerGroup />
                Difficulty
              </label>

              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* LANGUAGE */}

            <div className="ai-select-field">
              <label htmlFor="language">
                <FaGlobe />
                Language
              </label>

              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </div>

            {/* NOTES FORMAT */}

            <div className="ai-select-field">
              <label htmlFor="notes-format">
                <FaBookOpen />
                Notes Style
              </label>

              <select
                id="notes-format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option>Short Notes</option>
                <option>Detailed Notes</option>
                <option>Interview Notes</option>
                <option>Exam Notes</option>
              </select>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="ai-notes-error">
              {error}
            </div>
          )}

          {/* GENERATE BUTTON */}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className={`ai-generate-button ${
              loading ? "ai-generate-loading" : ""
            }`}
          >
            {loading ? (
              <>
                <span className="ai-loading-spinner" />
                Generating your notes...
              </>
            ) : (
              <>
                <FaMagic />
                Generate Notes
              </>
            )}
          </button>

          <p className="ai-generator-footer-text">
            Powered by Skillora AI • Personalized for your learning journey
          </p>
        </div>
      </div>

      {/* GENERATED NOTES */}

      {generatedNotes && (
        <div className="generated-notes-section">
          <div className="generated-notes-header">
            <div className="generated-notes-title">
              <div className="generated-notes-icon">
                <FaRobot />
              </div>

              <div>
                <span>AI GENERATED NOTES</span>

                <h2>{topic}</h2>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="generated-notes-actions">
              <button
                type="button"
                onClick={handleCopyNotes}
                className="notes-copy-button"
              >
                {copied ? (
                  <>
                    <FaCheck />
                    Copied
                  </>
                ) : (
                  <>
                    <FaCopy />
                    Copy
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadWord}
                className="notes-download-button"
              >
                <FaFileWord />
                Download
              </button>
            </div>
          </div>

          {/* META */}

          <div className="generated-notes-meta">
            <span>{difficulty}</span>
            <span>{language}</span>
            <span>{format}</span>
          </div>

          {/* CONTENT */}

          <div className="generated-notes-content">
            {getNotesText() || (
              <p>Your AI-generated notes will appear here.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default AINotesGenerator;