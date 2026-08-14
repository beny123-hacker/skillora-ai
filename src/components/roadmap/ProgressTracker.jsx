import React from "react";

function ProgressTracker({
  roadmapData = null,
}) {
  // =========================================================
  // GET MILESTONES FROM AI ROADMAP
  // =========================================================

  const milestones =
    roadmapData?.milestones ||
    roadmapData?.roadmap?.milestones ||
    roadmapData?.steps ||
    roadmapData?.roadmap ||
    [];

  const roadmapSteps = Array.isArray(milestones)
    ? milestones
    : [];

  // =========================================================
  // TOTAL TOPICS
  // =========================================================

  const totalTopics = roadmapSteps.length;

  // =========================================================
  // COMPLETED TOPICS
  // =========================================================

  const completedTopics = roadmapSteps.filter(
    (step) =>
      step?.completed === true ||
      String(step?.status || "").toLowerCase() ===
        "completed"
  ).length;

  // =========================================================
  // PROGRESS
  // =========================================================

  let calculatedProgress = 0;

  if (totalTopics > 0) {
    calculatedProgress = Math.round(
      (completedTopics / totalTopics) * 100
    );
  }

  // Prefer progress returned by AI/n8n
  const aiProgress = Number(
    roadmapData?.progress
  );

  const progress = !Number.isNaN(aiProgress)
    ? Math.min(Math.max(aiProgress, 0), 100)
    : calculatedProgress;

  // =========================================================
  // SAFE PROGRESS
  // =========================================================

  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!roadmapData || totalTopics === 0) {
    return (
      <section className="mt-10">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h3 className="text-xl font-bold text-white">
                Your Progress
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Generate your roadmap to start tracking your
                learning progress. 🚀
              </p>

            </div>

            <div className="text-right">

              <p className="text-3xl font-bold text-indigo-400">
                0%
              </p>

              <p className="text-xs text-slate-500">
                Completed
              </p>

            </div>

          </div>

          <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
              style={{
                width: "0%",
              }}
            />

          </div>

          <div className="mt-5 flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Completed
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                0
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-slate-400">
                Total Topics
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                0
              </p>

            </div>

          </div>

        </div>

      </section>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <section className="mt-10">

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-300">
              LEARNING PROGRESS
            </span>

            <h3 className="mt-3 text-2xl font-bold text-white">
              Your Progress
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Keep going — you're making progress! 🚀
            </p>

          </div>

          {/* Percentage */}

          <div className="text-right">

            <p className="text-3xl font-bold text-indigo-400">
              {safeProgress}%
            </p>

            <p className="text-xs text-slate-500">
              Completed
            </p>

          </div>

        </div>

        {/* =================================================
            PROGRESS BAR
        ================================================== */}

        <div className="mt-7">

          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700"
              style={{
                width: `${safeProgress}%`,
              }}
            />

          </div>

        </div>

        {/* =================================================
            STATS
        ================================================== */}

        <div className="mt-7 grid grid-cols-2 gap-6">

          {/* Completed */}

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">

            <p className="text-sm text-slate-400">
              Completed
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {completedTopics}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Milestones completed
            </p>

          </div>

          {/* Total */}

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">

            <p className="text-sm text-slate-400">
              Total Topics
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {totalTopics}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              AI-generated milestones
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProgressTracker;