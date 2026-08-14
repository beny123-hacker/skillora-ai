import React from "react";
import {
  FaQuestionCircle,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function UpcomingQuiz({ quiz = null }) {
  const hasQuiz = Boolean(quiz);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
          <FaQuestionCircle className="text-xl text-purple-400" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
            Assessment
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            Upcoming Quiz
          </h2>
        </div>
      </div>

      {hasQuiz ? (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-xl font-bold text-white">
            {quiz.title}
          </h3>

          {quiz.description && (
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {quiz.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {quiz.questions && (
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {quiz.questions} questions
              </span>
            )}

            {quiz.duration && (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                <FaClock />

                {quiz.duration}
              </span>
            )}
          </div>

          <Link
            to="/quiz"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-3 font-semibold text-white transition hover:scale-105"
          >
            Start Quiz

            <FaArrowRight />
          </Link>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
            <FaQuestionCircle className="text-xl text-slate-500" />
          </div>

          <h3 className="mt-5 font-semibold text-white">
            No upcoming quizzes
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Quizzes will appear here when they become available for
            your learning journey.
          </p>

          <Link
            to="/quiz"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-purple-500 hover:text-white"
          >
            Open Quiz

            <FaArrowRight />
          </Link>
        </div>
      )}
    </section>
  );
}

export default UpcomingQuiz;