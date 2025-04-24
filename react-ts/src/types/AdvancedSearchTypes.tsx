export interface FormState {
    title: string;
    isbn: string;
    pageCount: string;
    dateFrom: string;
    dateTo: string;
    status: string;
    authors: string;
}

export interface ValidationErrors {
    title?: string;
    isbn?: string;
    pageCount?: string;
    authors?: string;
}