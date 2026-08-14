import {
  FaRoad,
  FaRobot,
  FaBullseye,
} from "react-icons/fa";

function RoadmapHero({
  selectedCareer = "",
  roadmapData = null,
}) {
  const progress = Number(
    roadmapData?.progress ?? 0
  );

  const milestones =
    roadmapData?.milestones?.length ??
    roadmapData?.steps?.length ??
    0;

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10">

      {/* Background Effects */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-2">

        {/* =====================================================
            LEFT
        ====================================================== */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-white">

            <FaRobot />

            AI Career Roadmap

          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-white">

            Build Your Dream Career
            <br />

            Step by Step

          </h1>

          <p className="mt-6 text-lg leading-8 text-blue-100">

            Skillora AI creates a personalized roadmap based on
            your career goal, current skills and learning pace.

          </p>

          {/* No Generate Roadmap button here */}

        </div>

        {/* =====================================================
            RIGHT
        ====================================================== */}

        <div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-white">

                <FaRoad />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">

                  Current Goal

                </h2>

                <p className="text-blue-100">

                  {selectedCareer ||
                    "Select a career role below"}

                </p>

              </div>

            </div>

            {/* Progress */}

            <div className="mt-8 space-y-5">

              <div className="flex justify-between">

                <span className="text-blue-100">

                  Progress

                </span>

                <span className="text-green-300">

                  {progress}%

                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/20">

                <div
                  className="h-full rounded-full bg-green-400 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

            {/* Stats */}

            <div className="mt-8 grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-white/10 p-5">

                <FaBullseye className="text-2xl text-yellow-400" />

                <h3 className="mt-4 text-3xl font-bold text-white">

                  {milestones}

                </h3>

                <p className="text-blue-100">

                  Milestones

                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5">

                <FaRobot className="text-2xl text-pink-400" />

                <h3 className="mt-4 text-3xl font-bold text-white">

                  AI

                </h3>

                <p className="text-blue-100">

                  Personalized

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RoadmapHero;