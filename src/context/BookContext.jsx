import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { bookService } from '../services/bookService';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getAll();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = useCallback(async (book) => {
    const created = await bookService.create(book);
    setBooks((prev) => [...prev, created]);
    toast.success('Book added successfully');
    return created;
  }, []);

  const updateBook = useCallback(async (id, book) => {
    const updated = await bookService.update(id, book);
    setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
    toast.success('Book updated successfully');
    return updated;
  }, []);

  const deleteBook = useCallback(async (id) => {
    await bookService.remove(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast.success('Book deleted successfully');
  }, []);

  const getBookById = useCallback(
    (id) => books.find((b) => String(b.id) === String(id)),
    [books]
  );

  const value = useMemo(
    () => ({
      books,
      loading,
      error,
      fetchBooks,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
    }),
    [
      books,
      loading,
      error,
      fetchBooks,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
    ]
  );

  return (
    <BookContext.Provider value={value}>{children}</BookContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks must be used within BookProvider');
  return ctx;
}
