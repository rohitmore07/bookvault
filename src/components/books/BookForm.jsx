import { useState } from 'react';
import { Button, Input, Select } from '../common';
import { GENRES } from '../../utils/constants';
import { validateBookForm, hasValidationErrors } from '../../utils/validation';

const emptyForm = {
  title: '',
  author: '',
  genre: '',
  publicationYear: '',
};

export default function BookForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save Book',
  loading = false,
}) {
  const [values, setValues] = useState(() => ({
    ...emptyForm,
    ...initialValues,
    publicationYear: initialValues?.publicationYear?.toString() ?? '',
  }));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const genreOptions = GENRES.filter((g) => g !== 'All');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched) {
      const next = { ...values, [name]: value };
      setErrors(validateBookForm(next));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setErrors(validateBookForm(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    const validationErrors = validateBookForm(values);
    setErrors(validationErrors);
    if (hasValidationErrors(validationErrors)) return;

    await onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre,
      publicationYear: Number(values.publicationYear),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Input
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.title}
        placeholder="e.g. The Great Gatsby"
        required
      />
      <Input
        label="Author"
        name="author"
        value={values.author}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.author}
        placeholder="e.g. F. Scott Fitzgerald"
        required
      />
      <Select
        label="Genre"
        name="genre"
        value={values.genre}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.genre}
        options={[{ value: '', label: 'Select a genre' }, ...genreOptions]}
      />
      <Input
        label="Publication Year"
        name="publicationYear"
        type="number"
        value={values.publicationYear}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.publicationYear}
        placeholder="e.g. 1925"
        min={1000}
        max={new Date().getFullYear()}
        required
      />
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
