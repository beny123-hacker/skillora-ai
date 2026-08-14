import React, { useEffect, useMemo } from "react";

function YoutubePlayer({
  video,
  completed = false,
  onComplete,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) {
  const youtubeId = useMemo(() => {
    if (!video) {
      return "";
    }

    if (video.youtubeId) {
      return video.youtubeId;
    }

    if (video.youtube_id) {
      return video.youtube_id;
    }

    if (video.youtubeUrl) {
      try {
        const url = new URL(video.youtubeUrl);

        if (url.hostname.includes("youtu.be")) {
          return url.pathname.replace("/", "");
        }

        if (url.searchParams.get("v")) {
          return url.searchParams.get("v");
        }
      } catch (error) {
        console.error(
          "Unable to extract YouTube ID:",
          error
        );
      }
    }

    if (video.youtube_url) {
      try {
        const url = new URL(video.youtube_url);

        if (url.hostname.includes("youtu.be")) {
          return url.pathname.replace("/", "");
        }

        if (url.searchParams.get("v")) {
          return url.searchParams.get("v");
        }
      } catch (error) {
        console.error(
          "Unable to extract YouTube ID:",
          error
        );
      }
    }

    return "";
  }, [video]);

  /* =========================================================
     RESET PLAYER SCROLL WHEN LESSON CHANGES
  ========================================================= */

  useEffect(() => {
    if (!video) {
      return;
    }

    window.scrollTo({
      top: window.scrollY,
      behavior: "instant",
    });
  }, [video?.id]);

  if (!video) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-950">
        <div className="text-center">
          <div className="text-5xl">🎥</div>

          <h3 className="mt-4 text-xl font-bold text-white">
            Select a lesson
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Choose a lesson from the course sidebar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* =====================================================
          VIDEO
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
        {youtubeId ? (
          <div className="relative aspect-video w-full">
            <iframe
              key={youtubeId}
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
              title={video.title || "YouTube Lesson"}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-slate-950">
            <div className="px-6 text-center">
              <div className="text-5xl">⚠️</div>

              <h3 className="mt-4 text-lg font-bold text-white">
                Video unavailable
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                This lesson does not contain a valid YouTube video ID.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          LESSON INFORMATION
      ===================================================== */}

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
            YouTube Lesson
          </span>

          {video.channel && (
            <span className="text-xs text-slate-500">
              {video.channel}
            </span>
          )}

          {video.duration_minutes > 0 && (
            <span className="text-xs text-slate-500">
              • {video.duration_minutes} min
            </span>
          )}

          {completed && (
            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
              ✓ Completed
            </span>
          )}
        </div>

        <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
          {video.title || "YouTube Lesson"}
        </h2>

        {video.description && (
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
            {video.description}
          </p>
        )}
      </div>

      {/* =====================================================
          LESSON ACTIONS
      ===================================================== */}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* PREVIOUS */}

        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
            hasPrevious
              ? "border-slate-700 bg-slate-900 text-slate-200 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white"
              : "cursor-not-allowed border-slate-800 bg-slate-950 text-slate-700"
          }`}
        >
          <span>←</span>
          <span>Previous Lesson</span>
        </button>

        {/* COMPLETE */}

        <button
          type="button"
          onClick={onComplete}
          disabled={completed}
          className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition ${
            completed
              ? "cursor-not-allowed bg-green-500/10 text-green-400"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 hover:shadow-indigo-500/30"
          }`}
        >
          <span>{completed ? "✓" : "✓"}</span>

          <span>
            {completed
              ? "Lesson Completed"
              : "Mark as Complete"}
          </span>
        </button>

        {/* NEXT */}

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
            hasNext
              ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:text-white"
              : "cursor-not-allowed border-slate-800 bg-slate-950 text-slate-700"
          }`}
        >
          <span>Next Lesson</span>
          <span>→</span>
        </button>
      </div>

      {/* =====================================================
          COMPLETION MESSAGE
      ===================================================== */}

      {completed && (
        <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
          <div className="flex items-start gap-3">
            <div className="text-xl">🎉</div>

            <div>
              <p className="font-semibold text-green-300">
                Lesson completed!
              </p>

              <p className="mt-1 text-sm text-green-400/70">
                Your progress has been saved. Continue to the next
                lesson when you're ready.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default YoutubePlayer;