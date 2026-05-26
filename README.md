# Bookvault - Book Management System

A modern, production-ready **Book Management System** built with React and Vite. Manage your library with full CRUD operations, search, filters, pagination, dark mode and a polished responsive UI.

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)

## Live Demo

| Resource | Link |
|----------|------|
| **Deployed App** | https://bookvault-1.vercel.app/ |
| **API** | https://6a1567f091ff9a63de081535.mockapi.io/books |
## Project Overview

BookVault is a dashboard-style web application for managing books. Users can list, add, edit and delete books with real-time feedback via toast notifications. The app uses a REST API (JSON Server locally or any hosted mock backend in production) and follows a scalable folder structure with reusable components and Context API state management.

## Features

- **CRUD operations** : Create, read, update and delete books
- **Book fields** : Title, author, genre, publication year
- **Search** : Debounced search by title or author
- **Filter** : Filter books by genre
- **Sort** : Sort by title, author or publication year
- **Pagination** : Paginated book grid (6 per page)
- **Dark mode** : Toggle with persisted preference
- **Form validation** : User-friendly inline error messages
- **Loading states** : Skeleton loaders while fetching
- **Error handling** : Retry on API failures with toast feedback
- **Empty states** : Helpful UI when library is empty or no matches
- **Delete confirmation** : Modal before permanent deletion
- **Responsive design** : Mobile, tablet and desktop layouts

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React, Vite |
| Routing | React Router DOM |
| HTTP | Axios |
| Styling | Tailwind CSS |
| State | React Context API |
| Notifications | React Hot Toast |
| API (dev) | JSON Server |
| Deployment | Vercel Ready |

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bookvault.git
cd bookvault
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
VITE_API_URL=https://6a1567f091ff9a63de081535.mockapi.io/books
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will start on:

```bash
http://localhost:5173
```

