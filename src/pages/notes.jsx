import { useMemo, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import NotesHero from "../components/notes/NotesHero";
import NotesToolbar from "../components/notes/NotesToolbar";
import NotesGrid from "../components/notes/NotesGrid";
import AINotesGenerator from "../components/notes/AINotesGenerator";

import AIAssistantButton from "../components/common/AIAssistantButton";
import Footer from "../components/common/Footer";

function Notes() {
  // =========================
  // SEARCH / FILTER STATE
  // =========================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Newest First");
  const [showFavorites, setShowFavorites] = useState(false);

  // =========================
  // AI GENERATOR STATE
  // =========================

  const [showAIGenerator, setShowAIGenerator] = useState(false);

  // =========================
  // NOTES
  // =========================

  const [notes] = useState([
    {
      id: 1,
      title: "React Hooks",
      description:
        "Learn useState, useEffect, useContext, useMemo and useCallback with practical examples.",
      category: "Programming",
      updated: "2 hours ago",
      favorite: true,
    },
    {
      id: 2,
      title: "Java OOP",
      description:
        "Understand Classes, Objects, Inheritance, Polymorphism, Encapsulation and Abstraction.",
      category: "Java",
      updated: "Yesterday",
      favorite: false,
    },
    {
      id: 3,
      title: "DBMS Normalization",
      description:
        "Study 1NF, 2NF, 3NF, BCNF and database normalization techniques.",
      category: "Database",
      updated: "3 days ago",
      favorite: true,
    },
    {
      id: 4,
      title: "Machine Learning",
      description:
        "Introduction to supervised, unsupervised learning and model evaluation.",
      category: "AI & ML",
      updated: "1 week ago",
      favorite: false,
    },
    {
      id: 5,
      title: "Operating Systems",
      description:
        "Process Scheduling, Deadlocks, Memory Management and Synchronization.",
      category: "Computer Science",
      updated: "4 days ago",
      favorite: false,
    },
    {
      id: 6,
      title: "Cloud Computing",
      description:
        "Understand IaaS, PaaS, SaaS, Virtual Machines, Docker and Kubernetes.",
      category: "Cloud",
      updated: "Today",
      favorite: true,
    },
  ]);

  // =========================
  // FILTER NOTES
  // =========================

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.description.toLowerCase().includes(query) ||
          note.category.toLowerCase().includes(query)
      );
    }

    // Category
    if (category !== "All Categories") {
      result = result.filter(
        (note) => note.category === category
      );
    }

    // Favorites
    if (showFavorites) {
      result = result.filter(
        (note) => note.favorite
      );
    }

    // Sorting
    if (sort === "A-Z") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "Z-A") {
      result.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return result;
  }, [
    notes,
    search,
    category,
    sort,
    showFavorites,
  ]);

  // =========================
  // FAVORITE
  // =========================

  const handleToggleFavorite = (id) => {
    console.log("Favorite clicked:", id);

    // Your NotesGrid can still handle the UI.
    // If you want persistent favorites later,
    // we can connect this to Supabase.
  };

  // =========================
  // VIEW
  // =========================

  const handleView = (id) => {
    const note = notes.find(
      (item) => item.id === id
    );

    if (!note) return;

    window.alert(
      `${note.title}\n\n${note.description}`
    );
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (id) => {
    console.log("Edit clicked:", id);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id) => {
    console.log("Delete clicked:", id);
  };

  return (
    <DashboardLayout>

      <div className="min-h-screen bg-slate-950">

        <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">

          {/* =========================
              HERO
          ========================= */}

          <NotesHero
            search={search}
            setSearch={setSearch}
            onGenerateAI={() =>
              setShowAIGenerator(true)
            }
          />

          {/* =========================
              TOOLBAR
          ========================= */}

          <NotesToolbar
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />

          {/* =========================
              AI NOTES GENERATOR
          ========================= */}

          {showAIGenerator && (
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowAIGenerator(false)
                }
                className="absolute right-5 top-5 z-10 text-xl text-slate-400 transition hover:text-white"
              >
                ✕
              </button>

              <AINotesGenerator />

            </div>
          )}

          {/* =========================
              NOTES GRID
          ========================= */}

          <NotesGrid
            notes={filteredNotes}
            onToggleFavorite={handleToggleFavorite}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>

      </div>

      <Footer />

      <AIAssistantButton />

    </DashboardLayout>
  );
}

export default Notes;