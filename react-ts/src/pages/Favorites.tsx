import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

function Favorites() {
  const favoriteBooks = useSelector((state: RootState) =>
    state.books.favoriteIDs.map((id: number) => state.books.books[id])
  );
  return (
    <div className="container-fluid mt-5 px-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {favoriteBooks.length < 1 ? (
          <div className="col alert alert-warning mt-4">No books added to favorite, like some books in <Link to="/">Home</Link>.</div>
        ) : (
          favoriteBooks.map((book) => (
            <div className="col" key={book._id}>
              <BookCard book={book} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;