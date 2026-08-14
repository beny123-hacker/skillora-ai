import React from "react";
import {
  FaCheckCircle,
  FaPlayCircle,
  FaTrophy,
} from "react-icons/fa";

function CourseProgress({
  totalVideos = 0,
  completedVideos = 0,
}) {
  const progress =
    totalVideos > 0
      ? Math.round((completedVideos / totalVideos) * 100)
      : 0;

  const courseCompleted =
    totalVideos > 0 &&
    completedVideos >= totalVideos;

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950 p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
            {courseCompleted ? (
              <FaTrophy />
            ) : (
              <FaPlayCircle />
            )}
          </div>

          <div>

            <h3 className="font-bold text-white">
              Course Progress
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {completedVideos} of {totalVideos} lessons completed
            </p>

          </div>

        </div>

        <span
          className={`text-2xl font-bold ${
            courseCompleted
              ? "text-green-400"
              : "text-indigo-400"
          }`}
        >
          {progress}%
        </span>

      </div>

      {/* =====================================================
          PROGRESS BAR
      ===================================================== */}

      <div className="mt-6">

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className={`h-full rounded-full transition-all duration-700 ${
              courseCompleted
                ? "bg-green-500"
                : "bg-gradient-to-r from-indigo-500 to-purple-500"
            }`}
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <div className="mt-5">

        {courseCompleted ? (

          <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

            <FaCheckCircle className="shrink-0 text-xl text-green-400" />

            <div>

              <p className="font-semibold text-green-300">
                Course Completed! 🎉
              </p>

              <p className="mt-1 text-sm text-green-400/70">
                Excellent work! You have completed all the YouTube
                lessons in this course.
              </p>

            </div>

          </div>

        ) : (

          <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-4">

            <div className="flex items-center gap-3">

              <FaPlayCircle className="text-indigo-400" />

              <span className="text-sm text-slate-400">
                Keep learning and complete the next lesson.
              </span>

            </div>

            <span className="hidden text-sm font-semibold text-slate-300 sm:block">
              {totalVideos - completedVideos} remaining
            </span>

          </div>

        )}

      </div>

    </div>
  );
}

export default CourseProgress;