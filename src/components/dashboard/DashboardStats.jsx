import {
  FaBookOpen,
  FaFire,
  FaStar,
  FaChartLine,
  FaArrowUp,
} from "react-icons/fa";

function DashboardStats({
  coursesCompleted = 0,
  learningStreak = 0,
  totalXP = 0,
  overallProgress = 0,
}) {
  const stats = [
    {
      title: "Courses Completed",
      value: coursesCompleted,
      change: "From your learning progress",
      progress:
        coursesCompleted > 0 ? 100 : 0,
      color: "from-cyan-500 to-blue-500",
      bar: "from-cyan-400 to-blue-500",
      icon: <FaBookOpen />,
    },
    {
      title: "Learning Streak",
      value: `${learningStreak} Days`,
      change: "Current learning streak",
      progress:
        learningStreak > 0
          ? Math.min(learningStreak * 10, 100)
          : 0,
      color: "from-orange-500 to-red-500",
      bar: "from-orange-400 to-red-500",
      icon: <FaFire />,
    },
    {
      title: "Experience Points",
      value: `${totalXP.toLocaleString()} XP`,
      change: "Total XP earned",
      progress:
        totalXP > 0
          ? Math.min(Math.round(totalXP / 10), 100)
          : 0,
      color: "from-yellow-500 to-orange-500",
      bar: "from-yellow-400 to-orange-500",
      icon: <FaStar />,
    },
    {
      title: "Overall Progress",
      value: `${overallProgress}%`,
      change: "Average course progress",
      progress: overallProgress,
      color: "from-green-500 to-emerald-500",
      bar: "from-green-400 to-emerald-500",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
        >

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {item.title}
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                {item.value}
              </h2>

              <div className="mt-3 flex items-center gap-2 text-cyan-400">

                <FaArrowUp className="text-sm" />

                <span className="text-xs font-semibold">
                  {item.change}
                </span>

              </div>

            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-xl text-white shadow-lg`}
            >
              {item.icon}
            </div>

          </div>

          <div className="mt-7">

            <div className="mb-2 flex justify-between">

              <span className="text-sm text-slate-400">
                Progress
              </span>

              <span className="font-bold text-white">
                {item.progress}%
              </span>

            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">

              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.bar} transition-all duration-700`}
                style={{
                  width: `${item.progress}%`,
                }}
              />

            </div>

          </div>

        </div>
      ))}

    </section>
  );
}

export default DashboardStats;