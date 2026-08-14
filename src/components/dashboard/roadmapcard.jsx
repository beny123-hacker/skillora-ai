import {
  FaCheckCircle,
  FaLock,
  FaPlayCircle,
  FaArrowRight,
  FaMapMarkedAlt,
  FaRocket,
} from "react-icons/fa";

function RoadmapCard({
  roadmap = null,
}) {
  if (!roadmap) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8">

        <div className="flex items-center justify-between">

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
              Career Journey
            </span>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Your Roadmap
            </h2>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
            <FaMapMarkedAlt className="text-xl text-white" />
          </div>

        </div>

        <div className="py-14 text-center">

          <FaRocket className="mx-auto text-5xl text-indigo-400" />

          <h3 className="mt-5 text-2xl font-bold text-white">
            No roadmap yet
          </h3>

          <p className="mx-auto mt-3 max-w-md text-slate-500">
            Create or choose a career roadmap to
            start tracking your progress.
          </p>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 font-semibold text-white"
          >
            Explore Roadmaps
            <FaArrowRight />
          </button>

        </div>

      </section>
    );
  }

  const items = [...(roadmap.items || [])].sort(
    (a, b) => a.order - b.order
  );

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8">

      <div className="flex items-center justify-between">

        <div>

          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Career Journey
          </span>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {roadmap.title}
          </h2>

          <p className="mt-2 text-slate-400">
            {roadmap.description ||
              "Track your career roadmap progress."}
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
          <FaMapMarkedAlt className="text-xl text-white" />
        </div>

      </div>

      <div className="mt-8">

        <div className="mb-3 flex items-center justify-between">

          <span className="font-medium text-slate-300">
            Roadmap Completion
          </span>

          <span className="font-bold text-cyan-400">
            {roadmap.progress}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-700"
            style={{
              width: `${roadmap.progress}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 space-y-3">

        {items.map((item, index) => {

          const completed = item.completed;

          const isCurrent =
            !completed &&
            index ===
              items.findIndex(
                (roadmapItem) =>
                  !roadmapItem.completed
              );

          return (
            <div
              key={item.id || index}
              className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    completed
                      ? "bg-green-500"
                      : isCurrent
                      ? "bg-indigo-500"
                      : "bg-slate-700"
                  }`}
                >

                  {completed ? (
                    <FaCheckCircle className="text-white" />
                  ) : isCurrent ? (
                    <FaPlayCircle className="text-white" />
                  ) : (
                    <FaLock className="text-slate-400" />
                  )}

                </div>

                <div>

                  <h3
                    className={`font-semibold ${
                      completed || isCurrent
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Module {index + 1}
                  </p>

                </div>

              </div>

              {isCurrent && (
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                  Current
                </span>
              )}

            </div>
          );
        })}

      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <div className="flex items-center gap-3">

          <FaRocket className="text-xl text-cyan-400" />

          <div>

            <p className="text-sm text-slate-400">
              Next Milestone
            </p>

            <h3 className="text-xl font-bold text-white">
              {items.find(
                (item) => !item.completed
              )?.title || "Roadmap Completed 🎉"}
            </h3>

          </div>

        </div>

      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 font-semibold text-white"
      >
        View Full Roadmap
        <FaArrowRight />
      </button>

    </section>
  );
}

export default RoadmapCard;