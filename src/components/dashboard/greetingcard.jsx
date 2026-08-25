import {
  FaFire,
  FaBrain,
  FaGraduationCap,
  FaArrowRight,
  FaBolt,
} from "react-icons/fa";

import { useAuth } from "../../context/Authcontext";

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
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const progress = Math.min(100, Math.max(0, Number(overallProgress) || 0));

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0b1020] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
      {/* ambient premium glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative grid min-w-0 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* LEFT */}
        <div className="min-w-0 p-6 sm:p-8 lg:p-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            AI Personalized Dashboard
          </div>

          <h1 className="max-w-3xl text-[clamp(2.3rem,4vw,4rem)] font-black leading-[0.98] tracking-[-0.04em] text-white">
            {greeting},
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              {fullName}
            </span>
            <span className="ml-2 inline-block align-middle text-[0.65em]">👋</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Welcome back to <span className="font-semibold text-white">Skillora AI</span>.
            Continue learning, strengthen your skills and move one step closer to your career goals.
          </p>

          {/* QUICK METRICS */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-orange-400/20 hover:bg-white/[0.04]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Learning Streak
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10">
                  <FaFire className="text-orange-400" />
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-black text-white">{learningStreak}</span>
                <span className="pb-0.5 text-xs text-slate-500">days</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-cyan-400/20 hover:bg-white/[0.04]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Total XP
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10">
                  <FaBolt className="text-cyan-300" />
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-black text-cyan-300">{totalXP.toLocaleString()}</span>
                <span className="pb-0.5 text-xs text-slate-500">XP</span>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4 transition hover:border-emerald-400/25 hover:bg-emerald-400/[0.05]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  AI Mentor
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-400/10">
                  <FaBrain className="text-emerald-400" />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-2xl font-black text-emerald-400">Ready</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/10 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Overall Progress
                </p>
                <p className="mt-1 text-xs text-slate-400">Your learning journey</p>
              </div>
              <span className="text-xl font-black text-cyan-300">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800/90">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 shadow-[0_0_18px_rgba(99,102,241,0.45)] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:shadow-indigo-600/30"
            >
              Continue Learning
              <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              AI Coach
            </button>
          </div>
        </div>

        {/* RIGHT PROFILE */}
        <aside className="relative border-t border-white/[0.07] bg-white/[0.018] p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent lg:inset-y-0 lg:left-0 lg:h-auto lg:w-px lg:bg-gradient-to-b" />

          <div className="flex h-full flex-col">
            <div className="text-center">
              <div className="relative mx-auto w-fit">
                <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-cyan-400/20 via-indigo-500/20 to-violet-500/20 blur-md" />
                <img
                  src={avatar}
                  alt="Profile"
                  className="relative h-24 w-24 rounded-full border-2 border-indigo-400/70 object-cover shadow-2xl sm:h-28 sm:w-28"
                />
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#0b1020] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </div>

              <h2 className="mt-5 truncate text-2xl font-black tracking-tight text-white">
                {fullName}
              </h2>
              <p className="mt-1 text-xs text-slate-500">Computer Science Student</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-3 py-1 text-[10px] font-bold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Active Learner
              </span>
            </div>

            <div className="mt-7 rounded-2xl border border-white/[0.07] bg-black/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Learning Progress
                </span>
                <span className="text-sm font-black text-cyan-300">{progress}%</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                <FaGraduationCap className="text-lg text-amber-300" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Courses Completed
                </p>
                <p className="mt-1 text-xl font-black text-white">
                  {coursesCompleted}
                  <span className="ml-1 text-xs font-medium text-slate-500">
                    {coursesCompleted === 1 ? "course" : "courses"}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-auto hidden pt-6 lg:block">
              <div className="rounded-2xl border border-indigo-400/10 bg-gradient-to-br from-indigo-500/[0.08] to-cyan-400/[0.03] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">
                  Keep Going
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Small consistent progress builds strong career-ready skills.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default GreetingCard;
