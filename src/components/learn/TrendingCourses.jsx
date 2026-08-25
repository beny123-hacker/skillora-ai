import React from "react";
import {
  FaArrowRight,
  FaPlay,
  FaYoutube,
  FaFire,
  FaClock,
  FaGraduationCap,
  FaChartLine,
  FaCompass,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";

function TrendingCourses({ onStartCourse, courses = [] }) {
  const trendingCourses = courses.slice(0, 6);

  return (
    <section className="trending-section">
      {/* Background Effects */}

      <div className="trending-orb trending-orb-one" />
      <div className="trending-orb trending-orb-two" />

      {/* ================= HEADER ================= */}

      <div className="trending-header">
        <div className="trending-header-content">
          <div className="trending-eyebrow">
            <FaFire />
            <span>POPULAR RIGHT NOW</span>
          </div>

          <div className="trending-title-row">
            <div className="trending-main-icon">
              <FaBolt />
            </div>

            <div>
              <h2>
                Trending
                <span> Courses</span>
              </h2>

              <p>
                Discover the technologies learners are exploring right now and
                start building skills that matter in today's digital world.
              </p>
            </div>
          </div>
        </div>

        {/* Explore Status */}

        <div className="trending-status">
          <div className="trending-status-icon">
            <FaCompass />
          </div>

          <div>
            <span>EXPLORE NOW</span>

            <strong>
              {trendingCourses.length} Courses Available
            </strong>
          </div>
        </div>
      </div>

      {/* ================= COURSE GRID ================= */}

      {trendingCourses.length > 0 ? (
        <div className="trending-grid">
          {trendingCourses.map((course, index) => (
            <article
              key={course.id || `${course.title}-${index}`}
              className="trending-card"
            >
              {/* Card Background */}

              <div className="trending-card-glow" />

              {/* ================= TOP ================= */}

              <div className="trending-card-top">
                <div className="trending-course-icon">
                  <FaGraduationCap />
                </div>

                <div className="trending-badges">
                  <span className="trending-badge">
                    <FaFire />
                    Trending
                  </span>

                  <span className="trending-rank">
                    #{index + 1} Popular
                  </span>
                </div>
              </div>

              {/* ================= CONTENT ================= */}

              <div className="trending-card-content">
                <div className="trending-popularity">
                  <span className="trending-pulse" />
                  <span>Growing in demand</span>
                </div>

                <h3>{course.title}</h3>

                <p>
                  {course.description ||
                    "Learn through structured lessons, curated resources, and practical content designed to strengthen your skills."}
                </p>
              </div>

              {/* ================= COURSE DETAILS ================= */}

              <div className="trending-details">
                <div className="trending-detail">
                  <span className="trending-detail-label">
                    Level
                  </span>

                  <strong>
                    {course.level || "Beginner"}
                  </strong>
                </div>

                <div className="trending-detail">
                  <FaClock />

                  <strong>
                    {course.duration || "Self-paced"}
                  </strong>
                </div>

                <div className="trending-detail trending-video-detail">
                  <FaYoutube />

                  <strong>
                    {course.videos?.length || 0} Videos
                  </strong>
                </div>
              </div>

              {/* ================= COURSE STATUS ================= */}

              <div className="trending-course-status">
                <div className="trending-status-left">
                  <FaChartLine />

                  <span>Ready to start learning</span>
                </div>

                <FaCheckCircle />
              </div>

              <div className="trending-card-spacer" />

              {/* ================= BUTTON ================= */}

              <button
                type="button"
                onClick={() => onStartCourse?.(course)}
                className="trending-start-button"
              >
                <div className="trending-play-icon">
                  <FaPlay />
                </div>

                <span>Start Learning</span>

                <FaArrowRight className="trending-arrow" />
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="trending-empty">
          <div className="trending-empty-icon">
            <FaFire />
          </div>

          <div>
            <span>EXPLORE NEW SKILLS</span>

            <h3>No trending courses available yet</h3>

            <p>
              Start exploring technologies and discover curated learning
              resources tailored to help you grow.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default TrendingCourses;