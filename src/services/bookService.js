import api from './api';

const RESOURCE = '/books';

export const bookService = {
  async getAll() {
    const { data } = await api.get(RESOURCE);
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`${RESOURCE}/${id}`);
    return data;
  },

  async create(book) {
    const { data } = await api.post(RESOURCE, book);
    return data;
  },

  async update(id, book) {
    const { data } = await api.put(`${RESOURCE}/${id}`, book);
    return data;
  },

  async remove(id) {
    await api.delete(`${RESOURCE}/${id}`);
    return id;
  },
};