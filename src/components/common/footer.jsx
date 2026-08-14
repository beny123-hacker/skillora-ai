import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="mt-10 bg-slate-900 border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-bold text-white">
            Skillora AI
          </h2>

          <p className="text-slate-400 mt-2">
            Learn Smarter. Grow Faster.
          </p>

          <p className="text-slate-500 text-sm mt-3">
            Version 1.0.0
          </p>

        </div>

        {/* Center */}

        <div className="flex gap-8 text-slate-400">

          <button className="hover:text-white transition">
            Dashboard
          </button>

          <button className="hover:text-white transition">
            Learn
          </button>

          <button className="hover:text-white transition">
            Roadmaps
          </button>

          <button className="hover:text-white transition">
            AI Coach
          </button>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-indigo-600 transition flex items-center justify-center text-white">

            <FaGithub />

          </button>

          <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center text-white">

            <FaLinkedin />

          </button>

          <button className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-pink-600 transition flex items-center justify-center text-white">

            <FaInstagram />

          </button>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800 py-5">

        <p className="text-center text-slate-500 text-sm flex justify-center items-center gap-2">

          Built with

          <FaHeart className="text-red-500" />

          for students by Skillora AI

        </p>

      </div>

    </footer>
  );
}

export default Footer;