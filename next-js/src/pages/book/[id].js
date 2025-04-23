import books from '@/data/book-data.json';
import { useRouter } from 'next/router';

export default function BookDetails() {
    const router = useRouter();
    const { id } = router.query;
    const book = books.find((book) => book._id == id);
    

    if (!book) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    Book not found. <button onClick={() => router.push('/')}>Go back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="card shadow-lg rounded-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <h2 className="fs-2 fw-bold">{book.title}</h2>
                            <p className="text-muted mb-2">ID: {book._id}</p>

                            <div className="mb-2">
                                <strong>Authors: </strong>
                                {book.authors.map((author, index) => (
                                    <span key={index} className="badge bg-primary me-1">
                                        {author}
                                    </span>
                                ))}
                            </div>

                            <p className="text-muted mb-2">ISBN: {book.isbn}</p>
                            <p className="text-muted mb-2">
                                Published:{" "}
                                {new Date(book.publishedDate.$date).toLocaleDateString()}
                            </p>
                            <p className="text-muted mb-3">Pages: {book.pageCount}</p>

                            <div className="mb-3">
                                <strong>Status: </strong>
                                <span
                                    className={`badge ${book.status === "PUBLISH" ? "bg-success" : "bg-secondary"
                                        }`}
                                >
                                    {book.status}
                                </span>
                            </div>

                            {book.categories.length > 0 && (
                                <div className="mb-3">
                                    <strong>Categories: </strong>
                                    {book.categories.map((cat, index) => (
                                        <span key={index} className="badge bg-warning text-dark me-1">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="col-6">
                            <img
                                src={book.thumbnailUrl}
                                alt={book.title}
                                className="img-fluid col-6"
                            />
                        </div>
                    </div>

                    {book.shortDescription && (
                        <p className="mb-2">
                            <strong>Short Description: </strong>
                            {book.shortDescription}
                        </p>
                    )}

                    {book.longDescription && (
                        <p className="mb-3">
                            <strong>Long Description: </strong>
                            {book.longDescription}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}