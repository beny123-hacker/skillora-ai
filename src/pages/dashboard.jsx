import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaFire,
  FaBolt,
  FaChartLine,
  FaGraduationCap,
  FaArrowRight,
  FaQuoteLeft,
  FaUser,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";

import { useAuth } from "../context/Authcontext";
import { supabase } from "../supabase/supabase";

import "../styles/dashboard.css";

function Dashboard() {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    coursesCompleted: 0,
    totalCourses: 0,
    learningStreak: 0,
    totalXP: 0,
    overallProgress: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    loadDashboard();
  }, [user?.id]);

  async function loadDashboard() {
    try {
      setLoading(true);

      const userId = user.id;

      /* ============================================================
         PROFILE / XP
         ============================================================ */

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, xp, level")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) {
        console.error("Profile loading error:", profileError);
      }

      const totalXP = Number(profile?.xp || 0);

      /* ============================================================
         COURSE PROGRESS
         ============================================================ */

      const {
        data: courseProgress,
        error: courseError,
      } = await supabase
        .from("course_progress")
        .select("*")
        .eq("user_id", userId);

      if (courseError) {
        console.error("Course progress error:", courseError);
      }

      const courses = courseProgress || [];

      const totalCourses = courses.length;

      /* ============================================================
         CALCULATE COURSE PROGRESS
         ============================================================ */

      const coursesWithCalculatedProgress = courses.map((course) => {
        const completedLessons = Math.max(
          0,
          Number(course.completed_lessons || 0)
        );

        const totalLessons = Math.max(
          0,
          Number(course.total_lessons || 0)
        );

        let calculatedProgress = 0;

        if (totalLessons > 0) {
          calculatedProgress = Math.round(
            (completedLessons / totalLessons) * 100
          );
        }

        if (
          totalLessons > 0 &&
          completedLessons >= totalLessons
        ) {
          calculatedProgress = 100;
        }

        return {
          ...course,
          calculatedProgress,
        };
      });

      /* ============================================================
         COMPLETED COURSES
         ============================================================ */

      const completedCourses =
        coursesWithCalculatedProgress.filter(
          (course) =>
            course.completed === true ||
            course.calculatedProgress >= 100
        );

      const coursesCompleted = completedCourses.length;

      /* ============================================================
         OVERALL PROGRESS
         ============================================================ */

      const overallProgress =
        totalCourses > 0
          ? Math.round(
              coursesWithCalculatedProgress.reduce(
                (sum, course) =>
                  sum + Number(course.calculatedProgress || 0),
                0
              ) / totalCourses
            )
          : 0;

      /* ============================================================
         LEARNING ACTIVITY
         ============================================================ */

      const {
        data: activities,
        error: activityError,
      } = await supabase
        .from("learning_activity")
        .select("created_at")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

      if (activityError) {
        console.error(
          "Learning activity error:",
          activityError
        );
      }

      const recentActivity = activities || [];

      /* ============================================================
         LEARNING STREAK
         ============================================================ */

      const learningDates = [
        ...new Set(
          recentActivity
            .map((item) =>
              item.created_at
                ? new Date(item.created_at)
                    .toISOString()
                    .split("T")[0]
                : null
            )
            .filter(Boolean)
        ),
      ].sort(
        (a, b) =>
          new Date(b) - new Date(a)
      );

      let learningStreak = 0;

      if (learningDates.length > 0) {
        let currentDate = new Date();

        currentDate.setHours(
          0,
          0,
          0,
          0
        );

        for (const date of learningDates) {
          const expected =
            currentDate
              .toISOString()
              .split("T")[0];

          if (date === expected) {
            learningStreak++;

            currentDate.setDate(
              currentDate.getDate() - 1
            );
          } else {
            break;
          }
        }
      }

      /* ============================================================
         SET DASHBOARD DATA
         ============================================================ */

      setDashboardData({
        coursesCompleted,
        totalCourses,
        learningStreak,
        totalXP,
        overallProgress,
      });

      console.log("======================================");
      console.log("✅ DASHBOARD DATA");
      console.log("XP:", totalXP);
      console.log("Level:", profile?.level);
      console.log("Total Courses:", totalCourses);
      console.log("Completed Courses:", coursesCompleted);
      console.log("Learning Streak:", learningStreak);
      console.log("Overall Progress:", overallProgress + "%");
      console.log("======================================");
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* ================================================================
     USER INFORMATION
     ================================================================ */

  const userMetadata = user?.user_metadata || {};

  const displayName =
    userMetadata.full_name ||
    userMetadata.name ||
    userMetadata.username ||
    user?.email?.split("@")[0] ||
    "Learner";

  const email = user?.email || "";

  const avatarUrl =
    userMetadata.avatar_url ||
    userMetadata.picture ||
    null;

  /* ================================================================
     GREETING
     ================================================================ */

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  /* ================================================================
     LOADING
     ================================================================ */

  if (loading) {
    return (
      <DashboardLayout>
        <main className="dashboard-premium">
          <div className="dashboard-loading">
            <div className="dashboard-loader" />

            <p>
              Preparing your learning dashboard...
            </p>
          </div>
        </main>
      </DashboardLayout>
    );
  }

  /* ================================================================
     DASHBOARD
     ================================================================ */

  return (
    <DashboardLayout>
      <main className="dashboard-premium">
        <div className="dashboard-shell">

          {/* ======================================================
              TOP HEADER
              ====================================================== */}

          <header className="dashboard-header">
            <div>
              <span className="dashboard-eyebrow">
                <span className="eyebrow-dot" />
                AI PERSONALIZED DASHBOARD
              </span>

            

             
            </div>
          </header>

          {/* ======================================================
              HERO SECTION
              ====================================================== */}

          <section className="dashboard-hero">

            {/* LEFT SIDE */}

            <div className="dashboard-hero-left">

              <div className="greeting-content">
                <span className="greeting-small">
                  Welcome back
                </span>

                <h2>
                  {greeting},{" "}
                  <span>{displayName}</span>{" "}
                  <span className="wave">
                    👋
                  </span>
                </h2>

                <p>
                  Keep learning, strengthen your
                  skills, and move one step closer
                  to your career goals.
                </p>
              </div>

              {/* QUOTE */}

              <div className="quote-card">

                <div className="quote-top">
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>

                  <span>
                    DAILY INSPIRATION
                  </span>
                </div>

                <blockquote>
                  “Success is the sum of small
                  efforts, repeated day after day.”
                </blockquote>

                <div className="quote-author">
                  — Robert Collier
                </div>

              </div>

            </div>

            {/* RIGHT SIDE — PROFILE */}

            <div className="profile-card">

              <div className="profile-glow" />

              <div className="profile-avatar-wrapper">

                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar profile-avatar-fallback">
                    <FaUser />
                  </div>
                )}

                <span className="online-indicator" />
              </div>

              <h3>
                {displayName}
              </h3>

              <p className="profile-role">
                Computer Science Student
              </p>

              <div className="active-badge">
                <span />
                Active Learner
              </div>

              {/* PROFILE PROGRESS */}

              <div className="profile-progress">

                <div className="progress-heading">
                  <span>
                    LEARNING PROGRESS
                  </span>

                  <strong>
                    {dashboardData.overallProgress}%
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${dashboardData.overallProgress}%`,
                    }}
                  />
                </div>

              </div>

              <div className="profile-email">
                {email}
              </div>

            </div>

          </section>

          {/* ======================================================
              STAT CARDS
              ====================================================== */}

          <section className="stats-section">

            {/* COURSES */}

            <div className="premium-stat-card">

              <div className="stat-icon courses-icon">
                <FaBookOpen />
              </div>

              <div className="stat-content">

                <span>
                  COURSES COMPLETED
                </span>

                <strong>
                  {dashboardData.coursesCompleted}
                </strong>

                <p>
                  Courses successfully completed
                </p>

              </div>

              <div className="stat-arrow">
                <FaArrowRight />
              </div>

            </div>

            {/* XP */}

            <div className="premium-stat-card">

              <div className="stat-icon xp-icon">
                <FaBolt />
              </div>

              <div className="stat-content">

                <span>
                  EXPERIENCE POINTS
                </span>

                <strong>
                  {dashboardData.totalXP}
                </strong>

                <p>
                  Total experience earned
                </p>

              </div>

              <div className="stat-arrow">
                <FaArrowRight />
              </div>

            </div>

            {/* STREAK */}

            <div className="premium-stat-card">

              <div className="stat-icon streak-icon">
                <FaFire />
              </div>

              <div className="stat-content">

                <span>
                  LEARNING STREAK
                </span>

                <strong>
                  {dashboardData.learningStreak}
                </strong>

                <p>
                  Days of consistent learning
                </p>

              </div>

              <div className="stat-arrow">
                <FaArrowRight />
              </div>

            </div>

          </section>

          {/* ======================================================
              OVERALL PROGRESS
              ====================================================== */}

          <section className="overall-card">

            <div className="overall-left">

              <div className="overall-icon">
                <FaChartLine />
              </div>

              <div>
                <span>
                  YOUR LEARNING JOURNEY
                </span>

                <h3>
                  Overall Progress
                </h3>

                <p>
                  Every lesson brings you closer
                  to your career goals.
                </p>
              </div>

            </div>

            <div className="overall-progress-area">

              <div className="overall-progress-value">
                {dashboardData.overallProgress}%
              </div>

              <div className="overall-progress-track">
                <div
                  className="overall-progress-fill"
                  style={{
                    width: `${dashboardData.overallProgress}%`,
                  }}
                />
              </div>

            </div>

          </section>

          {/* ======================================================
              FOOTER MESSAGE
              ====================================================== */}

          <div className="dashboard-footer-message">
            <FaGraduationCap />

            <span>
              Keep going. Your future self will
              thank you.
            </span>
          </div>

        </div>
      </main>
    </DashboardLayout>
  );
}

export default Dashboard;