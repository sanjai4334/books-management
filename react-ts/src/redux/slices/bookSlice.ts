import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Book from "../../types/Book";
import BookState from "../../types/BookState";

const initialState: BookState = {
    books: {},
    bookIDs: [],
    favoriteIDs: [],
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload.reduce((books, book) => {
                books[book._id] = book;  // use book._id as key
                return books;
            }, {} as Record<number, Book>);
            state.bookIDs = Object.keys(state.books).map((key) => Number(key));
        },
        favoriteBook: (state, action: PayloadAction<number>) => {
            const bookId = action.payload;
            const book = state.books[bookId];
            
            if (book) {
                book.favorite = !book.favorite;
                if (book.favorite) {
                    if (!state.favoriteIDs.includes(bookId)) {
                        state.favoriteIDs.push(bookId);
                    }
                } else {
                    state.favoriteIDs = state.favoriteIDs.filter(id => id !== bookId);
                }
            }
        }
    },
});

export const { setBooks, favoriteBook } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;