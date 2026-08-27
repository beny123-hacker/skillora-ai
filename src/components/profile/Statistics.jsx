import { motion } from "framer-motion";
import {
  FiZap,
  FiTrendingUp,
  FiAward,
  FiCalendar,
} from "react-icons/fi";

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  gradient,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay,
      }}
      whileHover={{
        y: -7,
        scale: 1.02,
      }}
      className="profile-stat-card"
    >
      <div
        className={`profile-stat-glow bg-gradient-to-br ${gradient}`}
      />

      <div className="profile-stat-content">
        <div>
          <p className="profile-stat-title">{title}</p>

          <h2 className="profile-stat-value">{value}</h2>

          {subtitle && (
            <p className="profile-stat-subtitle">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`profile-stat-icon bg-gradient-to-br ${gradient}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};

const Statistics = ({
  profile,
  achievements,
  certificates,
}) => {
  const xp = profile?.xp || 0;
  const streak = profile?.streak || 0;
  const achievementCount = achievements?.length || 0;
  const certificateCount = certificates?.length || 0;

  return (
    <section className="profile-statistics">
      <div className="profile-stats-header">
        <div>
          <span className="profile-section-kicker">
            YOUR PERFORMANCE
          </span>

          <h2>Learning Statistics</h2>

          <p>
            Track your progress and celebrate every milestone.
          </p>
        </div>
      </div>

      <div className="profile-stats-grid">
        <StatCard
          icon={FiZap}
          title="Total XP"
          value={xp.toLocaleString()}
          subtitle="Experience earned"
          gradient="from-blue-500 to-cyan-500"
          delay={0.05}
        />

        <StatCard
          icon={FiTrendingUp}
          title="Current Streak"
          value={`${streak} Days`}
          subtitle="Keep the momentum"
          gradient="from-emerald-500 to-green-400"
          delay={0.1}
        />

        <StatCard
          icon={FiAward}
          title="Achievements"
          value={achievementCount}
          subtitle="Badges unlocked"
          gradient="from-purple-500 to-pink-500"
          delay={0.15}
        />

        <StatCard
          icon={FiCalendar}
          title="Certificates"
          value={certificateCount}
          subtitle="Skills certified"
          gradient="from-orange-500 to-red-500"
          delay={0.2}
        />
      </div>
    </section>
  );
};

export default Statistics;