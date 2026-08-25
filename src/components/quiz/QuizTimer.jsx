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

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  const isWarning = timeLeft <= 60;
  const isCritical = timeLeft <= 30;

  return (
    <div
      className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-300 ${
        isCritical
          ? "border-red-400/35 bg-red-500/[0.09] shadow-red-950/20"
          : isWarning
          ? "border-amber-400/30 bg-amber-500/[0.08] shadow-amber-950/20"
          : "border-white/[0.08] bg-white/[0.035] shadow-black/20"
      }`}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          isCritical
            ? "bg-red-500"
            : isWarning
            ? "bg-amber-400"
            : "bg-indigo-500"
        }`}
      />

      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border text-lg ${
          isCritical
            ? "border-red-400/20 bg-red-500/10"
            : isWarning
            ? "border-amber-400/20 bg-amber-500/10"
            : "border-indigo-400/15 bg-indigo-500/10"
        }`}
      >
        ⏱
      </div>

      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Time Remaining
        </p>

        <p
          className={`mt-0.5 font-mono text-lg font-bold tracking-wider ${
            isCritical
              ? "animate-pulse text-red-400"
              : isWarning
              ? "text-amber-300"
              : "text-white"
          }`}
        >
          {formattedTime}
        </p>
      </div>

      {isCritical && (
        <div className="ml-2 h-2 w-2 animate-ping rounded-full bg-red-400" />
      )}
    </div>
  );
}

export default QuizTimer;