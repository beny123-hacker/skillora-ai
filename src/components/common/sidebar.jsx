import {
  FaHome,
  FaBook,
  FaMapMarkedAlt,
  FaStickyNote,
  FaQuestionCircle,
  FaRobot,
  FaUser,
  FaCog,
  FaFire,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    name: "Learn",
    icon: <FaBook />,
    path: "/learn",
  },
  {
    name: "Roadmaps",
    icon: <FaMapMarkedAlt />,
    path: "/roadmap",
  },
  {
    name: "Notes",
    icon: <FaStickyNote />,
    path: "/notes",
  },
  {
    name: "Quiz",
    icon: <FaQuestionCircle />,
    path: "/quiz",
  },
  {
    name: "AI Coach",
    icon: <FaRobot />,
    path: "/assistant",
  },
  {
    name: "Profile",
    icon: <FaUser />,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/settings",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      z-50
      flex
      h-screen
      w-72
      flex-col
      border-r
      border-white/10
      bg-[#0A0F1D]/95
      backdrop-blur-2xl
      shadow-[0_0_50px_rgba(0,0,0,0.4)]
    "
    >
      {/* ================= LOGO ================= */}

      <div className="border-b border-white/10 px-8 py-8">

        <div className="flex items-center gap-4">

          <div className="relative">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-xl">

              🤖

            </div>

            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#0A0F1D] bg-green-400"></span>

          </div>

          <div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white">

              Skillora
              <span className="text-indigo-400">AI</span>

            </h1>

            <p className="mt-1 text-sm text-slate-400">

              AI Learning Platform

            </p>

          </div>

        </div>

      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="flex-1 overflow-y-auto px-5 py-6">

        <p className="mb-5 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

          Navigation

        </p>

        <div className="space-y-3">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                group
                relative
                flex
                items-center
                gap-4
                rounded-2xl
                px-5
                py-4
                text-sm
                font-medium
                transition-all
                duration-300
                overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 scale-[1.02]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
                }
                `
              }
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg transition-all duration-300 group-hover:bg-indigo-500/20">

                {item.icon}

              </span>

              <span className="flex-1">

                {item.name}

              </span>

            </NavLink>

          ))}

        </div>

      </nav>

      {/* ================= STREAK ================= */}

      

      {/* ================= LOGOUT ================= */}

      <div className="border-t border-white/10 px-5 py-5">

        <button
          onClick={handleLogout}
          className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/10
          px-5
          py-3.5
          text-sm
          font-semibold
          text-red-400
          transition-all
          duration-300
          hover:bg-red-500
          hover:text-white
          hover:shadow-xl
          hover:shadow-red-500/30
          hover:scale-[1.02]
        "
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;