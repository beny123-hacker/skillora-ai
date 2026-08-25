import {
  FaBookOpen,
  FaClock,
  FaPlay,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";

function CourseCard({ course, onSelect }) {
  return (
    <article className="premium-course-card">
      {/* Glow */}
      <div className="premium-course-card-glow" />

      {/* Top Accent */}
      <div className="premium-course-card-accent" />

      <div className="premium-course-card-content">
        {/* Header */}
        <div className="premium-course-card-header">
          <div className="premium-course-icon">
            {course.icon || <FaBookOpen />}
          </div>

          <div className="premium-course-badge">
            <span className="premium-badge-dot" />
            {course.category || "Learning Path"}
          </div>
        </div>

        {/* Main Content */}
        <div className="premium-course-body">
          <div className="premium-course-label">
            <FaChartLine />
            CURATED COURSE
          </div>

          <h3 className="premium-course-title">
            {course.title}
          </h3>

          <p className="premium-course-description">
            {course.description}
          </p>
        </div>

        {/* Meta */}
        <div className="premium-course-meta">
          <div className="premium-course-meta-item">
            <span className="premium-meta-icon">◈</span>

            <div>
              <span className="premium-meta-label">
                LEVEL
              </span>

              <span className="premium-meta-value">
                {course.level || "Beginner"}
              </span>
            </div>
          </div>

          <div className="premium-course-meta-divider" />

          <div className="premium-course-meta-item">
            <FaClock className="premium-meta-icon" />

            <div>
              <span className="premium-meta-label">
                DURATION
              </span>

              <span className="premium-meta-value">
                {course.duration || "Self-paced"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="premium-course-footer">
          <div className="premium-course-ready">
            <span className="premium-ready-dot" />
            Ready to start
          </div>

          <button
            type="button"
            onClick={() => onSelect?.(course)}
            className="premium-course-button"
          >
            <span>
              Explore Course
            </span>

            <FaPlay />

            <FaArrowRight className="premium-button-arrow" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;