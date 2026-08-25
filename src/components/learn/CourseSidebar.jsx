import React from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheck,
  FaGraduationCap,
  FaPlay,
  FaLayerGroup,
  FaClock,
} from "react-icons/fa";

function CourseSidebar({
  course,
  selectedVideo,
  completedVideos = [],
  onSelectVideo,
  onBackToCourses,
}) {
  const videos = course?.videos || [];

  const completedCount =
    completedVideos.length;

  const progress =
    videos.length > 0
      ? Math.min(
          100,
          Math.round(
            (completedCount / videos.length) * 100
          )
        )
      : 0;

  return (
    <aside className="premium-course-sidebar">

      {/* Background Decoration */}
      <div className="premium-sidebar-glow" />

      {/* Header */}
      <div className="premium-sidebar-header">

        <button
          type="button"
          onClick={onBackToCourses}
          className="premium-back-button"
        >
          <FaArrowLeft />
          <span>Back to Courses</span>
        </button>

        <div className="premium-sidebar-course">

          <div className="premium-sidebar-course-icon">
            <FaGraduationCap />
          </div>

          <div>
            <span className="premium-sidebar-label">
              NOW LEARNING
            </span>

            <h3>
              {course?.title || "Learning Course"}
            </h3>
          </div>

        </div>

        {/* Progress */}
        <div className="premium-sidebar-progress-card">

          <div className="premium-sidebar-progress-top">

            <div>
              <span>
                COURSE PROGRESS
              </span>

              <strong>
                {completedCount} / {videos.length} Lessons
              </strong>
            </div>

            <div className="premium-sidebar-progress-percent">
              {progress}%
            </div>

          </div>

          <div className="premium-sidebar-progress-track">

            <div
              className="premium-sidebar-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Lessons Heading */}
      <div className="premium-lessons-heading">

        <div>
          <span>
            COURSE CONTENT
          </span>

          <h4>
            <FaLayerGroup />
            Lessons
          </h4>
        </div>

        <div className="premium-lessons-count">
          {videos.length}
        </div>

      </div>

      {/* Lesson List */}
      <div className="premium-lessons-list">

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
              className={`premium-lesson-card ${
                isSelected
                  ? "active"
                  : ""
              } ${
                isCompleted
                  ? "completed"
                  : ""
              }`}
            >

              {/* Lesson Number */}
              <div className="premium-lesson-number">

                {isCompleted ? (
                  <FaCheck />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}

              </div>

              {/* Lesson Details */}
              <div className="premium-lesson-content">

                <div className="premium-lesson-top">

                  <span>
                    LESSON {String(index + 1).padStart(2, "0")}
                  </span>

                  {isSelected && (
                    <div className="premium-playing-badge">
                      <FaPlay />
                      Playing
                    </div>
                  )}

                  {isCompleted && !isSelected && (
                    <div className="premium-done-badge">
                      <FaCheck />
                      Done
                    </div>
                  )}

                </div>

                <h5>
                  {video.title || "YouTube Lesson"}
                </h5>

                <div className="premium-lesson-meta">

                  <span className="premium-youtube-label">
                    <FaPlay />
                    YouTube Lesson
                  </span>

                  {video.duration_minutes > 0 && (
                    <span className="premium-duration">
                      <FaClock />
                      {video.duration_minutes} min
                    </span>
                  )}

                </div>

              </div>

              {/* Active Indicator */}
              {isSelected && (
                <div className="premium-active-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              )}

            </button>
          );
        })}

        {/* Empty State */}
        {videos.length === 0 && (

          <div className="premium-empty-lessons">

            <div>
              <FaBookOpen />
            </div>

            <h4>
              No lessons available
            </h4>

            <p>
              Search for another course and continue
              your learning journey.
            </p>

          </div>

        )}

      </div>

      {/* Footer */}
      <div className="premium-sidebar-footer">

        <div className="premium-sidebar-footer-info">

          <div className="premium-footer-icon">
            <FaGraduationCap />
          </div>

          <div>
            <span>
              KEEP LEARNING
            </span>

            <p>
              Every lesson brings you closer to mastery.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={onBackToCourses}
          className="premium-sidebar-footer-button"
        >
          <FaArrowLeft />
        </button>

      </div>

    </aside>
  );
}

export default CourseSidebar;