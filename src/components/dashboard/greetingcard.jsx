import {
  FaFire,
  FaBrain,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function GreetingCard({
  coursesCompleted = 0,
  totalXP = 0,
  learningStreak = 0,
  overallProgress = 0,
}) {
  const { user } = useAuth();

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Learner";

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${encodeURIComponent(
      fullName
    )}`;

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  return (
    <section className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 xl:grid-cols-[1.7fr_1fr]">

      <div className="p-8 lg:p-10">

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.45em] text-cyan-400">
          AI Personalized Dashboard
        </p>

        <h1 className="text-4xl font-black leading-tight text-white lg:text-5xl">
          {greeting},
          <br />
          {fullName}
          <span className="ml-2">👋</span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          Welcome back to{" "}
          <span className="font-bold text-white">
            Skillora AI
          </span>
          . Continue learning, build your skills,
          complete courses and become industry ready.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">

          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4">
            <p className="text-xs uppercase text-slate-400">
              Current Streak
            </p>

            <div className="mt-2 flex items-center gap-3">
              <FaFire className="text-xl text-orange-400" />

              <h3 className="text-3xl font-black text-white">
                {learningStreak} Days
              </h3>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4">
            <p className="text-xs uppercase text-slate-400">
              Total XP
            </p>

            <h3 className="mt-2 text-3xl font-black text-cyan-300">
              {totalXP.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4">
            <p className="text-xs uppercase text-slate-400">
              AI Mentor
            </p>

            <div className="mt-2 flex items-center gap-2">
              <FaBrain className="text-green-400" />

              <h3 className="text-2xl font-black text-green-400">
                Ready
              </h3>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-4 font-semibold text-white transition hover:scale-105"
          >
            Continue Learning
            <FaArrowRight />
          </button>

          <button
            type="button"
            className="rounded-xl border border-slate-700 bg-slate-800 px-7 py-4 font-semibold text-white transition hover:border-indigo-500"
          >
            AI Coach
          </button>

        </div>

      </div>

      <div className="border-t border-slate-800 bg-white/5 p-8 xl:border-l xl:border-t-0">

        <div className="flex flex-col items-center">

          <img
            src={avatar}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-indigo-500 object-cover shadow-xl"
          />

          <h2 className="mt-5 text-4xl font-black text-white">
            {fullName}
          </h2>

          <p className="mt-2 text-lg text-slate-300">
            Computer Science Student
          </p>

          <span className="mt-3 rounded-full bg-green-500/20 px-4 py-1 text-sm text-green-400">
            ● Online
          </span>

        </div>

        <div className="mt-8">

          <div className="mb-2 flex justify-between">
            <span className="text-slate-300">
              Learning Progress
            </span>

            <span className="font-bold text-cyan-400">
              {overallProgress}%
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700"
              style={{
                width: `${overallProgress}%`,
              }}
            />
          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/60 p-5">

          <div className="flex items-center gap-4">

            <FaGraduationCap className="text-4xl text-cyan-400" />

            <div>
              <p className="text-slate-400">
                Courses Completed
              </p>

              <h3 className="text-3xl font-black text-white">
                {coursesCompleted}{" "}
                {coursesCompleted === 1
                  ? "Course"
                  : "Courses"}
              </h3>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default GreetingCard;