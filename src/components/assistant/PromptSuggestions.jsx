import React from "react";

const suggestions = [
  {
    icon: "◎",
    title: "Learn a concept",
    description:
      "Break down a difficult topic into simple ideas.",
    prompt:
      "Explain a difficult topic to me in simple words with an easy example.",
    accent: "blue",
  },
  {
    icon: "</>",
    title: "Coding mentor",
    description:
      "Understand code, debug problems, and improve logic.",
    prompt:
      "Help me understand and solve a programming problem step by step.",
    accent: "purple",
  },
  {
    icon: "↗",
    title: "Career direction",
    description:
      "Build a practical roadmap for your career goals.",
    prompt:
      "Suggest a career roadmap based on my skills and interests.",
    accent: "cyan",
  },
  {
    icon: "✎",
    title: "Study smarter",
    description:
      "Create concise notes and revision material.",
    prompt:
      "Create short and easy-to-understand study notes for me.",
    accent: "emerald",
  },
];

function PromptSuggestions({ onSelectPrompt }) {
  return (
    <div className="premium-empty-state">
      <div className="premium-empty-hero">
        <div className="premium-empty-orbit">
          <div className="premium-empty-orbit-ring" />
          <div className="premium-empty-icon">
            ✦
          </div>
        </div>

        <div className="premium-empty-label">
          AI COACH
        </div>

        <h3>
          What would you like
          <span> to learn today?</span>
        </h3>

        <p>
          Ask a question, explore a concept, solve a problem,
          or let your AI Coach guide your next learning step.
        </p>
      </div>

      <div className="premium-suggestion-grid">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            type="button"
            onClick={() =>
              onSelectPrompt(suggestion.prompt)
            }
            className={`premium-suggestion-card accent-${suggestion.accent}`}
          >
            <div className="premium-suggestion-top">
              <div className="premium-suggestion-icon">
                {suggestion.icon}
              </div>

              <span className="premium-suggestion-arrow">
                ↗
              </span>
            </div>

            <div className="premium-suggestion-content">
              <h4>
                {suggestion.title}
              </h4>

              <p>
                {suggestion.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PromptSuggestions;