import { Link, NavLink } from 'react-router-dom';
import { Button, ThemeToggle } from '../common';

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-brand-50 text-brand-700 dark:bg-brand-600/20 dark:text-brand-300'
      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
  }`;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border dark:border-border-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-transform group-hover:scale-105">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
              BookVault
            </span>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Book Management System
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <NavLink to="/" end className={navLinkClass}>
            Library
          </NavLink>
          <NavLink to="/books/new" className={navLinkClass}>
            Add Book
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/books/new" className="hidden sm:block">
            <Button size="sm">+ Add Book</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
