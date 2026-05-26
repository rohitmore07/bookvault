# BookVault — Book Management System

A modern, production-ready **Book Management System** built with React and Vite. Manage your library with full CRUD operations, search, filters, pagination, dark mode, and a polished responsive UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

## Live Demo

| Resource | Link |
|----------|------|
| **Deployed App** | _Add your Vercel/Netlify URL after deployment_ |
| **GitHub Repository** | _Add your repository URL_ |
| **API (production)** | _Add your hosted JSON Server or MockAPI URL_ |

## Project Overview

BookVault is a dashboard-style web application for managing books. Users can list, add, edit, and delete books with real-time feedback via toast notifications. The app uses a REST API (JSON Server locally, or any hosted mock backend in production) and follows a scalable folder structure with reusable components and Context API state management.

## Features

- **CRUD operations** — Create, read, update, and delete books
- **Book fields** — Title, author, genre, publication year
- **Search** — Debounced search by title or author
- **Filter** — Filter books by genre
- **Sort** — Sort by title, author, or publication year
- **Pagination** — Paginated book grid (6 per page)
- **Dark mode** — Toggle with persisted preference
- **Form validation** — User-friendly inline error messages
- **Loading states** — Skeleton loaders while fetching
- **Error handling** — Retry on API failures with toast feedback
- **Empty states** — Helpful UI when library is empty or no matches
- **Delete confirmation** — Modal before permanent deletion
- **Responsive design** — Mobile, tablet, and desktop layouts

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, Vite 6 |
| Routing | React Router DOM 7 |
| HTTP | Axios |
| Styling | Tailwind CSS 4 |
| State | React Context API |
| Notifications | React Hot Toast |
| API (dev) | JSON Server |
| Deployment | Vercel / Netlify ready |

## Project Structure

```
src/
├── components/
│   ├── common.jsx   # Button, Input, Modal, Spinner, etc.
│   ├── books/       # BookCard, BookForm, BookFilters, Pagination
│   └── layout/      # Header, Footer, Layout
├── pages/           # HomePage, AddBookPage, EditBookPage
├── services/        # API client & bookService
├── hooks/           # useDebounce
├── context/         # BookContext, ThemeContext
├── utils/           # validation, filters, constants
├── routes/          # AppRoutes
├── App.jsx
└── main.jsx
```

## Prerequisites

- **Node.js** 18+ (20 recommended)
- **npm** 9+

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd book-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Copy the example environment file:

```bash
cp .env.example .env
```

Default `.env` for local development:

```env
VITE_API_URL=/api/books
```

Vite proxies `/api` → `http://localhost:3001` (see `vite.config.js`).

### 4. Run the application

Starts **JSON Server** (port 3001) and **Vite** (port 5173) together:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run server` | JSON Server only |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## API Details

### Local (JSON Server)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/books` | List all books |
| `GET` | `/books/:id` | Get one book |
| `POST` | `/books` | Create a book |
| `PUT` | `/books/:id` | Update a book |
| `DELETE` | `/books/:id` | Delete a book |

**Request body (create/update):**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publicationYear": 1925
}
```

Seed data lives in [`db.json`](./db.json).

### Production API options

#### Option A: Deploy JSON Server (Render)

1. Deploy using [`server/render.yaml`](./server/render.yaml) or create a Render web service.
2. **Start command:** `npx json-server --watch db.json --port $PORT --host 0.0.0.0`
3. Set `VITE_API_URL=https://your-api.onrender.com/books` in Vercel/Netlify.

#### Option B: MockAPI

1. Create a project at [mockapi.io](https://mockapi.io).
2. Add a `books` resource with fields: `title`, `author`, `genre`, `publicationYear`.
3. Set `VITE_API_URL=https://YOUR_PROJECT_ID.mockapi.io/v1/books`.

> **Important:** Rebuild and redeploy the frontend after changing `VITE_API_URL`.

## Deployment

### Frontend (Vercel)

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add environment variable: `VITE_API_URL` = your production API URL.
4. Deploy. `vercel.json` handles SPA routing.

### Frontend (Netlify)

1. Import the repo in [Netlify](https://netlify.com).
2. Build command: `npm run build`, publish directory: `dist`.
3. Set `VITE_API_URL` in site environment variables.
4. `netlify.toml` is included for redirects.

### Verify after deployment

- Library loads books from the hosted API
- Add, edit, and delete work end-to-end
- Toasts appear on success and error

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes (prod) | Base URL for books API (e.g. `/api/books` or full hosted URL) |

## Git Commit Practices

This project uses clear, conventional commits:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation
- `style:` UI/styling
- `refactor:` code structure
- `chore:` tooling and config

Example:

```bash
git add .
git commit -m "feat: add debounced search and genre filter"
```

## Bonus Features Included

- Pagination
- Dark mode
- Debounced search
- Sorting
- Modal animations
- Skeleton loading states

## License

MIT — free to use for learning and portfolio projects.

---

Built with care for modern React best practices.
