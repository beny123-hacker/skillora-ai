import { motion } from "framer-motion";
import {
  FiAward,
  FiLock,
  FiCheckCircle,
  FiStar,
} from "react-icons/fi";

function Achievements({ achievements = [] }) {
  const upcomingBadges = [
    {
      title: "Roadmap Master",
      description:
        "Complete your first full Skillora learning roadmap.",
      icon: "🗺️",
    },
    {
      title: "Quiz Champion",
      description:
        "Achieve outstanding results across multiple quizzes.",
      icon: "🏆",
    },
    {
      title: "1000 XP Club",
      description:
        "Earn 1000 XP and join Skillora's active learners.",
      icon: "⚡",
    },
  ];

  return (
    <section className="profile-achievements">
      {/* HEADER */}

      <div className="profile-module-header">
        <div>
          <span className="profile-section-kicker">
            YOUR REWARDS
          </span>

          <h2>Achievements</h2>

          <p>
            Badges and milestones unlocked throughout your learning journey.
          </p>
        </div>

        <div className="profile-count-badge">
          <FiAward />
          {achievements.length} Unlocked
        </div>
      </div>

      {/* EMPTY STATE */}

      {achievements.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="profile-empty-card"
        >
          <div className="profile-empty-glow" />

          <div className="profile-empty-icon profile-achievement-empty-icon">
            🏆
          </div>

          <div className="relative">
            <span className="profile-empty-kicker">
              YOUR JOURNEY STARTS HERE
            </span>

            <h3>No Achievements Yet</h3>

            <p>
              Complete quizzes, finish learning roadmaps, earn XP,
              and unlock your first Skillora achievement.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="profile-achievement-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id || index}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="profile-achievement-card"
            >
              <div className="profile-achievement-card-glow" />

              <div className="profile-achievement-top">
                <div className="profile-achievement-icon">
                  <FiAward />
                </div>

                <div className="profile-unlocked-label">
                  <FiCheckCircle />
                  Unlocked
                </div>
              </div>

              <h3>{achievement.title}</h3>

              <p>
                {achievement.description ||
                  "You've reached an important milestone in your learning journey."}
              </p>

              <div className="profile-achievement-footer">
                <FiStar />
                Skillora Achievement
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* UPCOMING BADGES */}

      <div className="profile-upcoming-section">
        <div className="profile-subsection-header">
          <div>
            <span>KEEP GOING</span>
            <h3>Upcoming Badges</h3>
          </div>

          <p>
            Your next milestones are waiting for you.
          </p>
        </div>

        <div className="profile-upcoming-grid">
          {upcomingBadges.map((badge, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15 + index * 0.08,
              }}
              whileHover={{
                y: -5,
              }}
              key={badge.title}
              className="profile-upcoming-card"
            >
              <div className="profile-locked-icon">
                <FiLock />
              </div>

              <div className="profile-upcoming-content">
                <div className="profile-upcoming-title-row">
                  <h4>{badge.title}</h4>

                  <span>{badge.icon}</span>
                </div>

                <p>{badge.description}</p>

                <div className="profile-locked-status">
                  <FiLock />
                  Locked
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;