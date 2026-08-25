import {
  FaQuoteLeft,
  FaBullseye,
  FaArrowRight,
  FaBrain,
} from "react-icons/fa";

const QuoteCard = () => {
  return (
    <section className="relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#17143b] via-[#17122f] to-[#0b1020] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-8">

      <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="pointer-events-none absolute bottom-[-100px] left-[25%] h-56 w-56 rounded-full bg-cyan-400/5 blur-[100px]" />

      <div className="relative">

        <div className="flex items-center justify-between gap-4">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.05] px-4 py-2">

            <FaBrain className="text-cyan-400" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
              Daily Inspiration
            </span>

          </div>

          <span className="hidden text-xs text-slate-600 sm:block">
            Powered by Skillora AI
          </span>

        </div>

        <FaQuoteLeft className="mt-8 text-4xl text-indigo-400/20" />

        <blockquote className="mt-4 max-w-4xl text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
          Success is the sum of small efforts, repeated day after day.
        </blockquote>

        <p className="mt-5 text-sm font-medium text-indigo-300">
          — Robert Collier
        </p>

      </div>

    </section>
  );
};

export const TodaysFocusCard = () => {
  return (
    <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#090d1a] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">

          <FaBullseye className="text-xl text-amber-400" />

        </div>

        <div className="min-w-0">

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            AI Recommendation
          </p>

          <h3 className="mt-1 text-xl font-black text-white">
            Today's Focus
          </h3>

        </div>

      </div>

      <div className="mt-6 rounded-xl border border-indigo-400/10 bg-indigo-500/[0.05] p-4">

        <p className="text-sm leading-6 text-slate-400">
          Complete one roadmap topic, revise your notes, and solve
          today's quiz to improve your learning consistency.
        </p>

      </div>

      <button
        type="button"
        className="group mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5"
      >

        Start Learning

        <FaArrowRight className="transition-transform group-hover:translate-x-1" />

      </button>

    </section>
  );
};

export default QuoteCard;