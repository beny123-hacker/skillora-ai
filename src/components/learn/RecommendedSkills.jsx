import React from "react";
import {
  FaRobot,
  FaArrowRight,
  FaClock,
  FaPlay,
  FaStar,
  FaBrain,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";

function RecommendedSkills({ onLearn, courses = [] }) {
  const recommendedCourses = courses.slice(0, 4);

  return (
    <section className="recommended-section">
      {/* Background effects */}
      <div className="recommended-orb recommended-orb-one" />
      <div className="recommended-orb recommended-orb-two" />

      {/* ================= HEADER ================= */}

      <div className="recommended-header">
        <div className="recommended-header-content">
          <div className="recommended-eyebrow">
            <FaStar />
            <span>PERSONALIZED LEARNING</span>
          </div>

          <div className="recommended-title-row">
            <div className="recommended-main-icon">
              <FaRobot />
            </div>

            <div>
              <h2>
                AI Recommended
                <span> Skills</span>
              </h2>

              <p>
                Personalized learning paths selected to help you develop
                valuable skills and move confidently toward your career goals.
              </p>
            </div>
          </div>
        </div>

        {/* AI Status Card */}

        <div className="recommended-ai-status">
          <div className="recommended-ai-icon">
            <FaBrain />
          </div>

          <div className="recommended-ai-text">
            <span>SKILLORA AI</span>
            <strong>Recommendations Ready</strong>
          </div>

          <div className="recommended-status-dot" />
        </div>
      </div>

      {/* ================= COURSE GRID ================= */}

      {recommendedCourses.length > 0 ? (
        <div className="recommended-grid">
          {recommendedCourses.map((course, index) => (
            <article
              key={course.id || `${course.title}-${index}`}
              className="recommended-card"
            >
              {/* Top Accent */}

              <div className="recommended-card-glow" />

              {/* ================= CARD HEADER ================= */}

              <div className="recommended-card-header">
                <div className="recommended-course-number">
                  <span>0{index + 1}</span>
                </div>

                <div className="recommended-card-badges">
                  <div className="recommended-ai-badge">
                    <FaRobot />
                    <span>AI Match</span>
                  </div>

                  <span className="recommended-level">
                    {course.level || "Beginner"}
                  </span>
                </div>
              </div>

              {/* ================= COURSE CONTENT ================= */}

              <div className="recommended-card-content">
                <div className="recommended-match">
                  <FaStar />
                  <span>Recommended for your growth</span>
                </div>

                <h3>{course.title}</h3>

                <p>
                  {course.description ||
                    "Build practical knowledge through structured lessons, curated resources, and hands-on learning."}
                </p>
              </div>

              {/* ================= STATS ================= */}

              <div className="recommended-stats">
                <div className="recommended-stat">
                  <div className="recommended-stat-icon purple">
                    <FaClock />
                  </div>

                  <div>
                    <span>Duration</span>
                    <strong>{course.duration || "Self-paced"}</strong>
                  </div>
                </div>

                <div className="recommended-stat">
                  <div className="recommended-stat-icon blue">
                    <FaLayerGroup />
                  </div>

                  <div>
                    <span>Resources</span>
                    <strong>
                      {course.videos?.length || 0} Lessons
                    </strong>
                  </div>
                </div>
              </div>

              {/* ================= FOOTER ================= */}

              <div className="recommended-card-footer">
                <div className="recommended-verified">
                  <FaCheckCircle />
                  <span>Learning path ready</span>
                </div>

                <button
                  type="button"
                  onClick={() => onLearn?.(course)}
                  className="recommended-start-button"
                >
                  <FaPlay />

                  <span>Start Learning</span>

                  <FaArrowRight className="recommended-arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="recommended-empty">
          <div className="recommended-empty-icon">
            <FaRobot />
          </div>

          <div>
            <span>SKILLORA AI</span>

            <h3>Your recommendations are being prepared</h3>

            <p>
              Explore skills and courses to help our AI create personalized
              learning recommendations for you.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecommendedSkills;