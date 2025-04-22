import { useState } from "react";
import Book from "../types/Book";

function BookCard({ book, number }: { book: Book, number: number }) {
    const [isFavorite, setIsFavorite] = useState(book.favorite || false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="card h-100 shadow-sm">
            <div className="position-relative">
                <img
                    src={book.thumbnailUrl}
                    className="card-img-top"
                    alt={book.title}
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <button
                    className={`bg-transparent position-absolute top-0 end-0 btn p-2 ${
                        isFavorite ? "text-danger" : ""
                    }`}
                    style={{ outline: "none", border: "none" }}
                    onClick={toggleFavorite}
                >
                    <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                </button>
            </div>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{book.title}</h5>
                <div className="text-muted small mb-3">
                    {book.authors?.join(", ") || "Unknown Author"}
                </div>
                <div className="small mb-3">
                    <div className="text-muted mb-1">
                        <i className="bi bi-calendar-event me-2"></i>
                        Published: {new Date(book.publishedDate.$date).toLocaleDateString()}
                    </div>
                    <div className="text-muted mb-1">
                        <i className="bi bi-book me-2"></i>
                        {book.pageCount} pages
                    </div>
                    <div className="text-muted mb-1">
                        <i className="bi bi-upc me-2"></i>
                        ISBN: {book.isbn}
                    </div>
                </div>
                <div className="mt-auto">
                    <a className="btn btn-outline-primary w-100" href={`http://localhost:3000/book/${number}`}>View Details</a>
                </div>
            </div>
        </div>
    );
}

export default BookCard;