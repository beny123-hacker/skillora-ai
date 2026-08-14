import React, { useState } from "react";

import {
  FaLaptopCode,
  FaRobot,
  FaCloud,
  FaMobileAlt,
  FaShieldAlt,
  FaDatabase,
  FaPaintBrush,
  FaServer,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";

const careerCategories = [
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "Build modern frontend, backend and full-stack applications.",
    icon: <FaLaptopCode />,
    color: "from-blue-500 to-cyan-500",
    roles: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "MERN Stack Developer",
      "Java Full Stack Developer",
    ],
  },

  {
    id: "ai-ml",
    title: "AI / ML",
    description:
      "Build intelligent systems using artificial intelligence and machine learning.",
    icon: <FaRobot />,
    color: "from-purple-500 to-pink-500",
    roles: [
      "AI Engineer",
      "Machine Learning Engineer",
      "Deep Learning Engineer",
      "NLP Engineer",
      "Computer Vision Engineer",
      "Generative AI Engineer",
    ],
  },

  {
    id: "cloud",
    title: "Cloud Computing",
    description:
      "Design, deploy and manage scalable cloud-based applications.",
    icon: <FaCloud />,
    color: "from-sky-500 to-blue-500",
    roles: [
      "Cloud Engineer",
      "AWS Cloud Engineer",
      "Azure Cloud Engineer",
      "Cloud Architect",
      "Cloud Developer",
    ],
  },

  {
    id: "mobile",
    title: "Mobile Development",
    description:
      "Create modern Android, iOS and cross-platform applications.",
    icon: <FaMobileAlt />,
    color: "from-orange-500 to-red-500",
    roles: [
      "Android Developer",
      "iOS Developer",
      "Flutter Developer",
      "React Native Developer",
      "Mobile Application Developer",
    ],
  },

  {
    id: "cybersecurity",
    title: "Cyber Security",
    description:
      "Protect applications, systems and networks from cyber threats.",
    icon: <FaShieldAlt />,
    color: "from-red-500 to-rose-500",
    roles: [
      "Cyber Security Analyst",
      "Security Engineer",
      "Ethical Hacker",
      "Penetration Tester",
      "SOC Analyst",
    ],
  },

  {
    id: "data",
    title: "Data & Analytics",
    description:
      "Transform data into insights using statistics, programming and analytics.",
    icon: <FaDatabase />,
    color: "from-green-500 to-emerald-500",
    roles: [
      "Data Scientist",
      "Data Analyst",
      "Data Engineer",
      "Business Intelligence Analyst",
      "Machine Learning Data Scientist",
    ],
  },

  {
    id: "uiux",
    title: "UI / UX Design",
    description:
      "Design beautiful and user-friendly digital experiences.",
    icon: <FaPaintBrush />,
    color: "from-pink-500 to-fuchsia-500",
    roles: [
      "UI Designer",
      "UX Designer",
      "Product Designer",
      "UX Researcher",
      "Interaction Designer",
    ],
  },

  {
    id: "devops",
    title: "DevOps",
    description:
      "Automate development, deployment and infrastructure operations.",
    icon: <FaServer />,
    color: "from-indigo-500 to-violet-500",
    roles: [
      "DevOps Engineer",
      "DevSecOps Engineer",
      "Site Reliability Engineer",
      "Platform Engineer",
      "Cloud DevOps Engineer",
    ],
  },
];

function CareerSelector({
  onGenerateRoadmap,
  loading = false,
}) {
  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [selectedRole, setSelectedRole] =
    useState("");

  const activeCategory =
    careerCategories.find(
      (category) =>
        category.id === selectedCategory
    );

  // =========================================================
  // CATEGORY SELECT
  // =========================================================

  const handleCategorySelect = (
    category
  ) => {
    if (loading) return;

    setSelectedCategory(
      category.id
    );

    setSelectedRole("");
  };

  // =========================================================
  // ROLE SELECT
  // =========================================================

  const handleRoleSelect = (
    role
  ) => {
    if (loading) return;

    setSelectedRole(role);
  };

  // =========================================================
  // BACK
  // =========================================================

  const handleBackToCategories =
    () => {
      if (loading) return;

      setSelectedCategory(null);
      setSelectedRole("");
    };

  // =========================================================
  // GENERATE ROADMAP
  // =========================================================

  const handleGenerateRoadmap =
    () => {

      if (
        !activeCategory ||
        !selectedRole ||
        loading
      ) {
        return;
      }

      // =====================================================
      // DATA SENT TO ROADMAP.JSX
      // =====================================================

      const careerData = {
        category:
          activeCategory.title,

        categoryId:
          activeCategory.id,

        role:
          selectedRole,
      };

      console.log(
        "================================"
      );

      console.log(
        "Generate Roadmap clicked"
      );

      console.log(
        "Career Data:",
        careerData
      );

      console.log(
        "================================"
      );

      // =====================================================
      // CALL PARENT FUNCTION
      // =====================================================

      if (
        typeof onGenerateRoadmap ===
        "function"
      ) {

        onGenerateRoadmap(
          careerData
        );

      } else {

        console.error(
          "onGenerateRoadmap is not connected in Roadmap.jsx"
        );

      }
    };

  return (
    <section className="mt-12">

      {/* =====================================================
          CATEGORY SCREEN
      ===================================================== */}

      {!selectedCategory && (

        <div>

          <div className="mb-8">

            <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold tracking-wider text-indigo-300">

              🎯 CAREER ROADMAP

            </span>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">

              Choose Your Career Goal

            </h2>

            <p className="mt-2 max-w-3xl text-slate-400">

              Select a career category first.
              You can then choose the specific
              role you want to pursue.

            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {careerCategories.map(
              (category) => (

                <button
                  key={
                    category.id
                  }
                  type="button"
                  onClick={() =>
                    handleCategorySelect(
                      category
                    )
                  }
                  disabled={
                    loading
                  }
                  className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${category.color} text-3xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    {category.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white transition group-hover:text-indigo-400">

                    {category.title}

                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">

                    {category.description}

                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="rounded-full bg-slate-800 px-3 py-2 text-xs font-semibold text-indigo-300">

                      {category.roles.length} Roles

                    </span>

                    <span className="text-xl text-slate-500 transition group-hover:translate-x-1 group-hover:text-indigo-400">

                      →

                    </span>

                  </div>

                </button>

              )
            )}

          </div>

        </div>

      )}

      {/* =====================================================
          ROLE SCREEN
      ===================================================== */}

      {selectedCategory &&
        activeCategory && (

          <div>

            {/* BACK */}

            <button
              type="button"
              onClick={
                handleBackToCategories
              }
              disabled={
                loading
              }
              className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >

              <FaArrowLeft />

              Back to Career Categories

            </button>

            {/* CATEGORY HEADER */}

            <div className="mb-8 rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-6">

              <div className="flex items-center gap-5">

                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${activeCategory.color} text-3xl text-white shadow-lg`}
                >

                  {
                    activeCategory.icon
                  }

                </div>

                <div>

                  <p className="text-sm font-semibold text-indigo-300">

                    Career Category

                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">

                    {
                      activeCategory.title
                    }

                  </h2>

                  <p className="mt-1 text-sm text-slate-400">

                    Select one role below
                    to continue.

                  </p>

                </div>

              </div>

            </div>

            {/* ROLES */}

            <div className="mb-8">

              <h3 className="text-2xl font-bold text-white">

                Choose Your Role

              </h3>

              <p className="mt-2 text-slate-400">

                Select the career role you
                want Skillora AI to create
                your roadmap for.

              </p>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

              {activeCategory.roles.map(
                (role) => {

                  const isSelected =
                    selectedRole ===
                    role;

                  return (

                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        handleRoleSelect(
                          role
                        )
                      }
                      disabled={
                        loading
                      }
                      className={`relative rounded-2xl border p-6 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                          : "border-slate-800 bg-slate-900 hover:-translate-y-1 hover:border-indigo-500/50"
                      } disabled:cursor-not-allowed`}
                    >

                      {isSelected && (

                        <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-white">

                          <FaCheck className="text-xs" />

                        </div>

                      )}

                      <h4
                        className={`pr-10 text-lg font-bold ${
                          isSelected
                            ? "text-indigo-300"
                            : "text-white"
                        }`}
                      >

                        {role}

                      </h4>

                      <p className="mt-2 text-sm text-slate-500">

                        Personalized AI learning
                        roadmap

                      </p>

                    </button>

                  );
                }
              )}

            </div>

            {/* =================================================
                GENERATE BUTTON
            ================================================= */}

            <div className="mt-10 flex justify-center">

              <button
                type="button"
                onClick={
                  handleGenerateRoadmap
                }
                disabled={
                  !selectedRole ||
                  !activeCategory ||
                  loading
                }
                className={`flex min-w-[260px] items-center justify-center gap-3 rounded-2xl px-8 py-4 font-bold transition-all duration-300 ${
                  !selectedRole ||
                  !activeCategory ||
                  loading
                    ? "cursor-not-allowed bg-indigo-500/20 text-indigo-300/40"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-1 hover:from-indigo-400 hover:to-purple-500"
                }`}
              >

                {loading ? (

                  <>

                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Generating Roadmap...

                  </>

                ) : (

                  <>

                    Generate Roadmap

                    <span className="text-xl">
                      →
                    </span>

                  </>

                )}

              </button>

            </div>

          </div>

        )}

    </section>
  );
}

export default CareerSelector;