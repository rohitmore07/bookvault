export const GENRES = [
  'All',
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Romance',
  'Thriller',
  'Biography',
  'History',
  'Dystopian',
  'Horror',
  'Poetry',
  'Other',
];

export const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Title (A–Z)' },
  { value: 'title-desc', label: 'Title (Z–A)' },
  { value: 'year-desc', label: 'Year (Newest)' },
  { value: 'year-asc', label: 'Year (Oldest)' },
  { value: 'author-asc', label: 'Author (A–Z)' },
];

export const ITEMS_PER_PAGE = 6;

export const CURRENT_YEAR = new Date().getFullYear();

export const MIN_PUBLICATION_YEAR = 1000;
