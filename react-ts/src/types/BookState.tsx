import Book from "./Book"

export default interface BookState { 
    books: { 
        [id: number]: Book 
    }, 
    bookIDs: number[], 
    favoriteIDs: number[]
};