import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    title: string;
    isbn: string;
    pageCount: number;
    dateFrom: string;
    dateTo: string;
    status: string;
    authors: string[];
    categories: string[];
    isSearchActive: boolean;
}

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
        clearSearch: (state) => {
            return { ...initialState };
        }
    }
});

export const { setSearchCriteria, clearSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
