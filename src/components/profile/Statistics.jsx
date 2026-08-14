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
  gradient,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/40
      dark:border-gray-700/40
      bg-white/70
      dark:bg-gray-900/50
      backdrop-blur-xl
      shadow-lg
      p-6"
    >
      {/* Background Glow */}
      <div
        className={`absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-20 blur-2xl bg-gradient-to-br ${gradient}`}
      />

      <div className="relative flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${gradient}`}
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
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

      <StatCard
        icon={FiZap}
        title="Total XP"
        value={profile?.xp || 0}
        gradient="from-blue-500 to-cyan-500"
        delay={0.05}
      />

      <StatCard
        icon={FiTrendingUp}
        title="Current Streak"
        value={`${profile?.streak || 0} Days`}
        gradient="from-green-500 to-emerald-500"
        delay={0.10}
      />

      <StatCard
        icon={FiAward}
        title="Achievements"
        value={achievements?.length || 0}
        gradient="from-purple-500 to-pink-500"
        delay={0.15}
      />

      <StatCard
        icon={FiCalendar}
        title="Certificates"
        value={certificates?.length || 0}
        gradient="from-orange-500 to-red-500"
        delay={0.20}
      />

    </div>
  );
};

export default Statistics;