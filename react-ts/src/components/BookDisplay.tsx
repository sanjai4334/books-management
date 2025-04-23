import Book from "../types/Book";
import BookCard from "./BookCard";

function BookDisplay({ books }: {books: Book[]}) {

    return (
        <div className="container-fluid mt-5 px-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {books.map((book) => (
                    <div className="col" key={book._id}>
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
        </div>
    );

}

export default BookDisplay;