import React from "react";
import {
  FaBrain,
  FaLightbulb,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AIRecommendation({ recommendation = null }) {
  const hasRecommendation = Boolean(recommendation);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8 lg:p-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div className="flex gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
            <FaBrain className="text-2xl text-cyan-400" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              AI Learning Assistant
            </p>

            {hasRecommendation ? (
              <>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {recommendation.title}
                </h2>

                <p className="mt-2 max-w-2xl text-slate-400">
                  {recommendation.description}
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Your AI recommendations are waiting
                </h2>

                <p className="mt-2 max-w-2xl text-slate-400">
                  Start learning to give Skillora AI enough learning
                  activity to personalize your recommendations.
                </p>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        {hasRecommendation ? (
          <Link
            to="/learn"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Start Learning

            <FaArrowRight />
          </Link>
        ) : (
          <Link
            to="/learn"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-white"
          >
            Explore Courses

            <FaArrowRight />
          </Link>
        )}
      </div>

      {/* EMPTY STATE */}
      {!hasRecommendation && (
        <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">
          <div className="flex items-start gap-4">
            <FaLightbulb className="mt-1 shrink-0 text-xl text-yellow-400" />

            <div>
              <p className="font-semibold text-white">
                How recommendations work
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Your recommendations will become more personalized as
                you complete courses, watch lessons and build your
                learning history.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AIRecommendation;