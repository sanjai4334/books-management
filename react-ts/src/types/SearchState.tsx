export default interface SearchState {
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