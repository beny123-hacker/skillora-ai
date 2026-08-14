import React from "react";

function CourseSidebar({
  course,
  selectedVideo,
  completedVideos = [],
  onSelectVideo,
  onBackToCourses,
}) {
  const videos = course?.videos || [];

  const selectedIndex = videos.findIndex(
    (video) => video.id === selectedVideo?.id
  );

  const completedCount = completedVideos.length;

  return (
    <div className="flex h-full flex-col bg-slate-950">
      {/* =====================================================
          SIDEBAR HEADER
      ===================================================== */}

      <div className="border-b border-slate-800 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
              Course
            </p>

            <h3 className="mt-1 truncate text-lg font-bold text-white">
              {course?.title || "Learning Course"}
            </h3>
          </div>

          {/* BACK TO COURSES */}

          <button
            type="button"
            onClick={onBackToCourses}
            className="shrink-0 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white"
          >
            ← Courses
          </button>
        </div>

        {/* COURSE PROGRESS */}

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Course Progress
            </span>

            <span className="font-semibold text-indigo-300">
              {videos.length > 0
                ? Math.round(
                    (completedCount / videos.length) * 100
                  )
                : 0}
              %
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{
                width: `${
                  videos.length > 0
                    ? Math.min(
                        100,
                        Math.round(
                          (completedCount / videos.length) * 100
                        )
                      )
                    : 0
                }%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {completedCount} of {videos.length} lessons completed
          </p>
        </div>
      </div>

      {/* =====================================================
          LESSON LIST
      ===================================================== */}

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-2">
          {videos.map((video, index) => {
            const isSelected =
              video.id === selectedVideo?.id;

            const isCompleted =
              completedVideos.includes(video.id);

            return (
              <button
                key={video.id || index}
                type="button"
                onClick={() => onSelectVideo(video)}
                className={`group w-full rounded-2xl border p-3 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/5"
                    : "border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800/80"
                }`}
              >
                <div className="flex gap-3">
                  {/* LESSON NUMBER */}

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                      isCompleted
                        ? "bg-green-500/15 text-green-400"
                        : isSelected
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  {/* LESSON INFO */}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`line-clamp-2 text-sm font-semibold ${
                          isSelected
                            ? "text-indigo-300"
                            : "text-slate-200"
                        }`}
                      >
                        {video.title || "YouTube Lesson"}
                      </h4>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                      <span>
                        Lesson {index + 1}
                      </span>

                      {video.duration_minutes > 0 && (
                        <>
                          <span>•</span>

                          <span>
                            {video.duration_minutes} min
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* EMPTY STATE */}

        {videos.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center">
            <div className="text-3xl">📚</div>

            <p className="mt-3 text-sm font-semibold text-white">
              No lessons available
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Search for another course to continue learning.
            </p>
          </div>
        )}
      </div>

      {/* =====================================================
          SIDEBAR FOOTER
      ===================================================== */}

      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          onClick={onBackToCourses}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white"
        >
          <span>←</span>
          <span>Back to All Courses</span>
        </button>
      </div>
    </div>
  );
}

export default CourseSidebar;