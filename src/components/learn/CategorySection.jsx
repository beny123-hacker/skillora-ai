import {
  FaLaptopCode,
  FaServer,
  FaRobot,
  FaCloud,
  FaMobileAlt,
  FaShieldAlt,
  FaDatabase,
  FaCogs,
} from "react-icons/fa";

const categories = [
  {
    title: "Frontend",
    subtitle: "React • JavaScript • CSS",
    icon: <FaLaptopCode />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend",
    subtitle: "Node • Java • APIs",
    icon: <FaServer />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "AI / ML",
    subtitle: "Python • ML • Deep Learning",
    icon: <FaRobot />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Cloud",
    subtitle: "AWS • Azure • GCP",
    icon: <FaCloud />,
    color: "from-sky-500 to-indigo-500",
  },
  {
    title: "Mobile",
    subtitle: "Flutter • React Native",
    icon: <FaMobileAlt />,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Cyber Security",
    subtitle: "Security • Ethical Hacking",
    icon: <FaShieldAlt />,
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Data Science",
    subtitle: "Python • Pandas • SQL",
    icon: <FaDatabase />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "DevOps",
    subtitle: "Git • Docker • Kubernetes",
    icon: <FaCogs />,
    color: "from-indigo-500 to-violet-500",
  },
];

function CategorySection({
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section>

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Explore Categories
        </h2>

        <p className="mt-2 text-slate-400">
          Choose a category to discover courses and start learning.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {categories.map((category) => {

          const active =
            selectedCategory === category.title;

          return (
            <button
              key={category.title}
              type="button"
              onClick={() =>
                onSelectCategory?.(category.title)
              }
              className={`group rounded-3xl border p-6 text-left transition-all duration-300 ${
                active
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-800 bg-slate-900 hover:-translate-y-2 hover:border-indigo-500"
              }`}
            >

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${category.color} text-3xl text-white shadow-lg`}
              >
                {category.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-indigo-400">
                {category.title}
              </h3>

              <p className="mt-2 text-slate-400">
                {category.subtitle}
              </p>

              <div className="mt-6 h-1 overflow-hidden rounded-full bg-slate-800">

                <div
                  className={`h-full bg-gradient-to-r ${category.color} transition-all duration-500 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />

              </div>

            </button>
          );
        })}

      </div>

    </section>
  );
}

export default CategorySection;