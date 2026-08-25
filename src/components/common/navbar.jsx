import {
  FaBell,
  FaMoon,
  FaSun,
  FaChevronDown,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(true);

  /* ================= THEME ================= */

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

  /* ================= PAGE TITLE ================= */

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

  /* ================= USER ================= */

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "Learner";

  const firstName = fullName.split(" ")[0];

  const avatar =
    user?.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=6366f1&color=fff&bold=true`;

  /* ================= DATE ================= */

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
        h-[88px]
        border-b
        border-white/[0.06]
        bg-[#070B18]/95
        backdrop-blur-2xl
      "
    >
      <div className="flex h-full items-center justify-between px-8">

        {/* =====================================================
            LEFT — PAGE INFORMATION
        ===================================================== */}

        <div className="flex items-center gap-5">

          {/* Small accent indicator */}

          <div
            className="
              h-10
              w-1
              rounded-full
              bg-gradient-to-b
              from-indigo-400
              via-purple-500
              to-cyan-400
            "
          />

          <div>
            <h1
              className="
                text-xl
                font-bold
                tracking-tight
                text-white
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-0.5
                text-xs
                font-medium
                text-slate-500
              "
            >
              {today}
            </p>
          </div>

        </div>


        {/* =====================================================
            RIGHT — ACTIONS + PROFILE
        ===================================================== */}

        <div className="flex items-center gap-3">

          {/* ================= THEME BUTTON ================= */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.03]
              text-slate-400
              transition-all
              duration-300
              hover:border-indigo-500/30
              hover:bg-indigo-500/10
              hover:text-white
            "
          >
            {darkMode ? (
              <FaSun
                className="
                  text-sm
                  text-yellow-400
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              />
            ) : (
              <FaMoon
                className="
                  text-sm
                  text-indigo-300
                  transition-transform
                  duration-300
                  group-hover:-rotate-12
                "
              />
            )}
          </button>


          {/* ================= NOTIFICATIONS ================= */}

          <button
            type="button"
            aria-label="Notifications"
            className="
              group
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.03]
              text-slate-400
              transition-all
              duration-300
              hover:border-indigo-500/30
              hover:bg-indigo-500/10
              hover:text-white
            "
          >
            <FaBell
              className="
                text-sm
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            {/* Notification dot */}

            <span
              className="
                absolute
                right-2.5
                top-2.5
                h-2
                w-2
                rounded-full
                bg-red-500
                ring-2
                ring-[#070B18]
              "
            />
          </button>


          {/* ================= PROFILE ================= */}

          <div
            className="
              ml-2
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              px-3
              py-2
              transition-all
              duration-300
              hover:border-white/[0.12]
              hover:bg-white/[0.05]
            "
          >

            {/* Avatar */}

            <div className="relative">

              <img
                src={avatar}
                alt={fullName}
                className="
                  h-10
                  w-10
                  rounded-xl
                  border
                  border-indigo-400/40
                  object-cover
                  shadow-lg
                  shadow-indigo-500/10
                "
              />

              {/* Online indicator */}

              <span
                className="
                  absolute
                  -bottom-0.5
                  -right-0.5
                  h-3
                  w-3
                  rounded-full
                  border-2
                  border-[#070B18]
                  bg-emerald-400
                "
              />

            </div>


            {/* Name */}

            <div className="hidden min-w-0 sm:block">

              <p
                className="
                  max-w-[120px]
                  truncate
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {firstName}
              </p>

              <p
                className="
                  text-[11px]
                  font-medium
                  text-emerald-400
                "
              >
                Active Learner
              </p>

            </div>


            {/* Dropdown icon */}

            <FaChevronDown
              className="
                ml-1
                text-[10px]
                text-slate-500
              "
            />

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;