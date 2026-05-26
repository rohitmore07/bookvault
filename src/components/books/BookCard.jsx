import { Link } from 'react-router-dom';
import { Button } from '../common';

const genreColors = {
  Fiction: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  'Non-Fiction': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Science Fiction': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  Fantasy: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Dystopian: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Mystery: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
};

export default function BookCard({ book, onDelete }) {
  const badgeClass = genreColors[book.genre] || genreColors.default;

  return (
    <article className="group flex flex-col rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-6 card-hover shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
        >
          {book.genre}
        </span>
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          {book.publicationYear}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold leading-tight text-slate-900 dark:text-white line-clamp-2">
        {book.title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        by <span className="font-medium text-slate-700 dark:text-slate-300">{book.author}</span>
      </p>

      <div className="mt-auto flex gap-2 pt-6">
        <Link to={`/books/${book.id}/edit`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(book)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}
