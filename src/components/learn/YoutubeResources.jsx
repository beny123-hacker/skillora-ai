import React from "react";
import { FaYoutube, FaPlay, FaCheckCircle } from "react-icons/fa";

function YoutubeResources({
  selectedCourse,
  onSelectCourse,
  courses = [],
}) {
  // If no course is selected, show available courses
  if (!selectedCourse) {
    return (
      <section className="w-full">

        <div className="mb-6">
          <span className="text-xs font-semibold tracking-widest text-red-400">
            VIDEO LEARNING
          </span>

          <h2 className="mt-2 text-2xl font-bold text-white">
            YouTube Courses ▶️
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Select a course to start learning through structured YouTube
            lessons.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {courses.map((course) => (
            <div
              key={course.id}
              className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/5"
            >

              {/* Course Icon */}

              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-2xl text-red-400">
                  <FaYoutube />
                </div>

                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                  YouTube
                </span>

              </div>

              {/* Course Title */}

              <h3 className="mt-5 text-xl font-bold text-white group-hover:text-red-300">
                {course.title}
              </h3>

              {/* Description */}

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {course.description}
              </p>

              {/* Course Details */}

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-400">
                  {course.level}
                </span>

                <span className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-400">
                  {course.duration}
                </span>

                <span className="rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-400">
                  {course.videos?.length || 0} Videos
                </span>

              </div>

              {/* Start Course */}

              <button
                type="button"
                onClick={() => onSelectCourse?.(course)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                <FaPlay />

                Start Course

              </button>

            </div>
          ))}

        </div>

      </section>
    );
  }

  // =========================================================
  // SELECTED COURSE
  // =========================================================

  return (
    <section className="w-full">

      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <span className="text-xs font-semibold tracking-widest text-red-400">
            CURRENT COURSE
          </span>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {selectedCourse.title} ▶️
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Follow the lessons below to complete your course.
          </p>

        </div>

        <button
          type="button"
          onClick={() => onSelectCourse?.(null)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-red-500/40 hover:text-white"
        >
          ← Back to Courses
        </button>

      </div>

      {/* Course Videos */}

      <div className="grid gap-4">

        {selectedCourse.videos?.map((video, index) => (

          <div
            key={video.id}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-red-500/30 sm:flex-row sm:items-center"
          >

            {/* Number */}

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-lg font-bold text-red-400">
              {index + 1}
            </div>

            {/* Video Information */}

            <div className="min-w-0 flex-1">

              <h3 className="font-semibold text-white">
                {video.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                YouTube Lesson {index + 1}
              </p>

            </div>

            {/* Watch */}

            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              <FaYoutube />

              Watch

            </a>

          </div>

        ))}

      </div>

      {/* Empty Videos */}

      {(!selectedCourse.videos ||
        selectedCourse.videos.length === 0) && (

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">

          <FaYoutube className="mx-auto text-4xl text-red-500" />

          <h3 className="mt-4 text-lg font-semibold text-white">
            No YouTube lessons available
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            YouTube resources will be added for this course soon.
          </p>

        </div>

      )}

    </section>
  );
}

export default YoutubeResources;