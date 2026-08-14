import NoteCard from "./NoteCard";

function NotesGrid({
  notes = [],
  onToggleFavorite,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <section className="mt-12">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            📚 My Notes
          </h2>

          <p className="mt-2 text-slate-400">
            Your saved notes are displayed here.
          </p>

        </div>

        <span className="rounded-full bg-indigo-600 px-5 py-2 font-semibold text-white">
          {notes.length} Notes
        </span>

      </div>

      {/* Empty State */}

      {notes.length === 0 ? (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">

          <div className="text-5xl">
            📝
          </div>

          <h3 className="mt-5 text-xl font-bold text-white">
            No notes found
          </h3>

          <p className="mt-2 text-slate-400">
            Try changing your search or filters.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

          {notes.map((note) => (

            <NoteCard
              key={note.id}

              id={note.id}

              title={note.title}

              description={note.description}

              category={note.category}

              updated={note.updated}

              favorite={note.favorite}

              onToggleFavorite={onToggleFavorite}

              onView={onView}

              onEdit={onEdit}

              onDelete={onDelete}
            />

          ))}

        </div>

      )}

    </section>
  );
}

export default NotesGrid;