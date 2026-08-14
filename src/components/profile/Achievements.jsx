import { motion } from "framer-motion";
import { FiAward, FiLock } from "react-icons/fi";

function Achievements({ achievements = [] }) {
  return (
    <section>

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Achievements
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Badges you've unlocked during your learning journey.
          </p>

        </div>

        <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
          {achievements.length} Unlocked
        </span>

      </div>

      {achievements.length === 0 ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-12 text-center"
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-4xl shadow-lg">
            🏆
          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            No Achievements Yet
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            Complete quizzes, finish learning roadmaps, earn XP,
            and unlock your first Skillora achievement.
          </p>

        </motion.div>

      ) : (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {achievements.map((achievement, index) => (

            <motion.div
              key={achievement.id}
              initial={{
                opacity: 0,
                y: 20,
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
                scale: 1.03,
              }}
              className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:border-yellow-500/40"
            >

              {/* Top Glow */}

              <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500" />

              <div className="p-6">

                <div className="flex justify-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-3xl text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                    <FiAward />
                  </div>

                </div>

                <h3 className="mt-5 text-center text-lg font-bold text-white">
                  {achievement.title}
                </h3>

                {achievement.description && (

                  <p className="mt-3 text-center text-sm leading-6 text-slate-400">
                    {achievement.description}
                  </p>

                )}

                <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-500/10 py-2 text-xs font-semibold text-green-400">

                  ✅ Achievement Unlocked

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      )}

      {/* Locked Badges */}

      <div className="mt-10">

        <h3 className="mb-5 text-lg font-semibold text-slate-300">
          Upcoming Badges
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {[
            "Roadmap Master",
            "Quiz Champion",
            "1000 XP Club",
          ].map((badge) => (

            <div
              key={badge}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 opacity-70"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-xl text-slate-500">

                  <FiLock />

                </div>

                <div>

                  <h4 className="font-semibold text-white">
                    {badge}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    Complete more activities to unlock.
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Achievements;