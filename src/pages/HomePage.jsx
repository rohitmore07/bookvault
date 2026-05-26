import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useBooks } from '../context/BookContext';
import { useDebounce } from '../hooks/useDebounce';
import BookCard from '../components/books/BookCard';
import BookFilters from '../components/books/BookFilters';
import Pagination from '../components/books/Pagination';
import {
  Button,
  EmptyState,
  Modal,
  ModalActions,
  BookGridSkeleton,
} from '../components/common';
import { filterAndSortBooks, paginateBooks } from '../utils/bookFilters';
import { ITEMS_PER_PAGE } from '../utils/constants';

export default function HomePage() {
  const { books, loading, error, fetchBooks, deleteBook } = useBooks();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('title-asc');
  const [page, setPage] = useState(1);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(
    () =>
      filterAndSortBooks(books, {
        search: debouncedSearch,
        genre,
        sort,
      }),
    [books, debouncedSearch, genre, sort]
  );

  const { items, totalPages, currentPage } = useMemo(
    () => paginateBooks(filtered, page, ITEMS_PER_PAGE),
    [filtered, page]
  );

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleGenreChange = (value) => {
    setGenre(value);
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    setDeleting(true);
    try {
      await deleteBook(bookToDelete.id);
      setBookToDelete(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Your Library
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Browse, search, and manage your book collection.
          </p>
        </div>
        <Link to="/books/new" className="sm:hidden">
          <Button className="w-full">+ Add Book</Button>
        </Link>
      </div>

      <BookFilters
        search={search}
        onSearchChange={handleSearchChange}
        genre={genre}
        onGenreChange={handleGenreChange}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      {loading && <BookGridSkeleton />}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/50">
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <Button variant="secondary" className="mt-4" onClick={fetchBooks}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <EmptyState
          title="Your library is empty"
          description="Add your first book to start building your collection."
          action={
            <Link to="/books/new">
              <Button>+ Add Your First Book</Button>
            </Link>
          }
        />
      )}

      {!loading && !error && books.length > 0 && filtered.length === 0 && (
        <EmptyState
          title="No matching books"
          description="No books match your current search or filter. Try different criteria."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setSearch('');
                setGenre('All');
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          }
        />
      )}

      {!loading && !error && items.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onDelete={setBookToDelete}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <Modal
        isOpen={!!bookToDelete}
        onClose={() => !deleting && setBookToDelete(null)}
        title="Delete Book"
        footer={
          <ModalActions
            onCancel={() => setBookToDelete(null)}
            onConfirm={handleConfirmDelete}
            confirmLabel="Delete"
            loading={deleting}
            danger
          />
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to delete{' '}
          <strong className="text-slate-900 dark:text-white">
            &ldquo;{bookToDelete?.title}&rdquo;
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
