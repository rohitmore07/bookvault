import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useBooks } from '../context/BookContext';
import { bookService } from '../services/bookService';
import BookForm from '../components/books/BookForm';
import { Button, Spinner } from '../components/common';

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBook, getBookById } = useBooks();
  const [book, setBook] = useState(() => getBookById(id));
  const [loadingBook, setLoadingBook] = useState(!book);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (book) return;

    let cancelled = false;

    async function load() {
      setLoadingBook(true);
      setLoadError(null);
      try {
        const data = await bookService.getById(id);
        if (!cancelled) setBook(data);
      } catch (err) {
        if (!cancelled) setLoadError(err.message);
      } finally {
        if (!cancelled) setLoadingBook(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id, book]);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      await updateBook(id, values);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingBook) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (loadError || !book) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="text-red-600 dark:text-red-400">
          {loadError || 'Book not found'}
        </p>
        <Link to="/" className="mt-4 inline-block">
          <Button variant="secondary">Back to library</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to library
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">
          Edit Book
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Update the details for &ldquo;{book.title}&rdquo;.
        </p>
      </div>

      <div className="rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-6 shadow-sm sm:p-8">
        <BookForm
          initialValues={book}
          onSubmit={handleSubmit}
          submitLabel="Update Book"
          loading={saving}
        />
      </div>
    </div>
  );
}
