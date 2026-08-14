import {
  FaQuoteLeft,
  FaBullseye,
  FaArrowRight,
  FaBrain,
} from "react-icons/fa";

const QuoteCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#4F46E5] via-[#6D28D9] to-[#312E81] p-8 shadow-2xl">

      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />

      <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative">

        <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-2 backdrop-blur">

          <FaBrain className="text-cyan-300" />

          <span className="text-sm font-semibold text-white">
            AI Daily Inspiration
          </span>

        </div>

        <FaQuoteLeft className="mt-8 text-5xl text-white/20" />

        <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-white">

          Success is the sum of small efforts,
          repeated day after day.

        </h2>

        <p className="mt-6 text-lg text-indigo-100">

          — Robert Collier

        </p>

      </div>

    </div>
  );
};

/* ================================================= */

export const TodaysFocusCard = () => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121829] p-8 shadow-xl">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl text-white shadow-lg">

          <FaBullseye />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-white">

            Today's Focus

          </h3>

          <p className="text-slate-400">

            AI Recommended Task

          </p>

        </div>

      </div>

      <div className="mt-8 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-5">

        <p className="text-slate-300 leading-7">

          Complete one roadmap topic, revise your notes,
          and solve today's quiz to improve your learning
          consistency.

        </p>

      </div>

      <button
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-gradient-to-r
          from-indigo-500
          to-purple-600
          py-4
          font-semibold
          text-white
          transition
          duration-300
          hover:scale-[1.02]
        "
      >

        Start Learning

        <FaArrowRight />

      </button>

    </div>
  );
};

export default QuoteCard;