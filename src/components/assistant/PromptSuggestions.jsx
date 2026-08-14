import React from "react";

const suggestions = [
  {
    icon: "📚",
    text: "Explain a topic",
    prompt: "Explain a difficult topic to me in simple words.",
  },
  {
    icon: "💻",
    text: "Help with coding",
    prompt: "Help me understand and solve a programming problem.",
  },
  {
    icon: "🎯",
    text: "Career guidance",
    prompt: "Suggest a career roadmap based on my skills and interests.",
  },
  {
    icon: "📝",
    text: "Create study notes",
    prompt: "Create short and easy-to-understand study notes for me.",
  },
];

function PromptSuggestions({ onSelectPrompt }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">

      <div className="mb-4 text-center">
        <h3 className="text-sm font-semibold text-slate-300">
          How can I help you today? 🤖
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Choose a suggestion or type your own question below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.text}
            type="button"
            onClick={() => onSelectPrompt(suggestion.prompt)}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-slate-800"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg transition group-hover:scale-110">
              {suggestion.icon}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-200">
                {suggestion.text}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Click to get started
              </p>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}

export default PromptSuggestions;