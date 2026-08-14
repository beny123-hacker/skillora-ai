import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaCalendarAlt,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem("skillora-theme");

    if (savedMode === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;

    setDarkMode(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("skillora-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("skillora-theme", "light");
    }
  };

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/learn": "Learn",
    "/roadmap": "Roadmaps",
    "/notes": "Notes",
    "/quiz": "Quiz",
    "/assistant": "AI Coach",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "Learner";

  const avatar =
    user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=6366f1&color=fff`;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header
      className="
      sticky
      top-0
      z-40
      backdrop-blur-xl
      bg-[#070B18]/80
      border-b
      border-white/5
    "
    >
      <div className="flex items-center justify-between px-8 py-5">

        {/* LEFT */}

        <div>

          <h1 className="text-3xl font-black text-white">
            {title}
          </h1>

          <div className="mt-2 flex items-center gap-3 text-slate-400">

            <FaCalendarAlt className="text-indigo-400" />

            <span>{today}</span>

          </div>

        </div>

        {/* CENTER */}

        <div className="hidden xl:flex w-[420px]">

          <div
            className="
            flex
            items-center
            gap-4
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-3
          "
          >
            <FaSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search courses, roadmap, notes..."
              className="
              w-full
              bg-transparent
              outline-none
              text-white
              placeholder:text-slate-500
            "
            />

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <button
            onClick={toggleTheme}
            className="
            h-12
            w-12
            rounded-2xl
            bg-white/5
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:bg-indigo-500
            transition
            "
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-white" />
            )}
          </button>

          <button
            className="
            relative
            h-12
            w-12
            rounded-2xl
            bg-white/5
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:bg-indigo-500
            transition
            "
          >
            <FaBell className="text-white" />

            <span
              className="
              absolute
              top-3
              right-3
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
            />
          </button>

          {/* Profile */}

          <div
            className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            "
          >
            <img
              src={avatar}
              alt={fullName}
              className="
              h-12
              w-12
              rounded-full
              border-2
              border-indigo-500
              object-cover
              "
            />

            <div className="hidden lg:block">

              <p className="font-bold text-white">
                {fullName}
              </p>

              <p className="text-sm text-slate-400">
                {user?.email}
              </p>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;