import React from "react";
import {
  FaYoutube,
  FaPlay,
  FaArrowRight,
  FaArrowLeft,
  FaVideo,
  FaLayerGroup,
  FaClock,
} from "react-icons/fa";

function YoutubeResources({
  selectedCourse,
  onSelectCourse,
  courses = [],
}) {
  // =========================================================
  // COURSE LIST
  // =========================================================

  if (!selectedCourse) {
    return (
      <section className="youtube-resources">
        <div className="youtube-resources-header">
          <div>
            <div className="youtube-eyebrow">
              <span className="youtube-eyebrow-icon">
                <FaYoutube />
              </span>
              VIDEO LEARNING
            </div>

            <h2 className="youtube-section-title">
              Learn from curated video courses
            </h2>

            <p className="youtube-section-description">
              Structured lessons, quality resources, and a clear learning path
              designed to help you build practical skills step by step.
            </p>
          </div>

          <div className="youtube-header-badge">
            <FaLayerGroup />
            <span>{courses.length} Courses</span>
          </div>
        </div>

        {courses.length > 0 ? (
          <div className="youtube-course-grid">
            {courses.map((course, index) => (
              <article
                key={course.id}
                className="youtube-course-card"
              >
                <div className="youtube-card-glow" />

                <div className="youtube-card-top">
                  <div className="youtube-course-icon">
                    <FaYoutube />
                  </div>

                  <span className="youtube-course-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="youtube-course-content">
                  <div className="youtube-platform-label">
                    <span />
                    VIDEO COURSE
                  </div>

                  <h3>{course.title}</h3>

                  <p>
                    {course.description ||
                      "Build your skills through structured video lessons and practical learning resources."}
                  </p>
                </div>

                <div className="youtube-course-meta">
                  {course.level && (
                    <div className="youtube-meta-item">
                      <FaLayerGroup />
                      <span>{course.level}</span>
                    </div>
                  )}

                  {course.duration && (
                    <div className="youtube-meta-item">
                      <FaClock />
                      <span>{course.duration}</span>
                    </div>
                  )}

                  <div className="youtube-meta-item">
                    <FaVideo />
                    <span>
                      {course.videos?.length || 0} Lessons
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectCourse?.(course)}
                  className="youtube-start-button"
                >
                  <span className="youtube-start-icon">
                    <FaPlay />
                  </span>

                  <span>Start Learning</span>

                  <FaArrowRight className="youtube-button-arrow" />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="youtube-empty-state">
            <div className="youtube-empty-icon">
              <FaYoutube />
            </div>

            <div>
              <span className="youtube-empty-label">
                AVAILABLE COURSES
              </span>

              <h3>No courses available yet</h3>

              <p>
                New learning resources will appear here when they become
                available.
              </p>
            </div>
          </div>
        )}
      </section>
    );
  }

  // =========================================================
  // SELECTED COURSE
  // =========================================================

  return (
    <section className="youtube-resources">
      <div className="youtube-course-page-header">
        <div>
          <button
            type="button"
            onClick={() => onSelectCourse?.(null)}
            className="youtube-back-button"
          >
            <FaArrowLeft />
            Back to Courses
          </button>

          <div className="youtube-eyebrow youtube-current-course-label">
            <span className="youtube-eyebrow-icon">
              <FaYoutube />
            </span>
            CURRENT COURSE
          </div>

          <h2 className="youtube-section-title">
            {selectedCourse.title}
          </h2>

          <p className="youtube-section-description">
            Follow each lesson in order and build your knowledge step by step.
          </p>
        </div>

        <div className="youtube-course-summary">
          <FaVideo />

          <div>
            <strong>
              {selectedCourse.videos?.length || 0}
            </strong>
            <span>Lessons</span>
          </div>
        </div>
      </div>

      {selectedCourse.videos?.length > 0 ? (
        <div className="youtube-lessons-list">
          {selectedCourse.videos.map((video, index) => (
            <article
              key={video.id || index}
              className="youtube-lesson-card"
            >
              <div className="youtube-lesson-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="youtube-lesson-icon">
                <FaYoutube />
              </div>

              <div className="youtube-lesson-content">
                <span>
                  LESSON {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{video.title}</h3>

                <p>
                  Continue your learning journey with this video lesson.
                </p>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${
                  video.youtubeId || video.youtube_id
                }`}
                target="_blank"
                rel="noreferrer"
                className="youtube-watch-button"
              >
                <FaPlay />

                <span>Watch Lesson</span>

                <FaArrowRight />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="youtube-empty-state">
          <div className="youtube-empty-icon">
            <FaYoutube />
          </div>

          <div>
            <span className="youtube-empty-label">
              COURSE CONTENT
            </span>

            <h3>No video lessons available</h3>

            <p>
              YouTube learning resources will be added to this course soon.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default YoutubeResources;