import React from "react";
import {
  FaCheckCircle,
  FaPlay,
  FaTrophy,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";

function CourseProgress({
  totalVideos = 0,
  completedVideos = 0,
}) {
  const progress =
    totalVideos > 0
      ? Math.round(
          (completedVideos / totalVideos) * 100
        )
      : 0;

  const courseCompleted =
    totalVideos > 0 &&
    completedVideos >= totalVideos;

  const remaining =
    Math.max(totalVideos - completedVideos, 0);

  return (
    <section className="premium-progress-card">
      <div className="premium-progress-background" />

      <div className="premium-progress-content">

        {/* Header */}
        <div className="premium-progress-header">

          <div className="premium-progress-heading">

            <div
              className={`premium-progress-icon ${
                courseCompleted
                  ? "completed"
                  : ""
              }`}
            >
              {courseCompleted ? (
                <FaTrophy />
              ) : (
                <FaLayerGroup />
              )}
            </div>

            <div>
              <span className="premium-section-label">
                YOUR JOURNEY
              </span>

              <h3>
                Course Progress
              </h3>

              <p>
                Track your learning journey and
                continue building your skills.
              </p>
            </div>

          </div>

          {/* Percentage */}
          <div className="premium-progress-percentage">
            <span className="premium-progress-number">
              {progress}
            </span>

            <span className="premium-progress-symbol">
              %
            </span>

            <small>
              COMPLETED
            </small>
          </div>

        </div>

        {/* Stats */}
        <div className="premium-progress-stats">

          <div className="premium-progress-stat">
            <span className="stat-number">
              {completedVideos}
            </span>

            <span className="stat-label">
              COMPLETED
            </span>
          </div>

          <div className="premium-progress-stat-divider" />

          <div className="premium-progress-stat">
            <span className="stat-number">
              {totalVideos}
            </span>

            <span className="stat-label">
              TOTAL LESSONS
            </span>
          </div>

          <div className="premium-progress-stat-divider" />

          <div className="premium-progress-stat">
            <span className="stat-number">
              {remaining}
            </span>

            <span className="stat-label">
              REMAINING
            </span>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="premium-progress-bar-wrapper">

          <div className="premium-progress-bar-label">
            <span>Learning Progress</span>

            <span>
              {completedVideos} of {totalVideos} lessons
            </span>
          </div>

          <div className="premium-progress-track">
            <div
              className={`premium-progress-fill ${
                courseCompleted
                  ? "completed"
                  : ""
              }`}
              style={{
                width: `${progress}%`,
              }}
            >
              <span className="premium-progress-shine" />
            </div>
          </div>

        </div>

        {/* Status */}
        {courseCompleted ? (

          <div className="premium-course-completed">

            <div className="premium-completed-icon">
              <FaCheckCircle />
            </div>

            <div>
              <h4>
                Course Completed! 🎉
              </h4>

              <p>
                Outstanding work. You have successfully
                completed every lesson in this course.
              </p>
            </div>

            <FaTrophy className="premium-completed-trophy" />

          </div>

        ) : (

          <div className="premium-continue-learning">

            <div className="premium-continue-icon">
              <FaPlay />
            </div>

            <div className="premium-continue-text">
              <span>
                NEXT MILESTONE
              </span>

              <p>
                Complete your next lesson and keep
                your learning streak moving.
              </p>
            </div>

            <div className="premium-remaining-badge">
              {remaining} left
              <FaArrowRight />
            </div>

          </div>

        )}

      </div>
    </section>
  );
}

export default CourseProgress;