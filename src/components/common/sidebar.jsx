import {
  FaHome,
  FaBook,
  FaMapMarkedAlt,
  FaStickyNote,
  FaQuestionCircle,
  FaRobot,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";


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

      navigate("/login", {
        replace: true,
      });

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
        w-[300px]
        flex-col

        border-r
        border-white/[0.07]

        bg-[#080C19]/98

        backdrop-blur-2xl

        shadow-[20px_0_60px_rgba(0,0,0,0.22)]
      "
    >

      {/* =====================================================
          LOGO
          ===================================================== */}

      <div
        className="
          flex
          min-h-[112px]
          items-center

          border-b
          border-white/[0.07]

          px-7
        "
      >

        <div className="flex items-center gap-4">

          {/* LOGO ICON */}

          <div className="relative shrink-0">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-2xl

                bg-gradient-to-br
                from-indigo-500
                via-purple-500
                to-pink-500

                text-2xl

                shadow-[0_12px_35px_rgba(99,102,241,0.35)]
              "
            >
              🤖
            </div>

            {/* ONLINE STATUS */}

            <span
              className="
                absolute
                -bottom-1
                -right-1

                h-4
                w-4

                rounded-full

                border-[3px]
                border-[#080C19]

                bg-emerald-400

                shadow-[0_0_12px_rgba(52,211,153,0.7)]
              "
            />

          </div>


          {/* BRAND */}

          <div>

            <h1
              className="
                text-[25px]
                font-black
                tracking-tight
                text-white
              "
            >
              Skillora
              <span
                className="
                  bg-gradient-to-r
                  from-cyan-400
                  via-indigo-400
                  to-purple-400

                  bg-clip-text
                  text-transparent
                "
              >
                AI
              </span>
            </h1>

            <p
              className="
                mt-1
                text-[11px]
                font-medium
                tracking-wide
                text-slate-500
              "
            >
              AI Learning Platform
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto

          px-5
          py-7
        "
      >

        <p
          className="
            mb-5
            px-3

            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]

            text-slate-600
          "
        >
          Navigation
        </p>


        <div className="space-y-2.5">

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

                  px-3
                  py-3.5

                  text-sm
                  font-semibold

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-indigo-600
                        via-purple-600
                        to-purple-500

                        text-white

                        shadow-[0_10px_30px_rgba(99,102,241,0.28)]
                      `
                      : `
                        text-slate-400

                        hover:bg-white/[0.045]
                        hover:text-white
                      `
                  }
                `
              }
            >

              {/* ICON */}

              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0

                  items-center
                  justify-center

                  rounded-xl

                  bg-white/[0.045]

                  text-[16px]

                  transition-all
                  duration-300

                  group-hover:bg-indigo-500/15
                  group-hover:text-indigo-300
                "
              >
                {item.icon}
              </span>


              {/* NAME */}

              <span className="flex-1">
                {item.name}
              </span>


              {/* ACTIVE INDICATOR */}

              <span
                className="
                  h-1.5
                  w-1.5

                  rounded-full

                  bg-white/0

                  transition-all
                  duration-300

                  group-hover:bg-indigo-300
                "
              />

            </NavLink>

          ))}

        </div>

      </nav>


      {/* =====================================================
          LOGOUT
          ===================================================== */}

      <div
        className="
          border-t
          border-white/[0.07]

          px-5
          py-5
        "
      >

        <button
          onClick={handleLogout}

          className="
            group

            flex
            w-full
            items-center
            justify-center
            gap-3

            rounded-2xl

            border
            border-red-500/10

            bg-red-500/[0.05]

            px-5
            py-3.5

            text-sm
            font-semibold

            text-red-400

            transition-all
            duration-300

            hover:border-red-500/20
            hover:bg-red-500/10
            hover:text-red-300
          "
        >

          <FaSignOutAlt
            className="
              transition-transform
              duration-300

              group-hover:-translate-x-1
            "
          />

          Logout

        </button>

      </div>

    </aside>

  );

}


export default Sidebar;