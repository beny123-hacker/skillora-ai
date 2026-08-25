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
  FaArrowRight,
  FaStar,
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

  const handleCategorySelect =
    (category) => {

      if (loading) return;

      setSelectedCategory(
        category.id
      );

      setSelectedRole("");

    };


  // =========================================================
  // ROLE SELECT
  // =========================================================

  const handleRoleSelect =
    (role) => {

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

    <section className="career-selector">


      {/* =====================================================
          CATEGORY SCREEN
      ===================================================== */}

      {!selectedCategory && (

        <div className="career-category-view">


          <div className="career-selector-heading">

            <div className="career-selector-label">

              <FaStar />

              CHOOSE YOUR PATH

            </div>


            <h2>
              What career do you want to build?
            </h2>


            <p>
              Select a career category first, then choose
              the specific role you want to pursue.
            </p>

          </div>


          <div className="career-category-grid">

            {careerCategories.map(
              (category) => (

                <button
                  key={category.id}

                  type="button"

                  onClick={() =>
                    handleCategorySelect(
                      category
                    )
                  }

                  disabled={loading}

                  className="career-category-card"
                >

                  <div
                    className={`career-category-icon bg-gradient-to-r ${category.color}`}
                  >

                    {category.icon}

                  </div>


                  <div className="career-category-content">

                    <h3>
                      {category.title}
                    </h3>

                    <p>
                      {category.description}
                    </p>

                  </div>


                  <div className="career-category-footer">

                    <span>
                      {category.roles.length} Roles
                    </span>

                    <FaArrowRight />

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

          <div className="career-role-view">


            <button
              type="button"

              onClick={
                handleBackToCategories
              }

              disabled={loading}

              className="career-back-button"
            >

              <FaArrowLeft />

              Back to Career Categories

            </button>


            {/* CATEGORY HEADER */}

            <div className="career-active-category">

              <div
                className={`career-active-icon bg-gradient-to-r ${activeCategory.color}`}
              >

                {activeCategory.icon}

              </div>


              <div>

                <span>
                  SELECTED CATEGORY
                </span>

                <h2>
                  {activeCategory.title}
                </h2>

                <p>
                  Choose the role you want Skillora AI
                  to build your roadmap for.
                </p>

              </div>


              <div className="career-active-count">

                <strong>
                  {activeCategory.roles.length}
                </strong>

                <span>
                  Available Roles
                </span>

              </div>

            </div>


            {/* ROLE HEADER */}

            <div className="career-role-heading">

              <div>

                <span>
                  STEP 02
                </span>

                <h3>
                  Choose Your Role
                </h3>

                <p>
                  Select one role to personalize your
                  learning roadmap.
                </p>

              </div>

            </div>


            {/* ROLES */}

            <div className="career-role-grid">

              {activeCategory.roles.map(
                (role, index) => {

                  const isSelected =
                    selectedRole === role;


                  return (

                    <button
                      key={role}

                      type="button"

                      onClick={() =>
                        handleRoleSelect(
                          role
                        )
                      }

                      disabled={loading}

                      className={`career-role-card ${
                        isSelected
                          ? "career-role-card-selected"
                          : ""
                      }`}
                    >

                      <div className="career-role-number">

                        {String(
                          index + 1
                        ).padStart(2, "0")}

                      </div>


                      <div className="career-role-content">

                        <h4>
                          {role}
                        </h4>

                        <p>
                          Personalized AI learning
                          roadmap
                        </p>

                      </div>


                      <div className="career-role-check">

                        {isSelected && (
                          <FaCheck />
                        )}

                      </div>

                    </button>

                  );

                }
              )}

            </div>


            {/* GENERATE */}

            <div className="career-generate-area">

              <div className="career-selected-role">

                <span>
                  SELECTED ROLE
                </span>

                <strong>
                  {selectedRole || "Choose a role to continue"}
                </strong>

              </div>


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

                className="career-generate-button"
              >

                {loading ? (

                  <>

                    <span className="career-button-spinner" />

                    Generating Roadmap...

                  </>

                ) : (

                  <>

                    <FaStar/>

                    Generate Roadmap

                    <FaArrowRight />

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