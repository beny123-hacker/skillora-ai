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
    <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-gradient-to-br from-[#151d31] via-[#101729] to-[#0c1222] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-600/[0.08] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-600/[0.05] blur-[100px]" />

      <div className="relative">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 text-sm font-bold text-indigo-200 shadow-lg shadow-indigo-950/30">
              {String(questionNumber).padStart(2, "0")}
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-indigo-300">
                Question {questionNumber}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Select the most accurate answer
              </p>
            </div>
          </div>

          <div className="rounded-full border border-white/[0.07] bg-white/[0.035] px-4 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Single Choice
            </span>
          </div>
        </div>

        <div className="border-l-2 border-indigo-500/60 pl-5 sm:pl-6">
          <h2 className="max-w-5xl text-2xl font-bold leading-[1.35] tracking-tight text-white sm:text-3xl lg:text-[2rem]">
            {question}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index);
            const isSelected = selectedAnswer === option;

            return (
              <button
                key={`${option}-${index}`}
                type="button"
                disabled={disabled}
                onClick={() => onSelectAnswer?.(option)}
                className={`group relative min-h-[120px] overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                  isSelected
                    ? "border-indigo-400/60 bg-gradient-to-br from-indigo-500/[0.18] to-violet-500/[0.08] shadow-[0_15px_45px_rgba(79,70,229,0.2)]"
                    : "border-white/[0.08] bg-white/[0.025] hover:-translate-y-1 hover:border-indigo-400/35 hover:bg-indigo-500/[0.055] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]"
                } ${
                  disabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 ${
                    isSelected ? "opacity-100" : "group-hover:opacity-100"
                  }`}
                />

                <div className="relative flex h-full items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-base font-bold transition-all duration-300 ${
                      isSelected
                        ? "border-indigo-300/40 bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
                        : "border-white/[0.08] bg-[#1b2538] text-slate-400 group-hover:border-indigo-400/25 group-hover:bg-indigo-500/10 group-hover:text-indigo-200"
                    }`}
                  >
                    {optionLetter}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <span
                      className={`pr-5 text-[15px] font-medium leading-7 transition-colors sm:text-base ${
                        isSelected
                          ? "text-white"
                          : "text-slate-300 group-hover:text-slate-100"
                      }`}
                    >
                      {option}
                    </span>

                    {isSelected && (
                      <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">
                        Selected Answer
                      </span>
                    )}
                  </div>

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isSelected
                        ? "border-indigo-300 bg-indigo-500 text-sm text-white shadow-[0_0_16px_rgba(99,102,241,0.8)]"
                        : "border-white/15 bg-white/[0.02] text-transparent group-hover:border-indigo-400/40"
                    }`}
                  >
                    ✓
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {options.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-white/10 bg-white/[0.025] px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
              🤔
            </div>

            <p className="mt-5 text-base font-semibold text-white">
              No answer options available
            </p>

            <p className="mt-2 text-sm text-slate-500">
              The quiz question does not currently contain answer options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizQuestion;