import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useBooks } from '../context/BookContext';
import BookForm from '../components/books/BookForm';
export default function AddBookPage() {
  const navigate = useNavigate();
  const { addBook } = useBooks();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (book) => {
    setLoading(true);
    try {
      await addBook(book);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          Add New Book
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Fill in the details below to add a book to your collection.
        </p>
      </div>

      <div className="rounded-2xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-6 shadow-sm sm:p-8">
        <BookForm onSubmit={handleSubmit} submitLabel="Add Book" loading={loading} />
      </div>
    </div>
  );
}
