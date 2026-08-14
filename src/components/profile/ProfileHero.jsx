import { motion } from "framer-motion";
import { FiEdit2, FiMail, FiBriefcase, FiTarget } from "react-icons/fi";

const ProfileHero = ({ profile, user }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-3xl border border-white/40 dark:border-gray-700/40
      bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl shadow-xl
      p-6 sm:p-10 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row gap-6 items-center md:items-start">

        {/* Avatar */}
        <div className="shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-28 h-28 rounded-3xl object-cover
              shadow-xl ring-4 ring-white dark:ring-gray-800"
            />
          ) : (
            <div
              className="w-28 h-28 rounded-3xl
              bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600
              flex items-center justify-center
              text-white text-4xl font-bold
              shadow-xl ring-4 ring-white dark:ring-gray-800"
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">

          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {displayName}
          </h1>

          <p className="mt-2 flex justify-center md:justify-start items-center gap-2 text-gray-500 dark:text-gray-400">
            <FiMail size={15} />
            {email}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-5">

            {profile?.dream_company && (
              <span
                className="px-4 py-2 rounded-full
                bg-indigo-100 dark:bg-indigo-900/30
                text-indigo-600 dark:text-indigo-300
                text-sm flex items-center gap-2"
              >
                <FiBriefcase />
                {profile.dream_company}
              </span>
            )}

            {profile?.career_goal && (
              <span
                className="px-4 py-2 rounded-full
                bg-purple-100 dark:bg-purple-900/30
                text-purple-600 dark:text-purple-300
                text-sm flex items-center gap-2"
              >
                <FiTarget />
                {profile.career_goal}
              </span>
            )}

          </div>

          {/* Progress */}
          <div className="mt-8">

            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Learning Progress</span>
              <span>{learningProgress}%</span>
            </div>

            <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${learningProgress}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              />

            </div>

          </div>

        </div>

        {/* Edit Button */}
        <div className="shrink-0">

          <button
            className="
            px-5 py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            text-white
            font-medium
            shadow-lg
            hover:scale-105
            transition-all
            flex
            items-center
            gap-2"
          >
            <FiEdit2 />
            Edit Profile
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default ProfileHero;