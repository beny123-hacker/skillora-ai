import {
  FaRobot,
  FaSearch,
} from "react-icons/fa";

function NotesHero({
  search,
  setSearch,
  onGenerateAI,
}) {
  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">

      <div className="p-8">

        {/* =========================
            TOP LABEL
        ========================= */}

        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-indigo-100">
          <FaRobot />
          AI Powered Notes
        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Organize Your
              <br />
              Learning Notes
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">
              Search your notes easily or let Skillora AI
              generate complete study notes for any topic.
            </p>

            {/* ONLY AI BUTTON */}

            <button
              type="button"
              onClick={onGenerateAI}
              className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              <FaRobot />
              Generate AI Notes
            </button>

          </div>

          {/* RIGHT */}

          <div>

            {/* SEARCH */}

            <div className="relative">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search notes..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-12 pr-5 text-white outline-none placeholder:text-white/60 focus:border-white/50"
              />

            </div>

            {/* STATS */}

            <div className="mt-4 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-5">

                <p className="text-3xl font-bold text-white">
                  48
                </p>

                <p className="mt-1 text-indigo-100">
                  Total Notes
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5">

                <p className="text-3xl font-bold text-white">
                  15
                </p>

                <p className="mt-1 text-indigo-100">
                  Favorites
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5">

                <p className="text-3xl font-bold text-white">
                  20
                </p>

                <p className="mt-1 text-indigo-100">
                  AI Notes
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-5">

                <p className="text-3xl font-bold text-white">
                  6
                </p>

                <p className="mt-1 text-indigo-100">
                  Categories
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default NotesHero;