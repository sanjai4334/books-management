import { useSelector } from "react-redux";
import Book from "../types/Book";
import { RootState } from "../redux/store";
import BookDisplay from "../components/BookDisplay";

function Home() {
    const books: Book[] = useSelector((state: RootState) => state.books.bookIDs.map((id: number) => state.books.books[id]));
    
    return (
        <BookDisplay books={books} />
    );
}

export default Home;