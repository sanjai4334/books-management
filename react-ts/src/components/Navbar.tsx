import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Book from "../types/Book";

function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const books = useSelector((state: RootState) => 
        Object.values(state.books.books) as Book[]
    );

    const filteredBooks = books
        .filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 6);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Books Management</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites">Favorites</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/advanced-search">Advanced Search</Link>
                        </li>
                    </ul>

                    <div className="d-flex position-relative" ref={dropdownRef}>
                        <input
                            className="form-control mx-2"
                            type="search"
                            placeholder="Search books by name..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsDropdownOpen(e.target.value.length > 0);
                            }}
                        />
                        
                        {isDropdownOpen && filteredBooks.length > 0 && (
                            <div className="position-absolute top-100 start-0 end-0 mx-2 mt-1 bg-white rounded shadow-lg" 
                                 style={{ zIndex: 1000, overflowY: 'auto' }}>
                                {filteredBooks.map(book => (
                                    <Link 
                                        key={book._id}
                                        to={`${import.meta.env.VITE_BOOK_DETAIL_URL}/book/${book._id}`}
                                        className="text-decoration-none text-dark"
                                        onClick={() => {
                                            setSearchTerm('');
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <div className="d-flex p-2 border-bottom hover-bg-light">
                                            <div className="me-2" style={{ width: '50px', height: '50px' }}>
                                                <img
                                                    src={book.thumbnailUrl || 'placeholder-image-url'}
                                                    alt={book.title}
                                                    className="img-fluid h-100 w-100 object-fit-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = 'https://placehold.co/50x50?text=No+Image';
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="fw-bold text-truncate">{book.title}</div>
                                                <div className="small text-muted">
                                                    {book.authors?.join(", ") || "Unknown Author"} • {book.pageCount} pages
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
