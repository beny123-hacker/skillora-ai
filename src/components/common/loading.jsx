import { useEffect, useState } from "react";
import { FaRobot } from "react-icons/fa";

const messages = [
  "Preparing your AI dashboard...",
  "Analyzing your learning progress...",
  "Generating personalized recommendations...",
  "Loading your roadmap...",
  "Almost ready...",
];

function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">

      <div className="text-center">

        {/* Animated Circle */}

        <div className="relative mx-auto w-28 h-28">

          <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-spin border-t-transparent"></div>

          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">

            <FaRobot className="text-white text-4xl animate-pulse" />

          </div>

        </div>

        {/* Title */}

        <h2 className="mt-10 text-4xl font-bold text-white">

          Skillora AI

        </h2>

        {/* Loading Text */}

        <p className="mt-4 text-indigo-300 text-lg transition-all duration-500">

          {messages[messageIndex]}

        </p>

        {/* Dots */}

        <div className="flex justify-center gap-3 mt-8">

          <span className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce"></span>

          <span
            className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="w-3 h-3 rounded-full bg-pink-500 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>

        </div>

      </div>

    </div>
  );
}

export default Loading;