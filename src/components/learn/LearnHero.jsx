import {
  FaArrowRight,
  FaFire,
  FaSearch,
  FaGlobe,
  FaPlay,
  FaBrain,
  FaLayerGroup,
} from "react-icons/fa";

import { useAuth } from "../../context/Authcontext";

function LearnHero({
  search = "",
  setSearch,
  onSearch,
  onContinue,
  language = "English",
  setLanguage,
  loading = false,
}) {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.user_metadata?.name?.split(" ")[0] ||
    "Learner";

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !loading) {
      event.preventDefault();
      onSearch?.();
    }
  };

  const quickSearches = [
    "Python",
    "React",
    "Java",
    "Machine Learning",
    "Node.js",
  ];

  return (
    <section className="learn-premium-hero">

      {/* Decorative background effects */}

      <div className="learn-hero-glow learn-hero-glow-one" />
      <div className="learn-hero-glow learn-hero-glow-two" />

      <div className="learn-hero-content">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="learn-hero-left">

          <div className="learn-hero-badge">
            <span className="learn-badge-dot" />
            AI PERSONALIZED LEARNING
          </div>


          <h1 className="learn-hero-title">
            {greeting},
            <br />

            <span>{firstName}</span>

            <span className="learn-wave">
              👋
            </span>
          </h1>


          <p className="learn-hero-description">
            Discover courses, explore new technologies, and build
            skills with personalized learning resources designed
            around your interests.
          </p>


          {/* =====================================================
              SEARCH AREA
          ===================================================== */}

          <div className="learn-search-container">

            <div className="learn-search-row">

              <div className="learn-search-icon">
                <FaSearch />
              </div>


              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch?.(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="What do you want to learn today?"
                className="learn-search-input"
              />


              <button
                type="button"
                onClick={onSearch}
                disabled={loading}
                className="learn-search-button"
              >
                {loading ? (
                  "Searching..."
                ) : (
                  <>
                    Search
                    <FaArrowRight />
                  </>
                )}
              </button>

            </div>


            <div className="learn-search-bottom">

              {/* LANGUAGE */}

              <div className="learn-language-select">

                <FaGlobe />

                <div>

                  <span>
                    Learning Language
                  </span>

                  <select
                    value={language}
                    onChange={(event) =>
                      setLanguage?.(
                        event.target.value
                      )
                    }
                  >
                    <option value="English">
                      English
                    </option>

                    <option value="Tamil">
                      Tamil
                    </option>

                    <option value="Hindi">
                      Hindi
                    </option>
                  </select>

                </div>

              </div>


              <div className="learn-search-hint">
                Press Enter to search
              </div>

            </div>

          </div>


          {/* =====================================================
              QUICK SEARCHES
          ===================================================== */}

          <div className="learn-quick-searches">

            <span className="quick-search-label">
              Popular:
            </span>


            {quickSearches.map((item) => (

              <button
                key={item}
                type="button"
                onClick={() => {
                  setSearch?.(item);

                  setTimeout(() => {
                    onSearch?.();
                  }, 0);
                }}
                className="quick-search-chip"
              >
                {item}
              </button>

            ))}

          </div>


          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="learn-hero-actions">

            <button
              type="button"
              onClick={onContinue}
              disabled={loading}
              className="learn-primary-action"
            >

              <FaPlay />

              Continue Learning

              <FaArrowRight />

            </button>


            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("learning-categories")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="learn-secondary-action"
            >
              Explore Categories
            </button>

          </div>

        </div>


        {/* =====================================================
            RIGHT SIDE — LEARNING INSIGHT CARD
        ===================================================== */}

        <div className="learn-hero-right">

          <div className="learn-insight-card">

            <div className="insight-card-header">

              <div>

                <span className="insight-label">
                  YOUR LEARNING SPACE
                </span>

                <h2>
                  Learn smarter.
                  <br />
                  Grow faster.
                </h2>

              </div>


              <div className="insight-ai-icon">
                <FaBrain />
              </div>

            </div>


            <p className="insight-description">
              Search for any technology and instantly discover
              learning resources based on your preferred language
              and interests.
            </p>


            {/* LEARNING FEATURES */}

            <div className="learning-feature-list">

              <div className="learning-feature">

                <div className="feature-icon feature-icon-purple">
                  <FaSearch />
                </div>

                <div>
                  <h3>
                    Discover Resources
                  </h3>

                  <p>
                    Find courses for any skill.
                  </p>
                </div>

              </div>


              <div className="learning-feature">

                <div className="feature-icon feature-icon-blue">
                  <FaLayerGroup />
                </div>

                <div>
                  <h3>
                    Explore Categories
                  </h3>

                  <p>
                    Browse structured learning paths.
                  </p>
                </div>

              </div>


              <div className="learning-feature">

                <div className="feature-icon feature-icon-orange">
                  <FaFire />
                </div>

                <div>
                  <h3>
                    Build Consistency
                  </h3>

                  <p>
                    Keep learning and growing every day.
                  </p>
                </div>

              </div>

            </div>


            {/* BOTTOM STATUS */}

            <div className="learning-status">

              <div className="learning-status-left">

                <span className="status-indicator" />

                <div>

                  <span className="status-title">
                    Learning Hub Active
                  </span>

                  <span className="status-subtitle">
                    Ready for your next skill
                  </span>

                </div>

              </div>


              <FaArrowRight className="status-arrow" />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default LearnHero;