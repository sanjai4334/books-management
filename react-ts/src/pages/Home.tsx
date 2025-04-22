import books from "../book-data";
import BookCard from "../components/BookCard";


function Home() {
    return (
        <div className="container-fluid mt-5 px-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {books.map((book, index) => (
                    <div className="col" key={book.isbn}>
                        <BookCard book={book} number={index}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;