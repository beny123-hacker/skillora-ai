import {
  FaStickyNote,
  FaPlus,
  FaRobot,
} from "react-icons/fa";

function EmptyNotes({
  onNewNote,
  onGenerateAI,
}) {
  return (
    <section className="flex justify-center items-center py-24">

      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-[32px] p-12 text-center">

        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-5xl text-white shadow-xl">
          <FaStickyNote />
        </div>

        {/* Title */}
        <h2 className="mt-8 text-4xl font-bold text-white">
          No Notes Yet
        </h2>

        {/* Description */}
        <p className="mt-5 text-slate-400 leading-8">
          Start creating your own study notes or let Skillora AI
          generate professional notes for any topic in seconds.
        </p>

        {/* Tips */}
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 text-left">

          <h3 className="text-lg font-semibold text-white">
            💡 Getting Started
          </h3>

          <ul className="mt-4 space-y-3 text-slate-300">
            <li>✅ Create your own study notes</li>
            <li>🤖 Generate notes using AI</li>
            <li>📂 Organize notes into categories</li>
            <li>⭐ Mark important notes as favorites</li>
            <li>📚 Revise anytime from any device</li>
          </ul>

        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <button
            type="button"
            onClick={onNewNote}
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 rounded-2xl font-semibold transition"
          >
            <FaPlus />
            Create Note
          </button>

          <button
            type="button"
            onClick={onGenerateAI}
            className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-7 py-4 rounded-2xl font-semibold transition"
          >
            <FaRobot />
            Generate AI Notes
          </button>

        </div>

      </div>

    </section>
  );
}

export default EmptyNotes;