import React, { useEffect, useState } from "react";

function QuizTimer({
  duration = 600,
  onTimeUp,
  isPaused = false,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    if (isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const isWarning = timeLeft <= 60;
  const isCritical = timeLeft <= 30;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 transition ${
        isCritical
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : isWarning
          ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
          : "border-white/10 bg-white/5 text-slate-300"
      }`}
    >
      {/* Clock Icon */}

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
          isCritical
            ? "bg-red-500/10"
            : isWarning
            ? "bg-yellow-500/10"
            : "bg-white/5"
        }`}
      >
        ⏱️
      </div>

      {/* Timer */}

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Time Left
        </p>

        <p
          className={`font-mono text-sm font-bold ${
            isCritical
              ? "animate-pulse text-red-400"
              : isWarning
              ? "text-yellow-400"
              : "text-slate-200"
          }`}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
}

export default QuizTimer;