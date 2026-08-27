import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiX,
  FiUser,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiHeart,
  FiBriefcase,
  FiTarget,
  FiSave,
} from "react-icons/fi";

import { supabase } from "../../supabase/supabase";

const AVAILABLE_INTERESTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "React",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C Programming",
  "C++",
  "Node.js",
  "Cloud Computing",
  "AWS",
  "DevOps",
  "Cybersecurity",
  "Ethical Hacking",
  "Data Science",
  "Data Analytics",
  "UI/UX Design",
  "Mobile Development",
  "Android Development",
  "iOS Development",
  "Blockchain",
  "Internet of Things",
  "Robotics",
  "Game Development",
  "AR/VR",
  "Database",
  "SQL",
  "System Design",
  "Networking",
  "Linux",
  "Open Source",
  "Competitive Programming",
  "Problem Solving",
  "Software Engineering",
  "Product Management",
  "Entrepreneurship",
  "Digital Marketing",
  "Content Creation",
  "Photography",
  "Graphic Design",
  "Finance",
  "Business",
  "Research",
  "Leadership",
  "Communication",
  "Public Speaking",
  "Mathematics",
  "Physics",
  "Career Development",
  "Interview Preparation",
];

function ProfileEditModal({
  isOpen,
  onClose,
  profile,
  user,
  onProfileUpdate,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    department: "",
    year: "",
    college_name: "",
    bio: "",
    dream_company: "",
    career_goal: "",
    interests: [],
  });

  const [isSaving, setIsSaving] = useState(false);

  /*
   * Load existing profile information
   * whenever the modal opens.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData({
      full_name:
        profile?.full_name ||
        user?.user_metadata?.full_name ||
        "",

      department:
        profile?.department || "",

      year:
        profile?.year || "",

      college_name:
        profile?.college_name || "",

      bio:
        profile?.bio || "",

      dream_company:
        profile?.dream_company || "",

      career_goal:
        profile?.career_goal || "",

      interests:
        Array.isArray(profile?.interests)
          ? profile.interests
          : [],
    });
  }, [profile, user, isOpen]);

  /*
   * Handle text input changes.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * Select / deselect interests.
   */
  const toggleInterest = (interest) => {
    setFormData((previous) => {
      const alreadySelected =
        previous.interests.includes(interest);

      if (alreadySelected) {
        return {
          ...previous,
          interests: previous.interests.filter(
            (item) => item !== interest
          ),
        };
      }

      if (previous.interests.length >= 50) {
        return previous;
      }

      return {
        ...previous,
        interests: [
          ...previous.interests,
          interest,
        ],
      };
    });
  };

  /*
   * SAVE PROFILE
   */
  const handleSave = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert(
        "User session not found. Please log in again."
      );
      return;
    }

    setIsSaving(true);

    try {
      /*
       * Data that will be saved to Supabase.
       */
      const updateData = {
        full_name:
          formData.full_name.trim(),

        department:
          formData.department.trim(),

        year:
          formData.year.trim(),

        college_name:
          formData.college_name.trim(),

        bio:
          formData.bio.trim(),

        dream_company:
          formData.dream_company.trim(),

        career_goal:
          formData.career_goal.trim(),

        interests:
          formData.interests,

        updated_at:
          new Date().toISOString(),
      };

      console.log(
        "Updating profile:",
        user.id,
        updateData
      );

      /*
       * IMPORTANT:
       *
       * Your current profile query uses:
       *
       * profiles.id = user.id
       *
       * So the update must use the same condition.
       */
      const {
        data,
        error,
      } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id)
        .select("*")
        .single();

      if (error) {
        console.error(
          "Supabase profile update error:",
          error
        );

        throw error;
      }

      console.log(
        "Profile successfully updated:",
        data
      );

      /*
       * Update Profile.jsx immediately.
       */
      if (onProfileUpdate) {
        await onProfileUpdate(data);
      }

      /*
       * Close modal.
       */
      onClose();

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      alert(
        error?.message ||
        "Unable to update profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="profile-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="profile-edit-modal"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
          >

            {/* HEADER */}

            <div className="profile-modal-header">
              <div>
                <span className="profile-eyebrow">
                  PERSONALIZE YOUR PROFILE
                </span>

                <h2>Edit Profile</h2>

                <p>
                  Add your details and personalize
                  your Skillora experience.
                </p>
              </div>

              <button
                type="button"
                className="profile-modal-close"
                onClick={onClose}
                disabled={isSaving}
              >
                <FiX />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSave}>
              <div className="profile-modal-scroll">

                {/* BASIC INFORMATION */}

                <div className="edit-section-title">
                  <FiUser />
                  Basic Information
                </div>

                <div className="profile-form-grid">

                  <div className="profile-input-group full-width">
                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label>
                      <FiBookOpen />
                      Department
                    </label>

                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Eg. Computer Science"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label>
                      <FiCalendar />
                      Year
                    </label>

                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="Eg. 3rd Year"
                    />
                  </div>

                  <div className="profile-input-group full-width">
                    <label>
                      <FiMapPin />
                      College Name
                    </label>

                    <input
                      type="text"
                      name="college_name"
                      value={formData.college_name}
                      onChange={handleChange}
                      placeholder="Enter your college name"
                    />
                  </div>

                </div>

                {/* ABOUT YOU */}

                <div className="edit-section-title bio-title">
                  <FiUser />
                  About You
                </div>

                <div className="profile-input-group">
                  <label>
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself..."
                    rows="4"
                    maxLength="500"
                  />

                  <span className="character-count">
                    {formData.bio.length}/500
                  </span>
                </div>

                {/* INTERESTS */}

                <div className="edit-section-title interests-title">
                  <FiHeart />
                  Interests

                  <span className="modal-interest-count">
                    {formData.interests.length}/50 selected
                  </span>
                </div>

                <p className="interest-help-text">
                  Click on the topics that interest you.
                  Select up to 50 interests to personalize
                  your learning experience.
                </p>

                <div className="interest-selector">
                  {AVAILABLE_INTERESTS.map(
                    (interest) => {
                      const isSelected =
                        formData.interests.includes(
                          interest
                        );

                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() =>
                            toggleInterest(interest)
                          }
                          className={`interest-option ${
                            isSelected
                              ? "selected"
                              : ""
                          }`}
                        >
                          {isSelected && "✓ "}
                          {interest}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* CAREER GOALS */}

                <div className="edit-section-title career-title">
                  <FiBriefcase />
                  Career Goals
                </div>

                <div className="profile-form-grid">

                  <div className="profile-input-group">
                    <label>
                      Dream Company
                    </label>

                    <input
                      type="text"
                      name="dream_company"
                      value={formData.dream_company}
                      onChange={handleChange}
                      placeholder="Eg. Google"
                    />
                  </div>

                  <div className="profile-input-group">
                    <label>
                      <FiTarget />
                      Career Goal
                    </label>

                    <input
                      type="text"
                      name="career_goal"
                      value={formData.career_goal}
                      onChange={handleChange}
                      placeholder="Eg. AI Engineer"
                    />
                  </div>

                </div>

              </div>

              {/* FOOTER */}

              <div className="profile-modal-footer">

                <button
                  type="button"
                  onClick={onClose}
                  className="profile-cancel-btn"
                  disabled={isSaving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="profile-save-btn"
                >
                  <FiSave />

                  {isSaving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProfileEditModal;