import { motion } from "framer-motion";
import {
  FiAward,
  FiDownload,
  FiEye,
  FiCalendar,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";

function Certificates({ certificates = [] }) {
  return (
    <section className="profile-certificates">
      {/* HEADER */}

      <div className="profile-module-header">
        <div>
          <span className="profile-section-kicker">
            VERIFIED SKILLS
          </span>

          <h2>Certificates</h2>

          <p>
            Certificates earned after successfully completing Skillora
            learning experiences.
          </p>
        </div>

        <div className="profile-count-badge">
          <FiAward />
          {certificates.length} Earned
        </div>
      </div>

      {/* EMPTY STATE */}

      {certificates.length === 0 ? (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="profile-empty-card"
        >
          <div className="profile-empty-glow profile-certificate-glow" />

          <div className="profile-empty-icon profile-certificate-empty-icon">
            📜
          </div>

          <div className="relative">
            <span className="profile-empty-kicker">
              BUILD YOUR PORTFOLIO
            </span>

            <h3>No Certificates Yet</h3>

            <p>
              Complete Skillora roadmaps and successfully pass quizzes
              to earn verified certificates.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="profile-certificate-grid">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id || index}
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="profile-certificate-card"
            >
              <div className="profile-certificate-ribbon" />

              <div className="profile-certificate-content">
                <div className="profile-certificate-top">
                  <div className="profile-certificate-icon">
                    <FiAward />
                  </div>

                  <div className="profile-verified-badge">
                    <FiCheckCircle />
                    VERIFIED
                  </div>
                </div>

                <div className="profile-certificate-body">
                  <span className="profile-certificate-label">
                    SKILLORA CERTIFICATE
                  </span>

                  <h3>{certificate.title}</h3>

                  <div className="profile-certificate-date">
                    <FiCalendar />
                    <span>
                      Issued on {certificate.issued_at || "Recently"}
                    </span>
                  </div>
                </div>

                <div className="profile-certificate-security">
                  <FiShield />
                  Verified Skillora Credential
                </div>

                <div className="profile-certificate-actions">
                  <button
                    type="button"
                    className="profile-certificate-view"
                  >
                    <FiEye />
                    View Certificate
                  </button>

                  <button
                    type="button"
                    className="profile-certificate-download"
                  >
                    <FiDownload />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Certificates;