import {
  FaBullseye,
  FaCalendarCheck,
  FaChartLine,
} from "react-icons/fa";

function ProgressCard({
  weeklyProgress = 0,
  daysStudied = 0,
  weeklyXP = 0,
  weeklyGoalHours = 0,
}) {
  const goalProgress =
    weeklyGoalHours > 0
      ? Math.min(
          Math.round(
            (weeklyGoalHours / 10) * 100
          ),
          100
        )
      : 0;

  const radius = 82;
  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference -
    (weeklyProgress / 100) * circumference;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8">

      <div className="flex items-center justify-between">

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Weekly Analytics
          </span>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Weekly Progress
          </h2>

          <p className="mt-2 text-slate-400">
            Your actual learning activity this week.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600">
          <FaBullseye className="text-xl text-white" />
        </div>

      </div>

      <div className="mt-8 flex justify-center">

        <div className="relative">

          <svg
            className="h-52 w-52 -rotate-90"
            viewBox="0 0 208 208"
          >

            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="#1e293b"
              strokeWidth="14"
              fill="none"
            />

            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-700"
            />

            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#06B6D4"
                />

                <stop
                  offset="100%"
                  stopColor="#A855F7"
                />
              </linearGradient>
            </defs>

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h1 className="text-5xl font-black text-white">
              {weeklyProgress}%
            </h1>

            <p className="mt-2 text-sm uppercase tracking-widest text-slate-400">
              Progress
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/15">
              <FaCalendarCheck className="text-xl text-green-400" />
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Days Studied
              </p>

              <h3 className="text-3xl font-bold text-white">
                {daysStudied}
              </h3>
            </div>

          </div>

        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15">
              <FaChartLine className="text-xl text-indigo-400" />
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Weekly XP
              </p>

              <h3 className="text-3xl font-bold text-white">
                +{weeklyXP}
              </h3>
            </div>

          </div>

        </div>

      </div>

      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800/50 p-6">

        <div className="mb-4 flex items-center justify-between">

          <span className="font-medium text-slate-300">
            Weekly Goal
          </span>

          <span className="font-bold text-cyan-400">
            {weeklyGoalHours} / 10 Hours
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-700">

          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"
            style={{
              width: `${goalProgress}%`,
            }}
          />

        </div>

        {weeklyGoalHours === 0 && (
          <p className="mt-4 text-sm text-slate-500">
            Start learning to track your weekly goal.
          </p>
        )}

      </div>

    </section>
  );
}

export default ProgressCard;