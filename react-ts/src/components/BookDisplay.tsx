import { useState } from 'react';
import Book from "../types/Book";
import BookCard from "./BookCard";

function BookDisplay({ books }: {books: Book[]}) {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;
    
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(books.length / booksPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return ( 
        <div className="container-fluid mt-5 px-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {currentBooks.map((book) => (
                    <div className="col" key={book._id}>
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
            
            {books.length > booksPerPage && (
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                                    Previous
                                </button>
                            </li>
                            
                            
                            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(1)}>1</button>
                            </li>

                            
                            {currentPage > 3 && <li className="page-item disabled"><span className="page-link">...</span></li>}

                            
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                if (
                                    pageNumber !== 1 &&
                                    pageNumber !== totalPages &&
                                    (
                                        (currentPage <= 3 && pageNumber <= 4) ||
                                        (currentPage >= totalPages - 2 && pageNumber >= totalPages - 3) ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    )
                                ) {
                                    return (
                                        <li key={index} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(pageNumber)}>
                                                {pageNumber}
                                            </button>
                                        </li>
                                    );
                                }
                                return null;
                            })}

                            
                            {currentPage < totalPages - 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}

                            
                            {totalPages > 1 && (
                                <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(totalPages)}>{totalPages}</button>
                                </li>
                            )}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default BookDisplay;