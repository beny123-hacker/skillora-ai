function PracticeProblems() {
  const practicePlatforms = [
    {
      title: "LeetCode",
      description:
        "Practice coding problems, algorithms, data structures, and technical interview questions.",
      category: "Coding",
      url: "https://leetcode.com/",
      icon: "💻",
    },
    {
      title: "HackerRank",
      description:
        "Improve your programming skills with coding challenges and technical assessments.",
      category: "Coding",
      url: "https://www.hackerrank.com/",
      icon: "🏆",
    },
    {
      title: "GeeksforGeeks",
      description:
        "Practice data structures, algorithms, programming, and computer science problems.",
      category: "DSA",
      url: "https://www.geeksforgeeks.org/",
      icon: "🧠",
    },
    {
      title: "CodeChef",
      description:
        "Solve programming problems and participate in competitive programming contests.",
      category: "Competitive",
      url: "https://www.codechef.com/",
      icon: "👨‍💻",
    },
    {
      title: "Codeforces",
      description:
        "Practice competitive programming problems and participate in coding contests.",
      category: "Competitive",
      url: "https://codeforces.com/",
      icon: "⚡",
    },
  ];

  return (
    <section className="w-full">
      <div className="mb-6">
        <span className="text-xs font-semibold tracking-widest text-emerald-400">
          PRACTICE & IMPROVE
        </span>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Practice Problems 🧩
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Strengthen your programming skills by solving problems on popular
          coding platforms.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {practicePlatforms.map((platform) => (
          <a
            key={platform.title}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                {platform.icon}
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                {platform.category}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-bold text-white group-hover:text-emerald-300">
              {platform.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {platform.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                External Practice
              </span>

              <span className="font-semibold text-emerald-400">
                Start Practice →
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Skillora AI Quiz - Switch 2 will be connected here later */}
      <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest text-indigo-400">
              SKILLORA AI
            </span>

            <h3 className="mt-2 text-lg font-bold text-white">
              AI Quiz Practice 🤖
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Test your knowledge with AI-generated questions based on your
              selected skill.
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Start AI Quiz →
          </button>
        </div>
      </div>
    </section>
  );
}

export default PracticeProblems;