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
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-10">

        <div className="flex flex-col items-center justify-center py-10 text-center">

          <FaBrain className="text-5xl text-indigo-400" />

          <h2 className="mt-5 text-3xl font-black text-white">
            No Course in Progress
          </h2>

          <p className="mt-3 max-w-xl text-slate-400">
            You have not started a course yet.
            Start learning to see your current course
            and next lesson here.
          </p>

          <button
            type="button"
            className="mt-7 flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-4 font-semibold text-white"
          >
            <FaPlay />
            Start Learning
          </button>

        </div>

      </section>
    );
  }

  const course =
    currentCourse.courses || currentCourse;

  const progress =
    Number(currentCourse.progress || 0);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">

      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative grid grid-cols-1 xl:grid-cols-[2fr_1fr]">

        <div className="p-8 lg:p-10">

          <div className="inline-flex items-center gap-3 rounded-full bg-indigo-500/10 px-5 py-2">

            <FaBrain className="text-cyan-400" />

            <span className="text-sm font-semibold text-cyan-300">
              Continue Learning
            </span>

          </div>

          <h2 className="mt-7 text-4xl font-black leading-tight text-white lg:text-5xl">
            {course.title || "Your Current Course"}
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            {course.description ||
              "Continue your learning journey and complete the remaining lessons."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4">

              <div className="flex items-center gap-3">
                <FaBookOpen className="text-indigo-400" />

                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Progress
                  </p>

                  <h3 className="text-2xl font-bold text-white">
                    {progress}%
                  </h3>
                </div>
              </div>

            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4">

              <div className="flex items-center gap-3">
                <FaClock className="text-cyan-400" />

                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Status
                  </p>

                  <h3 className="text-2xl font-bold text-white">
                    In Progress
                  </h3>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-4 font-semibold text-white"
            >
              <FaPlay />
              Resume Learning
            </button>

            <button
              type="button"
              className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-7 py-4 font-semibold text-white"
            >
              View Course
              <FaArrowRight />
            </button>

          </div>

        </div>

        <div className="border-t border-slate-800 bg-white/5 p-8 xl:border-l xl:border-t-0">

          <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">

            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Current Progress
            </p>

            <h2 className="mt-5 text-5xl font-black text-white">
              {progress}%
            </h2>

            <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-700">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mt-8 rounded-2xl bg-slate-800 p-5">

              <p className="text-xs uppercase text-slate-500">
                Course
              </p>

              <h3 className="mt-3 text-xl font-bold text-white">
                {course.title}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ContinueLearning;