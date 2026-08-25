import {
  FaPlay,
  FaClock,
  FaBookOpen,
  FaArrowRight,
  FaBrain,
} from "react-icons/fa";

function ContinueLearning({
  currentCourse = null,
}) {
  if (!currentCourse) {
    return (
      <section className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#090d1a] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-10">

        <div className="flex flex-col items-center justify-center py-8 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/10 bg-indigo-500/[0.07]">
            <FaBrain className="text-2xl text-indigo-400" />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">
            Continue Learning
          </p>

          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            No Course in Progress
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Start a course and your current lesson will appear here.
          </p>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
          >
            <FaPlay />
            Start Learning
          </button>

        </div>

      </section>
    );
  }

  const course = currentCourse.courses || currentCourse;

  const progress = Math.min(
    Math.max(Number(currentCourse.progress || 0), 0),
    100
  );

  return (
    <section className="relative min-w-0 overflow-visible rounded-2xl border border-white/[0.07] bg-[#090d1a] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">

      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-indigo-500/8 blur-[100px]" />

      <div className="relative grid min-w-0 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px]">

        {/* COURSE INFO */}

        <div className="min-w-0 p-7 sm:p-8 lg:p-9">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/[0.05] px-4 py-2">

            <FaBrain className="text-cyan-400" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">
              Continue Learning
            </span>

          </div>

          <h2 className="mt-6 break-words text-3xl font-black tracking-tight text-white sm:text-4xl">
            {course.title || "Your Current Course"}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {course.description ||
              "Continue your learning journey and complete the remaining lessons."}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                  <FaBookOpen className="text-indigo-400" />
                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Progress
                  </p>

                  <p className="mt-1 text-xl font-black text-white">
                    {progress}%
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                  <FaClock className="text-cyan-400" />
                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    Status
                  </p>

                  <p className="mt-1 text-xl font-black text-emerald-400">
                    In Progress
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-7 flex flex-wrap gap-3">

            <button
              type="button"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"
            >

              <FaPlay />

              Resume Learning

            </button>

            <button
              type="button"
              className="group inline-flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-6 py-3.5 text-sm font-bold text-slate-300 transition hover:border-indigo-400/20 hover:bg-white/[0.05]"
            >

              View Course

              <FaArrowRight className="transition-transform group-hover:translate-x-1" />

            </button>

          </div>

        </div>

        {/* PROGRESS PANEL */}

        <div className="border-t border-white/[0.07] bg-white/[0.018] p-7 xl:border-l xl:border-t-0">

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
            Current Progress
          </p>

          <div className="mt-4 flex items-baseline gap-2">

            <span className="text-5xl font-black text-white">
              {progress}
            </span>

            <span className="text-xl text-slate-500">
              %
            </span>

          </div>

          <div className="mt-5 h-2.5 rounded-full bg-white/[0.06]">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#0d1324] p-4">

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Current Course
            </p>

            <h3 className="mt-2 break-words text-base font-bold text-white">
              {course.title || "Your Course"}
            </h3>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContinueLearning;