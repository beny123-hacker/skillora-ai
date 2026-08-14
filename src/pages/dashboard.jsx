import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import GreetingCard from "../components/dashboard/greetingcard";
import DashboardStats from "../components/dashboard/DashboardStats";
import ContinueLearning from "../components/dashboard/continuelearning";
import ProgressCard from "../components/dashboard/progresscard";
import RoadmapCard from "../components/dashboard/RoadmapCard";
import SkillCard from "../components/dashboard/SkillCard";
import QuoteCard, {
  TodaysFocusCard,
} from "../components/dashboard/quotecard";

import AIRecommendation from "../components/dashboard/AIRecommendation";
import Certificates from "../components/dashboard/Certificates";
import RecentActivity from "../components/dashboard/RecentActivity";
import UpcomingQuiz from "../components/dashboard/UpcomingQuiz";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase/supabase";

function Dashboard() {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    coursesCompleted: 0,
    totalCourses: 0,
    learningStreak: 0,
    totalXP: 0,
    overallProgress: 0,

    currentCourse: null,

    weeklyProgress: 0,
    daysStudied: 0,
    weeklyXP: 0,
    weeklyGoalHours: 0,

    roadmap: null,

    skills: [],

    recentActivity: [],
    upcomingQuiz: null,
    certificates: [],
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

      /*
       * ============================================================
       * PROFILE / XP
       * ============================================================
       *
       * XP is stored directly in profiles.xp
       */

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("id, xp, level")
        .eq("id", userId)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Profile loading error:",
          profileError
        );
      }

      const totalXP = Number(profile?.xp || 0);

      /*
       * ============================================================
       * COURSE PROGRESS
       * ============================================================
       *
       * Correct table:
       * course_progress
       *
       * Important columns:
       * completed_lessons
       * total_lessons
       * progress_percent
       * completed
       */

      const {
        data: courseProgress,
        error: courseError,
      } = await supabase
        .from("course_progress")
        .select(`
          *,
          courses (
            id,
            title,
            description
          )
        `)
        .eq("user_id", userId);

      if (courseError) {
        console.error(
          "Course progress error:",
          courseError
        );
      }

      const courses = courseProgress || [];

      const totalCourses = courses.length;

      /*
       * ============================================================
       * COURSE PROGRESS CALCULATION
       * ============================================================
       *
       * Do NOT blindly trust progress_percent.
       *
       * Calculate it from:
       *
       * completed_lessons / total_lessons * 100
       *
       * Example:
       *
       * 1 / 10 = 10%
       */

      const coursesWithCalculatedProgress =
        courses.map((course) => {
          const completedLessons = Math.max(
            0,
            Number(
              course.completed_lessons || 0
            )
          );

          const totalLessons = Math.max(
            0,
            Number(
              course.total_lessons || 0
            )
          );

          let calculatedProgress = 0;

          if (totalLessons > 0) {
            calculatedProgress = Math.round(
              (completedLessons /
                totalLessons) *
                100
            );
          }

          /*
           * If all lessons are completed,
           * force progress to 100.
           */

          if (
            totalLessons > 0 &&
            completedLessons >= totalLessons
          ) {
            calculatedProgress = 100;
          }

          return {
            ...course,

            /*
             * Keep a normalized progress value
             * for the Dashboard components.
             */

            progress: calculatedProgress,

            calculatedProgress,

            completed_lessons:
              completedLessons,

            total_lessons:
              totalLessons,
          };
        });

      /*
       * ============================================================
       * COMPLETED COURSES
       * ============================================================
       */

      const completedCourses =
        coursesWithCalculatedProgress.filter(
          (course) =>
            course.completed === true ||
            course.calculatedProgress >= 100
        );

      const coursesCompleted =
        completedCourses.length;

      /*
       * ============================================================
       * OVERALL PROGRESS
       * ============================================================
       *
       * Average of the REAL course progress values.
       */

      const overallProgress =
        totalCourses > 0
          ? Math.round(
              coursesWithCalculatedProgress.reduce(
                (sum, course) =>
                  sum +
                  Number(
                    course.calculatedProgress ||
                      0
                  ),
                0
              ) / totalCourses
            )
          : 0;

      /*
       * ============================================================
       * CURRENT COURSE
       * ============================================================
       */

      const currentCourse =
        coursesWithCalculatedProgress
          .filter(
            (course) =>
              !course.completed &&
              Number(
                course.completed_lessons || 0
              ) <
                Number(
                  course.total_lessons || 0
                )
          )
          .sort(
            (a, b) =>
              Number(
                b.calculatedProgress || 0
              ) -
              Number(
                a.calculatedProgress || 0
              )
          )[0] || null;

      /*
       * ============================================================
       * LEARNING ACTIVITY
       * ============================================================
       */

      const {
        data: activities,
        error: activityError,
      } = await supabase
        .from("learning_activity")
        .select("*")
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

      const recentActivity =
        activities || [];

      /*
       * ============================================================
       * LEARNING STREAK
       * ============================================================
       */

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

        /*
         * Normalize current date to local midnight.
         */

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

      /*
       * ============================================================
       * WEEKLY DATA
       * ============================================================
       */

      const now = new Date();

      const weekStart = new Date(now);

      weekStart.setDate(
        now.getDate() - now.getDay()
      );

      weekStart.setHours(
        0,
        0,
        0,
        0
      );

      const weeklyActivities =
        recentActivity.filter(
          (item) =>
            item.created_at &&
            new Date(item.created_at) >=
              weekStart
        );

      const daysStudied =
        new Set(
          weeklyActivities.map((item) =>
            new Date(item.created_at)
              .toISOString()
              .split("T")[0]
          )
        ).size;

      /*
       * ============================================================
       * WEEKLY XP
       * ============================================================
       *
       * Total XP comes from profiles.xp.
       *
       * Weekly XP can optionally come from
       * xp_transactions if that table exists.
       */

      let weeklyXP = 0;

      try {
        const {
          data: xpTransactions,
          error: xpTransactionError,
        } = await supabase
          .from("xp_transactions")
          .select(
            "xp_amount, created_at"
          )
          .eq("user_id", userId);

        if (
          !xpTransactionError &&
          xpTransactions
        ) {
          weeklyXP =
            xpTransactions
              .filter(
                (item) =>
                  item.created_at &&
                  new Date(
                    item.created_at
                  ) >= weekStart
              )
              .reduce(
                (sum, item) =>
                  sum +
                  Number(
                    item.xp_amount || 0
                  ),
                0
              );
        }
      } catch (error) {
        console.warn(
          "Weekly XP unavailable:",
          error
        );
      }

      /*
       * ============================================================
       * ROADMAP
       * ============================================================
       */

      const {
        data: roadmapProgress,
        error: roadmapError,
      } = await supabase
        .from("user_roadmap_progress")
        .select(`
          *,
          roadmap_items (
            id,
            title,
            order_index,
            roadmap_id
          ),
          roadmaps (
            id,
            title,
            description
          )
        `)
        .eq("user_id", userId)
        .order("created_at", {
          ascending: true,
        });

      if (roadmapError) {
        console.error(
          "Roadmap error:",
          roadmapError
        );
      }

      const roadmapData =
        roadmapProgress || [];

      let roadmap = null;

      if (roadmapData.length > 0) {
        const roadmapInfo =
          roadmapData[0]?.roadmaps;

        const completedItems =
          roadmapData.filter(
            (item) =>
              item.completed === true
          ).length;

        roadmap = {
          title:
            roadmapInfo?.title ||
            "Your Career Roadmap",

          description:
            roadmapInfo?.description ||
            "",

          items: roadmapData.map(
            (item) => ({
              id:
                item.roadmap_items?.id,

              title:
                item.roadmap_items?.title ||
                "Untitled milestone",

              order:
                item.roadmap_items
                  ?.order_index || 0,

              completed:
                item.completed === true,
            })
          ),

          progress:
            roadmapData.length > 0
              ? Math.round(
                  (completedItems /
                    roadmapData.length) *
                    100
                )
              : 0,
        };
      }

      /*
       * ============================================================
       * SKILLS
       * ============================================================
       */

      const skills = [];

      /*
       * ============================================================
       * FINAL DASHBOARD DATA
       * ============================================================
       */

      setDashboardData({
        coursesCompleted,

        totalCourses,

        learningStreak,

        /*
         * IMPORTANT:
         *
         * This comes directly from:
         * profiles.xp
         */

        totalXP,

        overallProgress,

        currentCourse,

        weeklyProgress:
          overallProgress,

        daysStudied,

        weeklyXP,

        weeklyGoalHours: 0,

        roadmap,

        skills,

        recentActivity,

        upcomingQuiz: null,

        certificates: [],
      });

      /*
       * ============================================================
       * DEBUG
       * ============================================================
       */

      console.log(
        "======================================"
      );

      console.log(
        "✅ DASHBOARD DATA"
      );

      console.log(
        "XP:",
        totalXP
      );

      console.log(
        "Level:",
        profile?.level
      );

      console.log(
        "Total Courses:",
        totalCourses
      );

      console.log(
        "Completed Courses:",
        coursesCompleted
      );

      console.log(
        "Overall Progress:",
        overallProgress + "%"
      );

      console.log(
        "Course Data:",
        coursesWithCalculatedProgress
      );

      console.log(
        "Current Course:",
        currentCourse
      );

      console.log(
        "======================================"
      );
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ============================================================
   * LOADING SCREEN
   * ============================================================
   */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />

            <p className="mt-4 text-sm text-slate-400">
              Loading your dashboard...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ============================================================
   * DASHBOARD
   * ============================================================
   */

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 px-4 py-6 sm:px-6 lg:px-8">

        {/* ======================================================
            GREETING
        ====================================================== */}

        <GreetingCard
          coursesCompleted={
            dashboardData.coursesCompleted
          }
          totalXP={
            dashboardData.totalXP
          }
          learningStreak={
            dashboardData.learningStreak
          }
          overallProgress={
            dashboardData.overallProgress
          }
        />

        {/* ======================================================
            QUOTE + TODAY'S FOCUS
        ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-2">
            <QuoteCard />
          </div>

          <TodaysFocusCard
            currentCourse={
              dashboardData.currentCourse
            }
          />

        </div>

        {/* ======================================================
            STATS
        ====================================================== */}

        <DashboardStats
          coursesCompleted={
            dashboardData.coursesCompleted
          }
          learningStreak={
            dashboardData.learningStreak
          }
          totalXP={
            dashboardData.totalXP
          }
          overallProgress={
            dashboardData.overallProgress
          }
        />

        {/* ======================================================
            CONTINUE LEARNING
        ====================================================== */}

        <ContinueLearning
          currentCourse={
            dashboardData.currentCourse
          }
        />

        {/* ======================================================
            AI RECOMMENDATION
        ====================================================== */}

        <AIRecommendation
          currentCourse={
            dashboardData.currentCourse
          }
        />

        {/* ======================================================
            PROGRESS + ROADMAP
        ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-2">

          <ProgressCard
            weeklyProgress={
              dashboardData.weeklyProgress
            }
            daysStudied={
              dashboardData.daysStudied
            }
            weeklyXP={
              dashboardData.weeklyXP
            }
            weeklyGoalHours={
              dashboardData.weeklyGoalHours
            }
          />

          <RoadmapCard
            roadmap={
              dashboardData.roadmap
            }
          />

        </div>

        {/* ======================================================
            TECHNICAL SKILLS
        ====================================================== */}

        <section className="space-y-6">

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
              Technologies
            </span>

            <h2 className="mt-2 text-3xl font-bold text-white">
              Technical Skills
            </h2>

            <p className="mt-2 max-w-2xl text-slate-400">
              Skills will appear here as you
              progress through your courses
              and roadmaps.
            </p>
          </div>

          {dashboardData.skills.length >
          0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

              {dashboardData.skills.map(
                (skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill.title}
                    progress={
                      skill.progress
                    }
                    level={skill.level}
                  />
                )
              )}

            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">

              <p className="text-lg font-semibold text-white">
                No skills tracked yet
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Start a course or roadmap
                to build your skill profile.
              </p>

            </div>
          )}

        </section>

        {/* ======================================================
            RECENT ACTIVITY + UPCOMING QUIZ
        ====================================================== */}

        <div className="grid gap-6 xl:grid-cols-2">

          <RecentActivity
            activities={
              dashboardData.recentActivity
            }
          />

          <UpcomingQuiz
            quiz={
              dashboardData.upcomingQuiz
            }
          />

        </div>

        {/* ======================================================
            CERTIFICATES
        ====================================================== */}

        <Certificates
          certificates={
            dashboardData.certificates
          }
        />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;