import React from "react";

function QuizQuestion({
  questionNumber = 1,
  question = "What is the correct answer?",
  options = [],
  selectedAnswer = null,
  onSelectAnswer,
  disabled = false,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl sm:p-8">

      {/* Question Number */}

      <div className="mb-6 flex items-center justify-between">

        <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-400">
          Question {questionNumber}
        </span>

        <span className="text-xs text-slate-500">
          Select one answer
        </span>

      </div>

      {/* Question */}

      <h2 className="text-xl font-bold leading-8 text-white sm:text-2xl">
        {question}
      </h2>

      {/* Options */}

      <div className="mt-8 space-y-3">

        {options.map((option, index) => {

          const optionLetter = String.fromCharCode(65 + index);

          const isSelected = selectedAnswer === option;

          return (
            <button
              key={`${option}-${index}`}
              type="button"
              disabled={disabled}
              onClick={() => onSelectAnswer?.(option)}
              className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                  : "border-white/10 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-indigo-500/5"
              } ${
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer"
              }`}
            >

              {/* Option Letter */}

              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                  isSelected
                    ? "bg-indigo-500 text-white"
                    : "bg-white/5 text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-300"
                }`}
              >
                {optionLetter}
              </div>

              {/* Option Text */}

              <span
                className={`flex-1 text-sm leading-6 sm:text-base ${
                  isSelected
                    ? "font-semibold text-white"
                    : "text-slate-300"
                }`}
              >
                {option}
              </span>

              {/* Selected Indicator */}

              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-white/20 text-transparent"
                }`}
              >
                ✓
              </div>

            </button>
          );
        })}

      </div>

      {/* No options message */}

      {options.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
          <div className="text-3xl">
            🤔
          </div>

          <p className="mt-3 text-sm text-slate-400">
            No answer options are available yet.
          </p>
        </div>
      )}

    </div>
  );
}

export default QuizQuestion;