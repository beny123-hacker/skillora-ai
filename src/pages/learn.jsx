import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/learn.css";

import Footer from "../components/common/footer";
import AIAssistantButton from "../components/common/AIAssistantButton";

import LearnHero from "../components/learn/LearnHero";
import CategorySection from "../components/learn/CategorySection";
import RecommendedSkills from "../components/learn/RecommendedSkills";
import TrendingCourses from "../components/learn/TrendingCourses";
import YoutubeResources from "../components/learn/YoutubeResources";

import DocumentationSection from "../components/learn/DocumentationSection";
import PracticeProblems from "../components/learn/PracticeProblems";

import CourseSidebar from "../components/learn/CourseSidebar";
import YoutubePlayer from "../components/learn/YoutubePlayer";
import CourseProgress from "../components/learn/CourseProgress";

import { supabase } from "../supabase/supabase";
import { useAuth } from "../context/Authcontext";

const N8N_WEBHOOK_URL =
  "http://localhost:5678/webhook-test/skillora-ai";

// ============================================================
// STATIC COURSE CATEGORIES
// ============================================================

const categoryCourses = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Learn HTML, CSS, JavaScript, React and modern frontend development.",
    level: "Beginner → Advanced",
    category: "Frontend",
    searchTerm: "Frontend Development",
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Learn Node.js, Express, APIs, databases and backend development.",
    level: "Beginner → Advanced",
    category: "Backend",
    searchTerm: "Backend Development",
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description:
      "Learn Python, Machine Learning, Deep Learning and Artificial Intelligence.",
    level: "Beginner → Advanced",
    category: "AI / ML",
    searchTerm: "Machine Learning",
  },
  {
    id: "python",
    title: "Python Programming",
    description:
      "Learn Python programming from fundamentals to advanced concepts.",
    level: "Beginner → Advanced",
    category: "AI / ML",
    searchTerm: "Python",
  },
  {
    id: "react",
    title: "React.js",
    description:
      "Build modern interactive web applications using React.",
    level: "Intermediate",
    category: "Frontend",
    searchTerm: "React.js",
  },
  {
    id: "node",
    title: "Node.js",
    description:
      "Build scalable backend applications using Node.js.",
    level: "Intermediate",
    category: "Backend",
    searchTerm: "Node.js",
  },
  {
    id: "java",
    title: "Java Programming",
    description:
      "Learn Java programming, OOP and application development.",
    level: "Beginner → Advanced",
    category: "Programming",
    searchTerm: "Java Programming",
  },
  {
    id: "datascience",
    title: "Data Science",
    description:
      "Learn Python, Pandas, NumPy, visualization and data analysis.",
    level: "Intermediate",
    category: "Data Science",
    searchTerm: "Data Science",
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    description:
      "Learn networking, ethical hacking and cyber security fundamentals.",
    level: "Beginner → Advanced",
    category: "Cyber Security",
    searchTerm: "Cyber Security",
  },
  {
    id: "docker",
    title: "Docker",
    description:
      "Learn containers, images and modern Docker workflows.",
    level: "Beginner",
    category: "DevOps",
    searchTerm: "Docker",
  },
];

// ============================================================
// LEARN PAGE
// ============================================================

function Learn() {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("English");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [youtubeResults, setYoutubeResults] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // IDs of completed lessons
  const [completedVideos, setCompletedVideos] = useState([]);

  // Keeps course/lesson navigation inside React without page refreshes.
  

  // ============================================================
  // FILTER COURSES
  // ============================================================

  const filteredCourses = useMemo(() => {
    if (!search.trim()) {
      return categoryCourses;
    }

    const query = search.toLowerCase().trim();

    return categoryCourses.filter((course) => {
      return (
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.searchTerm.toLowerCase().includes(query)
      );
    });
  }, [search]);

  // ============================================================
  // GET LOGGED-IN USER ID
  // ============================================================

  const getCurrentUserId = async () => {
    if (user?.id) {
      return user.id;
    }

    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Unable to get current user:", userError);
      return null;
    }

    return currentUser?.id || null;
  };

  // ============================================================
  // FIND OR CREATE COURSE
  // ============================================================

  const findOrCreateCourse = async (courseData) => {
    const userId = await getCurrentUserId();

    if (!userId) {
      throw new Error("You must be logged in to save course progress.");
    }

    // ----------------------------------------------------------
    // Try to find existing course
    // ----------------------------------------------------------

    const {
      data: existingCourses,
      error: findError,
    } = await supabase
      .from("courses")
      .select("*")
      .eq("title", courseData.title)
      .eq("category", courseData.category)
      .limit(1);

    if (findError) {
      console.error("Course lookup error:", findError);
      throw findError;
    }

    if (existingCourses && existingCourses.length > 0) {
      return existingCourses[0];
    }

    // ----------------------------------------------------------
    // Create course
    // ----------------------------------------------------------

    const {
      data: newCourse,
      error: createError,
    } = await supabase
      .from("courses")
      .insert([
        {
          title: courseData.title,
          description: courseData.description,
          category: courseData.category,
          level: courseData.level,
          thumbnail_url:
            courseData.videos?.[0]?.thumbnail || null,
          total_lessons: courseData.videos?.length || 0,
          xp_reward: (courseData.videos?.length || 0) * 10,
        },
      ])
      .select()
      .single();

    if (createError) {
      console.error("Course creation error:", createError);
      throw createError;
    }

    return newCourse;
  };

  // ============================================================
  // FIND OR CREATE LESSONS
  // ============================================================

  const findOrCreateLessons = async (
    courseId,
    videos
  ) => {
    if (!courseId || !videos?.length) {
      return [];
    }

    const createdLessons = [];

    for (let index = 0; index < videos.length; index++) {
      const video = videos[index];

      // --------------------------------------------------------
      // Try to identify lesson using course + title
      // --------------------------------------------------------

      const {
        data: existingLessons,
        error: findError,
      } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .eq("title", video.title)
        .limit(1);

      if (findError) {
        console.error("Lesson lookup error:", findError);
        continue;
      }

      if (
        existingLessons &&
        existingLessons.length > 0
      ) {
        createdLessons.push(existingLessons[0]);
        continue;
      }

      // --------------------------------------------------------
      // Create lesson
      // --------------------------------------------------------

      const {
        data: newLesson,
        error: createError,
      } = await supabase
        .from("lessons")
        .insert([
          {
            course_id: courseId,
            title: video.title,
            description:
              video.description ||
              "YouTube learning lesson",
            content: JSON.stringify({
              youtubeId: video.youtubeId || "",
              youtubeUrl: video.youtubeUrl || "",
              thumbnail: video.thumbnail || "",
              channel: video.channel || "YouTube",
            }),
            lesson_order: index + 1,
            duration_minutes: 0,
            xp_reward: 10,
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error(
          "Lesson creation error:",
          createError
        );
        continue;
      }

      createdLessons.push(newLesson);
    }

    return createdLessons;
  };

  // ============================================================
  // LOAD SAVED COURSE PROGRESS
  // ============================================================

  const loadCourseProgress = async (
    courseId,
    lessons
  ) => {
    const userId = await getCurrentUserId();

    if (!userId || !courseId) {
      setCompletedVideos([]);
      return;
    }

    // ----------------------------------------------------------
    // Get lesson progress
    // ----------------------------------------------------------

    const {
      data: progressRows,
      error: progressError,
    } = await supabase
      .from("lesson_progress")
      .select(
        "lesson_id, completed, progress_percent"
      )
      .eq("user_id", userId);

    if (progressError) {
      console.error(
        "Lesson progress fetch error:",
        progressError
      );

      return;
    }

    const lessonIds = new Set(
      lessons.map((lesson) => lesson.id)
    );

    const completedLessonIds =
      progressRows
        ?.filter(
          (row) =>
            row.completed &&
            lessonIds.has(row.lesson_id)
        )
        .map((row) => row.lesson_id) || [];

    // ----------------------------------------------------------
    // Convert database lesson IDs to video IDs
    //
    // We use lesson order to match database lessons with
    // YouTube videos.
    // ----------------------------------------------------------

    const completedVideoIds = [];

    lessons.forEach((lesson) => {
      if (
        completedLessonIds.includes(
          lesson.id
        )
      ) {
        const matchingVideo =
          selectedCourse?.videos?.find(
            (_, index) =>
              index + 1 ===
              lesson.lesson_order
          );

        if (matchingVideo) {
          completedVideoIds.push(
            matchingVideo.id
          );
        }
      }
    });

    setCompletedVideos(
      completedVideoIds
    );

    // ----------------------------------------------------------
    // Load course progress row
    // ----------------------------------------------------------

    const {
      data: courseProgress,
      error: courseProgressError,
    } = await supabase
      .from("course_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (courseProgressError) {
      console.error(
        "Course progress fetch error:",
        courseProgressError
      );
    }

    if (courseProgress) {
      console.log(
        "Saved course progress:",
        courseProgress
      );
    }
  };

  // ============================================================
  // SAVE COURSE PROGRESS
  // ============================================================

  const saveCourseProgress = async (
    courseId,
    completedCount,
    totalLessons
  ) => {
    const userId = await getCurrentUserId();

    if (!userId || !courseId) {
      return;
    }

    const progressPercent =
      totalLessons > 0
        ? Math.round(
            (completedCount /
              totalLessons) *
              100
          )
        : 0;

    const completed =
      completedCount >= totalLessons &&
      totalLessons > 0;

    const {
      error,
    } = await supabase
      .from("course_progress")
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          progress_percent:
            progressPercent,
          completed_lessons:
            completedCount,
          total_lessons:
            totalLessons,
          completed,
          last_accessed:
            new Date().toISOString(),
          completed_at: completed
            ? new Date().toISOString()
            : null,
          updated_at:
            new Date().toISOString(),
        },
        {
          onConflict:
            "user_id,course_id",
        }
      );

    if (error) {
      console.error(
        "Course progress save error:",
        error
      );
    } else {
      console.log(
        "Course progress saved:",
        progressPercent + "%"
      );
    }
  };

  // ============================================================
  // UPDATE XP
  // ============================================================

  const addXP = async (amount) => {
    const userId = await getCurrentUserId();

    if (!userId || !amount) {
      return;
    }

    // Get latest XP directly from database
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("xp, level")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Profile XP fetch error:",
        profileError
      );
      return;
    }

    if (!profile) {
      return;
    }

    const currentXP =
      Number(profile.xp) || 0;

    const newXP =
      currentXP + Number(amount);

    // Simple level calculation
    const newLevel =
      Math.floor(newXP / 500) + 1;

    const {
      error: updateError,
    } = await supabase
      .from("profiles")
      .update({
        xp: newXP,
        level: newLevel,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", userId);

    if (updateError) {
      console.error(
        "XP update error:",
        updateError
      );
      return;
    }

    console.log(
      `XP updated: ${currentXP} → ${newXP}`
    );
  };

  // ============================================================
  // SAVE LESSON COMPLETION
  // ============================================================

  const saveLessonCompletion = async (
    course,
    video,
    lesson
  ) => {
    const userId = await getCurrentUserId();

    if (!userId || !lesson) {
      return;
    }

    // ----------------------------------------------------------
    // Check if already completed
    // ----------------------------------------------------------

    const {
      data: existingProgress,
      error: existingError,
    } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("lesson_id", lesson.id)
      .maybeSingle();

    if (existingError) {
      console.error(
        "Existing lesson progress error:",
        existingError
      );
    }

    // ----------------------------------------------------------
    // If already completed, don't give XP again
    // ----------------------------------------------------------

    if (existingProgress?.completed) {
      console.log(
        "Lesson already completed. XP not awarded again."
      );

      return;
    }

    // ----------------------------------------------------------
    // Save lesson progress
    // ----------------------------------------------------------

    const {
      error: progressError,
    } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          user_id: userId,
          lesson_id: lesson.id,
          completed: true,
          progress_percent: 100,
          time_spent: 0,
          last_accessed:
            new Date().toISOString(),
          completed_at:
            new Date().toISOString(),
          updated_at:
            new Date().toISOString(),
        },
        {
          onConflict:
            "user_id,lesson_id",
        }
      );

    if (progressError) {
      console.error(
        "Lesson progress save error:",
        progressError
      );

      throw progressError;
    }

    // ----------------------------------------------------------
    // Give XP
    // ----------------------------------------------------------

    await addXP(
      lesson.xp_reward || 10
    );

    // ----------------------------------------------------------
    // Calculate course progress
    // ----------------------------------------------------------

    const newCompletedCount =
      completedVideos.length + 1;

    await saveCourseProgress(
      course.id,
      newCompletedCount,
      course.videos.length
    );
  };

  // ============================================================
  // YOUTUBE SEARCH
  // ============================================================

  const searchYoutubeResources = async (
    searchTerm = search
  ) => {
    const query = searchTerm.trim();

    if (!query) {
      setError(
        "Please enter a course or technology to search."
      );
      return;
    }

    setLoading(true);
    setError("");

    setYoutubeResults([]);
    setSelectedCourse(null);
    setSelectedVideo(null);
    setCompletedVideos([]);
    

    try {
      // --------------------------------------------------------
      // n8n request
      // --------------------------------------------------------

      const response = await fetch(
        N8N_WEBHOOK_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            module: "youtube_search",
            course: query,
            language: language,
            search: query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data =
        await response.json();

      console.log(
        "n8n YouTube response:",
        data
      );

      // --------------------------------------------------------
      // Normalize response
      // --------------------------------------------------------

      let videos = [];

      if (Array.isArray(data)) {
        videos = data;
      } else if (
        Array.isArray(data.videos)
      ) {
        videos = data.videos;
      } else if (
        Array.isArray(data.results)
      ) {
        videos = data.results;
      } else if (
        Array.isArray(data.resources)
      ) {
        videos = data.resources;
      }

      // --------------------------------------------------------
      // Normalize YouTube videos
      // --------------------------------------------------------

      const normalizedVideos =
        videos
          .map((video, index) => {
            const youtubeId =
              video.youtubeId ||
              video.videoId ||
              video.id ||
              "";

            const title =
              video.title ||
              video.name ||
              "YouTube Lesson";

            const description =
              video.description ||
              "YouTube learning resource";

            const thumbnail =
              video.thumbnail ||
              (youtubeId
                ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
                : "");

            const youtubeUrl =
              video.youtubeUrl ||
              video.url ||
              (youtubeId
                ? `https://www.youtube.com/watch?v=${youtubeId}`
                : "");

            return {
              id:
                youtubeId ||
                `youtube-${index}`,

              title,
              description,
              youtubeId,
              thumbnail,

              channel:
                video.channel ||
                video.channelTitle ||
                "YouTube",

              publishedAt:
                video.publishedAt ||
                "",

              youtubeUrl,
            };
          })
          .filter(
            (video) =>
              video.youtubeId ||
              video.youtubeUrl
          );

      // --------------------------------------------------------
      // No results
      // --------------------------------------------------------

      if (
        normalizedVideos.length === 0
      ) {
        setError(
          `No YouTube resources found for "${query}" in ${language}. Try another course or language.`
        );

        setYoutubeResults([]);

        return;
      }

      setYoutubeResults(
        normalizedVideos
      );

      // --------------------------------------------------------
      // Create course object for UI
      // --------------------------------------------------------

      const newCourse = {
        id: `youtube-${query
          .toLowerCase()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )}`,

        title: query,

        description:
          `YouTube learning resources for ${query} in ${language}.`,

        level:
          "YouTube Learning",

        duration:
          `${normalizedVideos.length} Lessons`,

        category: "YouTube",

        videos:
          normalizedVideos,
      };

      setSelectedCourse(
        newCourse
      );
      

      setSelectedVideo(
        normalizedVideos[0]
      );

      // --------------------------------------------------------
      // SAVE COURSE + LESSONS IN SUPABASE
      // --------------------------------------------------------

      try {
        const dbCourse =
          await findOrCreateCourse(
            newCourse
          );

        const dbLessons =
          await findOrCreateLessons(
            dbCourse.id,
            normalizedVideos
          );

        console.log(
          "Database course:",
          dbCourse
        );

        console.log(
          "Database lessons:",
          dbLessons
        );

        // ------------------------------------------------------
        // Load existing progress
        // ------------------------------------------------------

        // Temporarily assign the UI course before loading
        // progress because loadCourseProgress uses its videos.
        setSelectedCourse({
          ...newCourse,
          databaseId:
            dbCourse.id,
          lessons:
            dbLessons,
        });

        // Load progress manually here because state update
        // is asynchronous.
        const userId =
          await getCurrentUserId();

        if (userId) {
          const {
            data: progressRows,
            error: progressError,
          } =
            await supabase
              .from(
                "lesson_progress"
              )
              .select(
                "lesson_id, completed"
              )
              .eq(
                "user_id",
                userId
              );

          if (
            !progressError
          ) {
            const completedIds =
              [];

            dbLessons.forEach(
              (lesson) => {
                const progress =
                  progressRows?.find(
                    (row) =>
                      row.lesson_id ===
                      lesson.id
                  );

                if (
                  progress?.completed
                ) {
                  const video =
                    normalizedVideos[
                      lesson.lesson_order -
                        1
                    ];

                  if (video) {
                    completedIds.push(
                      video.id
                    );
                  }
                }
              }
            );

            setCompletedVideos(
              completedIds
            );
          }
        }
      } catch (databaseError) {
        console.error(
          "Supabase course setup error:",
          databaseError
        );

        setError(
          "The YouTube resources loaded, but the course could not be saved to Supabase. Check your database permissions."
        );
      }

      // --------------------------------------------------------
      // Scroll
      // --------------------------------------------------------

      setTimeout(() => {
        document
          .getElementById(
            "youtube-learning-area"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
            block: "start",
          });
      }, 150);
    } catch (err) {
      console.error(
        "YouTube search error:",
        err
      );

      setError(
        "Unable to fetch YouTube resources. Make sure your n8n workflow is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const handleSearch = () => {
    searchYoutubeResources(
      search
    );
  };

  // ============================================================
  // SELECT CATEGORY COURSE
  // ============================================================

  const handleSelectCourse = (
    course
  ) => {
    if (!course) {
      return;
    }

    const searchTerm =
      course.searchTerm ||
      course.title;

    setSearch(searchTerm);

    searchYoutubeResources(
      searchTerm
    );
  };

  // ============================================================
  // SELECT VIDEO
  // ============================================================

  const handleSelectVideo = (video, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (!video) {
      return;
    }

    setSelectedVideo(video);
    

    setTimeout(() => {
      document
        .getElementById("youtube-learning-area")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  // ============================================================
  // COURSE / LESSON NAVIGATION
  // ============================================================

  const getCurrentVideoIndex = () => {
    if (!selectedCourse?.videos?.length || !selectedVideo) {
      return -1;
    }

    return selectedCourse.videos.findIndex(
      (video) => video.id === selectedVideo.id
    );
  };

  const handlePreviousLesson = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    const currentIndex = getCurrentVideoIndex();

    if (currentIndex <= 0) {
      return;
    }

    handleSelectVideo(
      selectedCourse.videos[currentIndex - 1]
    );
  };

  const handleNextLesson = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    const currentIndex = getCurrentVideoIndex();

    if (
      currentIndex < 0 ||
      currentIndex >= selectedCourse.videos.length - 1
    ) {
      return;
    }

    handleSelectVideo(
      selectedCourse.videos[currentIndex + 1]
    );
  };

  const handleExitCourse = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    setSelectedCourse(null);
    setSelectedVideo(null);
    setYoutubeResults([]);
    setCompletedVideos([]);
    

    setTimeout(() => {
      document
        .getElementById("learning-categories")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  // ============================================================
  // COMPLETE VIDEO
  // ============================================================

  const handleCompleteVideo =
    async () => {
      if (
        !selectedVideo ||
        !selectedCourse
      ) {
        return;
      }

      // Already completed
      if (
        completedVideos.includes(
          selectedVideo.id
        )
      ) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        // ------------------------------------------------------
        // Make sure course exists in database
        // ------------------------------------------------------

        const dbCourse =
          await findOrCreateCourse(
            selectedCourse
          );

        // ------------------------------------------------------
        // Make sure lessons exist
        // ------------------------------------------------------

        const dbLessons =
          selectedCourse.lessons?.length
            ? selectedCourse.lessons
            : await findOrCreateLessons(
                dbCourse.id,
                selectedCourse.videos
              );

        // ------------------------------------------------------
        // Find selected lesson
        // ------------------------------------------------------

        const videoIndex =
          selectedCourse.videos.findIndex(
            (video) =>
              video.id ===
              selectedVideo.id
          );

        const selectedLesson =
          dbLessons.find(
            (lesson) =>
              lesson.lesson_order ===
              videoIndex + 1
          );

        if (!selectedLesson) {
          throw new Error(
            "Lesson was not found in the database."
          );
        }

        // ------------------------------------------------------
        // Save completion
        // ------------------------------------------------------

        await saveLessonCompletion(
          dbCourse,
          selectedVideo,
          selectedLesson
        );

        // ------------------------------------------------------
        // Update UI
        // ------------------------------------------------------

        setCompletedVideos(
          (previous) => {
            if (
              previous.includes(
                selectedVideo.id
              )
            ) {
              return previous;
            }

            return [
              ...previous,
              selectedVideo.id,
            ];
          }
        );

        // ------------------------------------------------------
        // Update selected course
        // ------------------------------------------------------

        setSelectedCourse(
          (previous) => ({
            ...previous,
            databaseId:
              dbCourse.id,
            lessons:
              dbLessons,
          })
        );

        console.log(
          "Lesson completed and saved to Supabase."
        );
      } catch (err) {
        console.error(
          "Complete lesson error:",
          err
        );

        setError(
          "Unable to save your lesson progress. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  // ============================================================
  // CONTINUE LEARNING
  // ============================================================

  const handleContinueLearning =
    () => {
      if (selectedCourse) {
        document
          .getElementById(
            "youtube-learning-area"
          )
          ?.scrollIntoView({
            behavior:
              "smooth",
            block: "start",
          });

        return;
      }

      if (search.trim()) {
        searchYoutubeResources(
          search
        );
        return;
      }

      searchYoutubeResources(
        "Python"
      );
    };

  // ============================================================
  // UI
  // ============================================================

  return (
    <DashboardLayout>
      <main className="min-h-screen bg-slate-950 text-white">

        <div className="mx-auto w-full max-w-7xl space-y-12 px-6 py-8 lg:px-8">

          {/* ==================================================
              HERO
          ================================================== */}

          <LearnHero
            search={search}
            setSearch={setSearch}
            onSearch={handleSearch}
            onContinue={
              handleContinueLearning
            }
            language={language}
            setLanguage={
              setLanguage
            }
            loading={loading}
          />

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <section className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

              <div className="flex items-start gap-3">

                <span className="text-xl">
                  ⚠️
                </span>

                <div>

                  <h3 className="font-semibold text-red-300">
                    Learn Module
                  </h3>

                  <p className="mt-1 text-sm text-red-200/80">
                    {error}
                  </p>

                </div>

              </div>

            </section>
          )}

          {/* ==================================================
              SEARCH RESULTS
          ================================================== */}

          {search.trim() && (
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <div className="mb-6">

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      Search Results
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      YouTube resources for{" "}

                      <span className="font-semibold text-white">
                        {search}
                      </span>

                      {" "}in{" "}

                      <span className="font-semibold text-indigo-300">
                        {language}
                      </span>

                    </p>

                  </div>

                  {loading && (
                    <div className="flex items-center gap-2 text-sm text-indigo-300">

                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />

                      Processing...

                    </div>
                  )}

                </div>

              </div>

              {youtubeResults.length >
              0 ? (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                  {youtubeResults.map(
                    (video) => (
                      <button
                        key={
                          video.id
                        }
                        type="button"
                        onClick={() => {
                          setSelectedCourse(
                            (previous) => ({
                              ...(previous ||
                                {
                                  id: `youtube-${search}`,
                                  title:
                                    search,
                                  description:
                                    `YouTube resources for ${search}.`,
                                  level:
                                    "YouTube Learning",
                                  duration:
                                    `${youtubeResults.length} Lessons`,
                                  category:
                                    "YouTube",
                                  videos:
                                    youtubeResults,
                                }),
                            })
                          );

                          setSelectedVideo(video);
                          

                          setTimeout(
                            () => {
                              document
                                .getElementById(
                                  "youtube-learning-area"
                                )
                                ?.scrollIntoView(
                                  {
                                    behavior:
                                      "smooth",
                                    block:
                                      "start",
                                  }
                                );
                            },
                            100
                          );
                        }}
                        className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-left transition hover:-translate-y-1 hover:border-red-500/50"
                      >

                        <div className="relative aspect-video overflow-hidden bg-slate-900">

                          {video.thumbnail ? (
                            <img
                              src={
                                video.thumbnail
                              }
                              alt={
                                video.title
                              }
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-4xl">
                              ▶️
                            </div>
                          )}

                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">

                            <span className="rounded-full bg-red-600 px-4 py-3 text-white opacity-0 transition group-hover:opacity-100">
                              ▶
                            </span>

                          </div>

                        </div>

                        <div className="p-5">

                          <div className="flex items-center justify-between gap-3">

                            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                              YouTube
                            </span>

                            <span className="text-xs text-slate-500">
                              {
                                video.channel
                              }
                            </span>

                          </div>

                          <h3 className="mt-4 line-clamp-2 text-lg font-bold text-white group-hover:text-red-300">
                            {
                              video.title
                            }
                          </h3>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                            {
                              video.description
                            }
                          </p>

                          <div className="mt-5 flex items-center justify-between">

                            <span className="text-sm font-semibold text-red-400">
                              Watch Lesson
                            </span>

                            <span className="text-red-400 transition group-hover:translate-x-1">
                              →
                            </span>

                          </div>

                        </div>

                      </button>
                    )
                  )}

                </div>
              ) : (
                !loading && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center">

                    <div className="text-4xl">
                      🔍
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-white">
                      No YouTube resources found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Try another course or technology.
                    </p>

                  </div>
                )
              )}

            </section>
          )}

          {/* ==================================================
              YOUTUBE LEARNING AREA
          ================================================== */}

          {selectedCourse && (
            <section
              id="youtube-learning-area"
              className="scroll-mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
            >

              <div className="border-b border-slate-800 p-6 lg:p-8">

                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={(event) => handleExitCourse(event)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white"
                  >
                    ← Back to Courses
                  </button>

                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                    Learning Mode
                  </span>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
                      YouTube Learning
                    </span>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                      {
                        selectedCourse.title
                      }
                    </h2>

                    <p className="mt-2 text-slate-400">
                      Watch the lessons one by one
                      and complete the course.
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                      {language}
                    </span>

                    <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-300">
                      {
                        selectedCourse
                          .videos
                          ?.length || 0
                      }{" "}
                      Lessons
                    </span>

                  </div>

                </div>

              </div>

              <div className="grid lg:grid-cols-[320px_1fr]">

                {/* ==================================================
                    SIDEBAR
                ================================================== */}

                <CourseSidebar
                  course={
                    selectedCourse
                  }
                  selectedVideo={
                    selectedVideo
                  }
                  completedVideos={
                    completedVideos
                  }
                  onSelectVideo={
                    handleSelectVideo
                  }
                />

                {/* ==================================================
                    PLAYER
                ================================================== */}

                <div className="min-w-0 p-6 lg:p-8">

                  <YoutubePlayer
                    video={
                      selectedVideo
                    }
                    completed={
                      selectedVideo
                        ? completedVideos.includes(
                            selectedVideo.id
                          )
                        : false
                    }
                    onComplete={
                      handleCompleteVideo
                    }
                  />

                  <CourseProgress
                    totalVideos={
                      selectedCourse
                        .videos
                        ?.length || 0
                    }
                    completedVideos={
                      completedVideos.length
                    }
                  />

                  {/* ==================================================
                      NO-REFRESH LESSON NAVIGATION
                  ================================================== */}
                  <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={(event) => handlePreviousLesson(event)}
                      disabled={getCurrentVideoIndex() <= 0}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Previous Lesson
                    </button>

                    <div className="text-center text-xs font-medium text-slate-500">
                      Lesson {Math.max(getCurrentVideoIndex() + 1, 1)} of {selectedCourse.videos?.length || 0}
                    </div>

                    <button
                      type="button"
                      onClick={(event) => handleNextLesson(event)}
                      disabled={
                        getCurrentVideoIndex() < 0 ||
                        getCurrentVideoIndex() >=
                          (selectedCourse.videos?.length || 1) - 1
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next Lesson →
                    </button>
                  </div>

                </div>

              </div>

            </section>
          )}

          {/* ==================================================
              CATEGORIES
          ================================================== */}

          <div id="learning-categories">
            <CategorySection />
          </div>

          {/* ==================================================
              RECOMMENDED SKILLS
          ================================================== */}

          <RecommendedSkills
            onLearn={
              handleSelectCourse
            }
            courses={
              filteredCourses
            }
          />

          {/* ==================================================
              TRENDING COURSES
          ================================================== */}

          <TrendingCourses
            onStartCourse={
              handleSelectCourse
            }
            courses={
              filteredCourses
            }
          />

          {/* ==================================================
              YOUTUBE RESOURCES
          ================================================== */}

          <YoutubeResources
            selectedCourse={
              selectedCourse
            }
            onSelectCourse={
              handleSelectCourse
            }
            courses={
              youtubeResults
            }
          />

          {/* ==================================================
              DOCUMENTATION
          ================================================== */}

          <DocumentationSection />

          {/* ==================================================
              PRACTICE PROBLEMS
          ================================================== */}

          <PracticeProblems />

        </div>
      </main>

      <Footer />

      <AIAssistantButton />

    </DashboardLayout>
  );
}

export default Learn;