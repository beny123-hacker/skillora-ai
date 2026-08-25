import {
  FaBookOpen,
  FaFire,
  FaStar,
  FaChartLine,
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
      suffix: coursesCompleted === 1 ? "Course" : "Courses",
      description: "Courses successfully completed",
      progress: coursesCompleted > 0 ? 100 : 0,
      icon: <FaBookOpen />,
      iconStyle: "bg-cyan-400/10 text-cyan-400",
      progressStyle: "from-cyan-400 to-blue-500",
    },
    {
      title: "Learning Streak",
      value: learningStreak,
      suffix: "Days",
      description: "Keep your learning momentum",
      progress: Math.min(learningStreak * 10, 100),
      icon: <FaFire />,
      iconStyle: "bg-orange-400/10 text-orange-400",
      progressStyle: "from-orange-400 to-red-500",
    },
    {
      title: "Experience Points",
      value: totalXP.toLocaleString(),
      suffix: "XP",
      description: "Total experience earned",
      progress: totalXP > 0 ? Math.min(totalXP / 10, 100) : 0,
      icon: <FaStar />,
      iconStyle: "bg-amber-400/10 text-amber-400",
      progressStyle: "from-amber-400 to-orange-500",
    },
    {
      title: "Overall Progress",
      value: overallProgress,
      suffix: "%",
      description: "Average learning progress",
      progress: overallProgress,
      icon: <FaChartLine />,
      iconStyle: "bg-emerald-400/10 text-emerald-400",
      progressStyle: "from-emerald-400 to-cyan-500",
    },
  ];

  return (
    <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

      {stats.map((item) => (
        <div
          key={item.title}
          className="group min-w-0 rounded-2xl border border-white/[0.07] bg-[#090d1a] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-[#0c1120]"
        >

          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0">

              <p className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {item.title}
              </p>

              <div className="mt-3 flex items-baseline gap-2">

                <span className="truncate text-3xl font-black text-white">
                  {item.value}
                </span>

                <span className="shrink-0 text-xs font-medium text-slate-500">
                  {item.suffix}
                </span>

              </div>

            </div>

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconStyle} text-lg`}
            >
              {item.icon}
            </div>

          </div>

          <p className="mt-4 truncate text-xs text-slate-500">
            {item.description}
          </p>

          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between">

              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                Progress
              </span>

              <span className="text-xs font-bold text-slate-400">
                {Math.round(item.progress)}%
              </span>

            </div>

            <div className="h-1.5 rounded-full bg-white/[0.06]">

              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.progressStyle} transition-all duration-700`}
                style={{
                  width: `${Math.min(Math.max(item.progress, 0), 100)}%`,
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