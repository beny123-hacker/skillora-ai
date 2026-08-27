import { motion } from "framer-motion";
import {
  FiEdit2,
  FiMail,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiHeart,
  FiPlus,
} from "react-icons/fi";

const ProfileHero = ({ profile, user, onEdit }) => {
  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    "Learner";

  const email = profile?.email || user?.email || "";

  const avatarUrl =
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    "";

  const learningProgress = profile?.learning_progress || 0;

  const department =
    profile?.department ||
    "•";

  const year =
    profile?.year ||
    profile?.study_year ||
    "•";

  const collegeName =
    profile?.college_name ||
    profile?.college ||
    "•";

  const bio =
    profile?.bio ||
    "•";

  let interests = profile?.interests || [];

  // Handle interests stored as JSON string
  if (typeof interests === "string") {
    try {
      interests = JSON.parse(interests);
    } catch {
      interests = interests
        .split(",")
        .map((interest) => interest.trim())
        .filter(Boolean);
    }
  }

  if (!Array.isArray(interests)) {
    interests = [];
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="profile-hero"
    >
      {/* Background Effects */}
      <div className="profile-hero-glow profile-hero-glow-one" />
      <div className="profile-hero-glow profile-hero-glow-two" />

      {/* TOP SECTION */}
      <div className="profile-hero-top">

        {/* Avatar */}
        <div className="profile-avatar-wrapper">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="profile-avatar"
            />
          ) : (
            <div className="profile-avatar profile-avatar-placeholder">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}

          <span className="profile-online-dot" />
        </div>

        {/* Main Info */}
        <div className="profile-main-info">

          <span className="profile-label">
            SKILLORA LEARNER
          </span>

          <h1 className="profile-name">
            {displayName}
          </h1>

          <div className="profile-email">
            <FiMail />
            <span>{email}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="profile-actions">

          <div className="profile-status">
            <span className="profile-status-dot" />
            Active Learner
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="profile-edit-button"
          >
            <FiEdit2 />
            Edit Profile
          </button>

        </div>
      </div>

      {/* PROFILE DETAILS */}
      <div className="profile-details-grid">

        {/* Department */}
        <motion.div
          whileHover={{ y: -4 }}
          className="profile-detail-card"
        >
          <div className="profile-detail-icon department-icon">
            <FiBookOpen />
          </div>

          <div className="profile-detail-content">
            <span className="profile-detail-label">
              DEPARTMENT
            </span>

            <p className="profile-detail-value">
              {department}
            </p>
          </div>
        </motion.div>

        {/* Year */}
        <motion.div
          whileHover={{ y: -4 }}
          className="profile-detail-card"
        >
          <div className="profile-detail-icon year-icon">
            <FiCalendar />
          </div>

          <div className="profile-detail-content">
            <span className="profile-detail-label">
              YEAR
            </span>

            <p className="profile-detail-value">
              {year}
            </p>
          </div>
        </motion.div>

        {/* College */}
        <motion.div
          whileHover={{ y: -4 }}
          className="profile-detail-card"
        >
          <div className="profile-detail-icon college-icon">
            <FiMapPin />
          </div>

          <div className="profile-detail-content">
            <span className="profile-detail-label">
              COLLEGE
            </span>

            <p className="profile-detail-value">
              {collegeName}
            </p>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          whileHover={{ y: -4 }}
          className="profile-detail-card profile-bio-card"
        >
          <div className="profile-detail-icon bio-icon">
            <FiUser />
          </div>

          <div className="profile-detail-content">
            <span className="profile-detail-label">
              ABOUT
            </span>

            <p className="profile-detail-value profile-bio-text">
              {bio}
            </p>
          </div>
        </motion.div>
      </div>

      {/* INTERESTS */}
      <div className="profile-interests-section">

        <div className="profile-interests-header">

          <div className="profile-interests-title">
            <FiHeart />

            <div>
              <span>MY INTERESTS</span>

              <p>
                Personalize your Skillora learning experience
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="profile-add-interest"
          >
            <FiPlus />
            Add Interests
          </button>
        </div>

        <div className="profile-interest-list">

          {interests.length > 0 ? (
            interests.map((interest, index) => (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                key={`${interest}-${index}`}
                className="profile-interest-tag"
              >
                {interest}
              </motion.span>
            ))
          ) : (
            <button
              type="button"
              onClick={onEdit}
              className="profile-empty-interest"
            >
              <FiPlus />
              Add your interests
            </button>
          )}

        </div>
      </div>

      {/* PROGRESS */}
      <div className="profile-progress-section">

        <div className="profile-progress-header">

          <div>
            <span className="profile-detail-label">
              LEARNING PROGRESS
            </span>

            <p>
              Keep building your skills
            </p>
          </div>

          <strong>
            {learningProgress}%
          </strong>
        </div>

        <div className="profile-progress-track">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min(
                Math.max(Number(learningProgress) || 0, 0),
                100
              )}%`,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="profile-progress-fill"
          />
        </div>
      </div>

    </motion.section>
  );
};

export default ProfileHero;