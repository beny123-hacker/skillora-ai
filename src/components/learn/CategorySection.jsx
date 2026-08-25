import {
  FaLaptopCode,
  FaServer,
  FaRobot,
  FaCloud,
  FaMobileAlt,
  FaShieldAlt,
  FaDatabase,
  FaCogs,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";


const categories = [
  {
    title: "Frontend",
    subtitle: "React • JavaScript • CSS",
    description:
      "Build modern and responsive user interfaces.",
    icon: <FaLaptopCode />,
    color: "blue",
  },

  {
    title: "Backend",
    subtitle: "Node • Java • APIs",
    description:
      "Create powerful servers and scalable applications.",
    icon: <FaServer />,
    color: "green",
  },

  {
    title: "AI / ML",
    subtitle: "Python • ML • Deep Learning",
    description:
      "Explore artificial intelligence and machine learning.",
    icon: <FaRobot />,
    color: "purple",
  },

  {
    title: "Cloud",
    subtitle: "AWS • Azure • GCP",
    description:
      "Learn cloud infrastructure and deployment.",
    icon: <FaCloud />,
    color: "sky",
  },

  {
    title: "Mobile",
    subtitle: "Flutter • React Native",
    description:
      "Build modern applications for mobile devices.",
    icon: <FaMobileAlt />,
    color: "orange",
  },

  {
    title: "Cyber Security",
    subtitle: "Security • Ethical Hacking",
    description:
      "Understand security, networks, and protection.",
    icon: <FaShieldAlt />,
    color: "red",
  },

  {
    title: "Data Science",
    subtitle: "Python • Pandas • SQL",
    description:
      "Transform data into meaningful insights.",
    icon: <FaDatabase />,
    color: "yellow",
  },

  {
    title: "DevOps",
    subtitle: "Git • Docker • Kubernetes",
    description:
      "Learn automation, deployment, and infrastructure.",
    icon: <FaCogs />,
    color: "indigo",
  },
];


function CategorySection({
  selectedCategory,
  onSelectCategory,
}) {

  return (

    <section
      id="learning-categories"
      className="learn-categories-section"
    >

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="categories-header">

        <div>

          <div className="categories-eyebrow">

            <span className="categories-dot" />

            EXPLORE SKILLS

          </div>


          <h2>
            Find your next
            <span> learning path.</span>
          </h2>


          <p>
            Choose a category and discover curated learning
            resources to help you build real-world skills.
          </p>

        </div>


        {selectedCategory && (

          <button
            type="button"
            onClick={() =>
              onSelectCategory?.(null)
            }
            className="clear-category-button"
          >

            <FaCheck />

            Showing {selectedCategory}

          </button>

        )}

      </div>


      {/* =====================================================
          CATEGORY GRID
      ===================================================== */}

      <div className="premium-category-grid">

        {categories.map((category) => {

          const active =
            selectedCategory === category.title;


          return (

            <button
              key={category.title}
              type="button"

              onClick={() =>
                onSelectCategory?.(
                  active
                    ? null
                    : category.title
                )
              }

              className={`
                premium-category-card
                category-${category.color}
                ${active ? "category-active" : ""}
              `}
            >

              {/* CARD TOP */}

              <div className="category-card-top">

                <div className="category-icon-wrapper">

                  {category.icon}

                </div>


                <div className="category-arrow">

                  <FaArrowRight />

                </div>

              </div>


              {/* CONTENT */}

              <div className="category-content">

                <h3>
                  {category.title}
                </h3>


                <p className="category-subtitle">
                  {category.subtitle}
                </p>


                <p className="category-description">
                  {category.description}
                </p>

              </div>


              {/* FOOTER */}

              <div className="category-card-footer">

                <span>

                  {active
                    ? "Viewing courses"
                    : "Explore courses"}

                </span>


                <FaArrowRight />

              </div>


              {/* ACTIVE INDICATOR */}

              {active && (

                <div className="category-selected">

                  <FaCheck />

                  Selected

                </div>

              )}

            </button>

          );

        })}

      </div>

    </section>

  );
}


export default CategorySection;