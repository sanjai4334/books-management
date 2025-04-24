import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import SearchState from "../../types/SearchState";

const initialState: SearchState = {
    title: '',
    isbn: '',
    pageCount: 0,
    dateFrom: '',
    dateTo: '',
    status: '',
    authors: [],
    categories: [],
    isSearchActive: false
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchCriteria: (state, action: PayloadAction<Partial<SearchState>>) => {
            return { ...state, ...action.payload, isSearchActive: true };
        },
        clearSearch: () => {
            return { ...initialState };
        }
    }
});

export const { setSearchCriteria, clearSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
