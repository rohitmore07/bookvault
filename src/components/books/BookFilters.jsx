import { Input, Select } from '../common';
import { GENRES, SORT_OPTIONS } from '../../utils/constants';

export default function BookFilters({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  sort,
  onSortChange,
  resultCount,
}) {
  return (
    <section className="glass rounded-2xl p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Input
            label="Search"
            name="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title or author..."
            aria-label="Search books by title or author"
          />
        </div>
        <Select
          label="Genre"
          name="genre"
          value={genre}
          onChange={(e) => onGenreChange(e.target.value)}
          options={GENRES}
        />
        <Select
          label="Sort by"
          name="sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          options={SORT_OPTIONS}
        />
      </div>
      {resultCount !== undefined && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{resultCount}</span>{' '}
          {resultCount === 1 ? 'book' : 'books'}
        </p>
      )}
    </section>
  );
}
