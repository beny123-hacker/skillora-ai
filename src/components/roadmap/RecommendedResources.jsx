import {
  FaYoutube,
  FaBookOpen,
  FaLaptopCode,
  FaExternalLinkAlt,
  FaRobot,
  FaGraduationCap,
} from "react-icons/fa";

function RecommendedResources({
  roadmapData = null,
}) {
  const resources = Array.isArray(roadmapData?.resources)
    ? roadmapData.resources
    : [];

  const aiSuggestion =
    roadmapData?.ai_suggestion ||
    roadmapData?.aiSuggestion ||
    "Keep learning consistently and practice each milestone with real-world projects.";

  return (
    <section className="mt-14">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-8">

        <span className="inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-semibold tracking-wide text-purple-300">
          AI CURATED
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white">
          📚 Recommended Resources
        </h2>

        <p className="mt-2 text-slate-400">
          Carefully selected resources based on your AI-generated roadmap.
        </p>

      </div>

      {/* =====================================================
          RESOURCES
      ====================================================== */}

      {resources.length > 0 ? (

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {resources.map((resource, index) => {

            const type =
              resource?.type || "Learning Resource";

            const title =
              resource?.title ||
              `Recommended Resource ${index + 1}`;

            const url =
              resource?.url || "#";

            const lowerType =
              String(type).toLowerCase();

            let Icon = FaBookOpen;
            let color =
              "from-sky-500 to-cyan-500";

            if (
              lowerType.includes("youtube") ||
              lowerType.includes("video")
            ) {
              Icon = FaYoutube;
              color =
                "from-red-500 to-red-700";
            } else if (
              lowerType.includes("course")
            ) {
              Icon = FaGraduationCap;
              color =
                "from-purple-500 to-pink-500";
            } else if (
              lowerType.includes("coding") ||
              lowerType.includes("practice")
            ) {
              Icon = FaLaptopCode;
              color =
                "from-yellow-500 to-orange-500";
            } else if (
              lowerType.includes("documentation") ||
              lowerType.includes("docs")
            ) {
              Icon = FaBookOpen;
              color =
                "from-sky-500 to-cyan-500";
            }

            return (

              <div
                key={`${title}-${index}`}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/5"
              >

                {/* Icon */}

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${color} text-3xl text-white shadow-lg`}
                >
                  <Icon />
                </div>

                {/* Title */}

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {title}
                </h3>

                {/* Type */}

                <p className="mt-3 text-slate-400">
                  {type}
                </p>

                {/* Button */}

                {url && url !== "#" ? (

                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700"
                  >
                    Open Resource

                    <FaExternalLinkAlt />

                  </a>

                ) : (

                  <button
                    type="button"
                    disabled
                    className="mt-8 inline-flex cursor-not-allowed items-center gap-3 rounded-2xl bg-slate-700 px-6 py-3 font-semibold text-slate-400"
                  >
                    Resource Link Unavailable
                  </button>

                )}

              </div>

            );
          })}

        </div>

      ) : (

        /* =====================================================
            EMPTY STATE
        ====================================================== */

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10 text-4xl">
            📚
          </div>

          <h3 className="mt-6 text-2xl font-bold text-white">
            No Resources Yet
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Generate your roadmap to receive AI-recommended learning
            resources.
          </p>

        </div>

      )}

      {/* =====================================================
          AI SUGGESTION
      ====================================================== */}

      <div className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">

        <div className="flex flex-col gap-5 md:flex-row md:items-center">

          <FaRobot className="shrink-0 text-5xl text-white" />

          <div>

            <h3 className="text-2xl font-bold text-white">
              Skillora AI Suggestion
            </h3>

            <p className="mt-2 leading-7 text-indigo-100">
              {aiSuggestion}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RecommendedResources;