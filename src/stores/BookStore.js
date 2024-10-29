import { create } from 'zustand';
import myFetch from '../services/api';

export const BookStore = create((set, get) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async (userId) => {
    console.log('Fetching books from store: ', userId);
    set({ loading: true, error: null });
    try {
      const response = await myFetch(`/users-books/${userId}`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log('books', data);
      set({ books: data });
    } catch (error) {
      set({ error });
    } finally {
      set({ loading: false });
    }
  },

  getAllBooks: () => get().books,

  getBookById: (id) => {
    const book = get().books.find(
      (userBook) => userBook.id === parseInt(id, 10)
    );
    return book || null;
  },

  getReadBooks: () => {
    return get().books.filter((book) => book.dateFinished);
  },

  getCurrentlyReadingBooks: () => {
    return get().books.filter((book) => book.dateStarted && !book.dateFinished);
  },

  getWantToReadBooks: () => {
    return get().books.filter(
      (book) => !book.dateStarted && !book.dateFinished
    );
  },
}));
