import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./slices/bookSlice";
import { searchReducer } from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;