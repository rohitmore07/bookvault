import { CURRENT_YEAR, MIN_PUBLICATION_YEAR } from './constants';

export function validateBookForm(values) {
  const errors = {};

  const title = values.title?.trim() ?? '';
  const author = values.author?.trim() ?? '';
  const genre = values.genre?.trim() ?? '';
  const year = values.publicationYear;

  if (!title) {
    errors.title = 'Title is required';
  } else if (title.length < 2) {
    errors.title = 'Title must be at least 2 characters';
  } else if (title.length > 200) {
    errors.title = 'Title must be under 200 characters';
  }

  if (!author) {
    errors.author = 'Author is required';
  } else if (author.length < 2) {
    errors.author = 'Author must be at least 2 characters';
  }

  if (!genre || genre === 'All') {
    errors.genre = 'Please select a valid genre';
  }

  const yearNum = Number(year);
  if (!year && year !== 0) {
    errors.publicationYear = 'Publication year is required';
  } else if (Number.isNaN(yearNum) || !Number.isInteger(yearNum)) {
    errors.publicationYear = 'Enter a valid year';
  } else if (yearNum < MIN_PUBLICATION_YEAR || yearNum > CURRENT_YEAR) {
    errors.publicationYear = `Year must be between ${MIN_PUBLICATION_YEAR} and ${CURRENT_YEAR}`;
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}
