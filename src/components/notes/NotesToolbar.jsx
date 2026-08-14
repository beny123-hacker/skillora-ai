function NotesToolbar({
  category,
  setCategory,
  sort,
  setSort,
  showFavorites,
  setShowFavorites,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:flex-row md:items-center md:justify-end">

      {/* CATEGORY */}

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
      >
        <option>All Categories</option>
        <option>Programming</option>
        <option>Java</option>
        <option>AI & ML</option>
        <option>Database</option>
        <option>Cloud</option>
        <option>Computer Science</option>
        <option>Interview</option>
      </select>

      {/* SORT */}

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
      >
        <option>Newest First</option>
        <option>A-Z</option>
        <option>Z-A</option>
      </select>

      {/* FAVORITES */}

      <button
        type="button"
        onClick={() =>
          setShowFavorites(!showFavorites)
        }
        className={`rounded-xl px-5 py-3 font-semibold transition ${
          showFavorites
            ? "bg-yellow-500 text-white"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }`}
      >
        ⭐ Favorites
      </button>

    </div>
  );
}

export default NotesToolbar;