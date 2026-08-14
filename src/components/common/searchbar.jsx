import { FaSearch, FaMicrophone, FaTimes } from "react-icons/fa";
import { useState } from "react";

function SearchBar({
  placeholder = "Search anything...",
  onSearch,
}) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(search);
    }
  };

  const clearSearch = () => {
    setSearch("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 shadow-lg hover:border-indigo-500 transition-all duration-300">

        <FaSearch className="text-slate-400 text-lg" />

        <input
          type="text"
          value={search}
          placeholder={placeholder}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none px-4 text-white placeholder:text-slate-500"
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="mr-3 text-slate-400 hover:text-white transition"
          >
            <FaTimes />
          </button>
        )}

        <button
          type="button"
          className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center text-white"
        >
          <FaMicrophone />
        </button>

      </div>
    </form>
  );
}

export default SearchBar;