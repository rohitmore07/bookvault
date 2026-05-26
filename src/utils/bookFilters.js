export function filterAndSortBooks(books, { search, genre, sort }) {
  let result = [...books];

  const query = search?.trim().toLowerCase();
  if (query) {
    result = result.filter(
      (book) =>
        book.title?.toLowerCase().includes(query) ||
        book.author?.toLowerCase().includes(query)
    );
  }

  if (genre && genre !== 'All') {
    result = result.filter(
      (book) => book.genre?.toLowerCase() === genre.toLowerCase()
    );
  }

  switch (sort) {
    case 'title-desc':
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'year-desc':
      result.sort((a, b) => b.publicationYear - a.publicationYear);
      break;
    case 'year-asc':
      result.sort((a, b) => a.publicationYear - b.publicationYear);
      break;
    case 'author-asc':
      result.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case 'title-asc':
    default:
      result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
}

export function paginateBooks(books, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(books.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: books.slice(start, start + perPage),
    totalPages,
    currentPage: safePage,
    totalItems: books.length,
  };
}
