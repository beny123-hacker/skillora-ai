import React, { useEffect, useMemo } from "react";
import {
  FaYoutube,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";

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

  useEffect(() => {
    if (!video) {
      return;
    }

    window.scrollTo({
      top: window.scrollY,
      behavior: "instant",
    });
  }, [video?.id]);

  // =========================================================
  // NO VIDEO SELECTED
  // =========================================================

  if (!video) {
    return (
      <div className="youtube-player-empty">
        <div className="youtube-player-empty-icon">
          <FaGraduationCap />
        </div>

        <h3>Select a lesson</h3>

        <p>
          Choose a lesson from the course panel to start learning.
        </p>
      </div>
    );
  }

  return (
    <div className="youtube-player">
      {/* =====================================================
          VIDEO PLAYER
      ===================================================== */}

      <div className="youtube-video-shell">
        <div className="youtube-video-topbar">
          <div className="youtube-live-indicator">
            <span className="youtube-live-dot" />
            VIDEO LESSON
          </div>

          {video.duration_minutes > 0 && (
            <div className="youtube-video-duration">
              <FaClock />
              {video.duration_minutes} min
            </div>
          )}
        </div>

        <div className="youtube-video-frame">
          {youtubeId ? (
            <iframe
              key={youtubeId}
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
              title={video.title || "YouTube Lesson"}
              className="youtube-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="youtube-video-unavailable">
              <div>
                <FaYoutube />

                <h3>Video unavailable</h3>

                <p>
                  This lesson does not contain a valid YouTube video ID.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          LESSON INFORMATION
      ===================================================== */}

      <div className="youtube-player-content">
        <div className="youtube-player-meta">
          <div className="youtube-player-source">
            <FaYoutube />
            YouTube Lesson
          </div>

          {video.channel && (
            <span className="youtube-channel-name">
              {video.channel}
            </span>
          )}

          {completed && (
            <span className="youtube-completed-badge">
              <FaCheck />
              Completed
            </span>
          )}
        </div>

        <h1 className="youtube-player-title">
          {video.title || "YouTube Lesson"}
        </h1>

        {video.description && (
          <p className="youtube-player-description">
            {video.description}
          </p>
        )}
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="youtube-player-actions">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`youtube-nav-button ${
            !hasPrevious ? "is-disabled" : ""
          }`}
        >
          <FaArrowLeft />
          <span>Previous Lesson</span>
        </button>

        <button
          type="button"
          onClick={onComplete}
          disabled={completed}
          className={`youtube-complete-button ${
            completed ? "is-completed" : ""
          }`}
        >
          <span className="youtube-complete-icon">
            <FaCheck />
          </span>

          <span>
            {completed
              ? "Lesson Completed"
              : "Mark as Complete"}
          </span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className={`youtube-nav-button youtube-next-button ${
            !hasNext ? "is-disabled" : ""
          }`}
        >
          <span>Next Lesson</span>
          <FaArrowRight />
        </button>
      </div>

      {/* =====================================================
          COMPLETED MESSAGE
      ===================================================== */}

      {completed && (
        <div className="youtube-success-message">
          <div className="youtube-success-icon">
            <FaCheck />
          </div>

          <div>
            <h3>Lesson completed successfully</h3>

            <p>
              Your progress has been saved. You're ready for the
              next lesson.
            </p>
          </div>

          {hasNext && (
            <button
              type="button"
              onClick={onNext}
              className="youtube-success-next"
            >
              Continue
              <FaArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}


export default YoutubePlayer;