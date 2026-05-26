import { Link } from 'react-router-dom';
import { Button } from '../components/common';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-display font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6">
        <Button>Go to Library</Button>
      </Link>
    </div>
  );
}
