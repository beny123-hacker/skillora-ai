import React from "react";
import {
  FaArrowRight,
  FaPlayCircle,
  FaYoutube,
} from "react-icons/fa";

function TrendingCourses({
  onStartCourse,
  courses = [],
}) {
  const trendingCourses = courses.slice(0, 6);

  return (
    <section className="w-full">

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex items-end justify-between">

        <div>

          <span className="text-xs font-semibold tracking-widest text-indigo-400">
            TRENDING NOW
          </span>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Trending Courses 🔥
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Choose a course and learn through structured YouTube lessons.
          </p>

        </div>

      </div>

      {/* =========================
          COURSE GRID
      ========================= */}

      {trendingCourses.length > 0 ? (

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {trendingCourses.map((course) => (

            <div
              key={course.id}
              className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5"
            >

              {/* Top */}

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl text-indigo-400">
                  🎓
                </div>

                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                  Trending
                </span>

              </div>

              {/* Course Info */}

              <h3 className="mt-5 text-lg font-bold text-white transition group-hover:text-indigo-300">
                {course.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {course.description}
              </p>

              {/* Course Details */}

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-400">
                  {course.level}
                </span>

                <span className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-400">
                  {course.duration || "Self-paced"}
                </span>

                <span className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
                  <FaYoutube />
                  {course.videos?.length || 0} Videos
                </span>

              </div>

              {/* Start Button */}

              <button
                type="button"
                onClick={() => onStartCourse?.(course)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >

                <FaPlayCircle />

                Start Learning

                <FaArrowRight className="transition-transform group-hover:translate-x-1" />

              </button>

            </div>

          ))}

        </div>

      ) : (

        /* =========================
           EMPTY STATE
        ========================= */

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

          <div className="text-4xl">
            🎓
          </div>

          <h3 className="mt-4 text-xl font-bold text-white">
            No courses available
          </h3>

          <p className="mt-2 text-slate-400">
            Search for a course to start learning.
          </p>

        </div>

      )}

    </section>
  );
}

export default TrendingCourses;