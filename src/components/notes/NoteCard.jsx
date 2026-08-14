import {
  FaStar,
  FaRegStar,
  FaEdit,
  FaTrash,
  FaEye,
  FaClock,
} from "react-icons/fa";

function NoteCard({
  id,
  title = "React Hooks",
  description = "Learn useState, useEffect, useContext, useMemo and useCallback with examples.",
  category = "Programming",
  updated = "2 hours ago",
  favorite = false,

  onToggleFavorite,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500">

      {/* Top Gradient */}

      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between">

          <span className="rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-300">
            {category}
          </span>

          {/* Favorite */}

          <button
            type="button"
            onClick={() => onToggleFavorite?.(id)}
            className="text-yellow-400 transition hover:scale-110"
            title={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? <FaStar /> : <FaRegStar />}
          </button>

        </div>

        {/* Title */}

        <h2 className="mt-6 line-clamp-1 text-2xl font-bold text-white">
          {title}
        </h2>

        {/* Description */}

        <p className="mt-4 line-clamp-3 leading-7 text-slate-400">
          {description}
        </p>

        {/* Updated */}

        <div className="mt-6 flex items-center gap-2 text-slate-500">
          <FaClock />
          <span>{updated}</span>
        </div>

        {/* Divider */}

        <div className="my-6 border-t border-slate-800" />

        {/* Actions */}

        <div className="flex items-center justify-between">

          {/* View */}

          <button
            type="button"
            onClick={() => onView?.(id)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
          >
            <FaEye />
            View
          </button>

          <div className="flex gap-3">

            {/* Edit */}

            <button
              type="button"
              onClick={() => onEdit?.(id)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-blue-600"
              title="Edit note"
            >
              <FaEdit />
            </button>

            {/* Delete */}

            <button
              type="button"
              onClick={() => onDelete?.(id)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-white transition hover:bg-red-600"
              title="Delete note"
            >
              <FaTrash />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NoteCard;