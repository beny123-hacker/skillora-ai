import {
  FaArrowRight,
  FaFire,
  FaSearch,
  FaGlobe,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function LearnHero({
  search = "",
  setSearch,
  onSearch,
  onContinue,
  language = "English",
  setLanguage,
  loading = false,
}) {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    "Learner";

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !loading) {
      onSearch?.();
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 p-8 lg:p-10">

      {/* Background Blur */}

      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-300/10 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-2">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div>

          {/* Badge */}

          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-md">

            🔥 AI Personalized Learning

          </span>


          {/* Heading */}

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl">

            {greeting},

            <br />

            {firstName} 👋

          </h1>


          {/* Description */}

          <p className="mt-6 max-w-xl text-lg leading-8 text-indigo-100">

            Search for any course or technology and discover
            relevant YouTube learning resources in your
            preferred language.

          </p>


          {/* =================================================
              SEARCH BOX
          ================================================= */}

          <div className="mt-8 rounded-2xl bg-white p-3 shadow-xl">

            <div className="flex flex-col gap-3">

              {/* Search */}

              <div className="flex overflow-hidden rounded-xl border border-gray-200">

                <div className="flex items-center px-4 text-gray-400">

                  <FaSearch />

                </div>


                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch?.(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Search any course or technology..."
                  className="min-w-0 flex-1 px-3 py-4 text-gray-800 outline-none placeholder:text-gray-400"
                />


                <button
                  type="button"
                  onClick={onSearch}
                  disabled={loading}
                  className="bg-indigo-600 px-6 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? "Searching..." : "Search"}

                </button>

              </div>


              {/* =================================================
                  LANGUAGE SELECTOR
              ================================================= */}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">

                  <FaGlobe className="text-indigo-500" />

                  <div className="flex-1">

                    <p className="text-xs font-medium text-gray-400">

                      Learning Language

                    </p>


                    <select
                      value={language}
                      onChange={(event) =>
                        setLanguage?.(event.target.value)
                      }
                      className="w-full cursor-pointer bg-transparent text-sm font-semibold text-gray-800 outline-none"
                    >

                      <option value="English">
                        🇬🇧 English
                      </option>

                      <option value="Tamil">
                        🇮🇳 Tamil
                      </option>

                      <option value="Hindi">
                        🇮🇳 Hindi
                      </option>

                    </select>

                  </div>

                </div>


                {/* Search Button for mobile / extra visibility */}

                <button
                  type="button"
                  onClick={onSearch}
                  disabled={loading}
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:hidden"
                >

                  {loading
                    ? "Searching..."
                    : "Find Resources"}

                </button>

              </div>

            </div>

          </div>


          {/* =================================================
              QUICK SEARCHES
          ================================================= */}

          <div className="mt-5 flex flex-wrap items-center gap-2">

            <span className="text-sm text-indigo-100">
              Try:
            </span>

            {[
              "Python",
              "React",
              "Java",
              "Machine Learning",
              "Node.js",
            ].map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => {
                  setSearch?.(item);

                  /*
                   * Small timeout allows React to update
                   * the search state before triggering search.
                   */

                  setTimeout(() => {
                    onSearch?.();
                  }, 0);
                }}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
              >

                {item}

              </button>

            ))}

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              type="button"
              onClick={onContinue}
              disabled={loading}
              className="flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-semibold text-indigo-700 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >

              Continue Learning

              <FaArrowRight />

            </button>


            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("learning-categories")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="rounded-2xl border border-white px-7 py-4 text-white transition hover:bg-white hover:text-indigo-700"
            >

              Explore Categories

            </button>

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE — AI MISSION
        ================================================= */}

        <div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">

                Today's Learning

              </h2>

              <span className="rounded-full bg-green-400/20 px-3 py-1 text-xs font-semibold text-green-200">

                Active

              </span>

            </div>


            {/* Learning steps */}

            <div className="mt-8 space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-indigo-100">

                  Search a Course

                </span>

                <span className="text-green-300">

                  ✓

                </span>

              </div>


              <div className="flex items-center justify-between">

                <span className="text-indigo-100">

                  Watch YouTube Lessons

                </span>

                <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs text-black">

                  Current

                </span>

              </div>


              <div className="flex items-center justify-between">

                <span className="text-indigo-100">

                  Complete the Course

                </span>

                <span className="text-gray-300">

                  Pending

                </span>

              </div>

            </div>


            {/* Progress */}

            <div className="mt-10">

              <div className="mb-3 flex justify-between text-white">

                <span>
                  Course Progress
                </span>

                <span>
                  0%
                </span>

              </div>


              <div className="h-3 overflow-hidden rounded-full bg-white/20">

                <div
                  className="h-full rounded-full bg-green-400"
                  style={{
                    width: "0%",
                  }}
                />

              </div>

            </div>


            {/* Stats */}

            <div className="mt-10 grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-white/10 p-5">

                <h3 className="text-3xl font-bold text-white">

                  {youtubeText()}

                </h3>

                <p className="mt-2 text-indigo-100">

                  YouTube Resources

                </p>

              </div>


              <div className="rounded-2xl bg-white/10 p-5">

                <h3 className="flex items-center gap-2 text-3xl font-bold text-white">

                  7

                  <FaFire className="text-orange-400" />

                </h3>

                <p className="mt-2 text-indigo-100">

                  Day Streak

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


// ======================================================
// SMALL DISPLAY HELPER
// ======================================================

function youtubeText() {
  return "▶️";
}


export default LearnHero;