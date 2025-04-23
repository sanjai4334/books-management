import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCriteria, clearSearch } from '../redux/slices/searchSlice';
import BookDisplay from '../components/BookDisplay';
import Book from '../types/Book';
import { RootState } from '../redux/store';
import Typing from '../components/inputs/Typing';

interface FormState {
    title: string;
    isbn: string;
    pageCount: string;
    dateFrom: string;
    dateTo: string;
    status: string;
    authors: string;
}

function AdvancedSearch() {
    const [formData, setFormData] = useState<FormState>({
        title: '',
        isbn: '',
        pageCount: '',
        dateFrom: '',
        dateTo: '',
        status: '',
        authors: ''
    });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = [
        "Java", "Internet", "Web Development", 
        "Software Engineering", "Programming",
        "JavaScript", "Mobile"
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchData = {
            ...formData,
            pageCount: parseInt(formData.pageCount) || 0,
            categories: selectedCategories,
            authors: formData.authors.split(',').map(a => a.trim())
        };
        dispatch(setSearchCriteria(searchData));
    };

    const handleClear = () => {
        setFormData({
            title: '',
            isbn: '',
            pageCount: '',
            dateFrom: '',
            dateTo: '',
            status: '',
            authors: ''
        });
        setSelectedCategories([]);
        dispatch(clearSearch());
    };

    const books: Book[] = useSelector((state: RootState) => state.books.bookIDs.map((id: number) => state.books.books[id]));
    const searchCriteria = useSelector((state: RootState) => state.search);

    const filteredBooks = books.filter(book => {
        if (!searchCriteria.isSearchActive) return true;

        const matchesTitle = !searchCriteria.title || book.title.toLowerCase().includes(searchCriteria.title.toLowerCase());
        const matchesIsbn = !searchCriteria.isbn || book.isbn.includes(searchCriteria.isbn);
        const matchesPageCount = !searchCriteria.pageCount || book.pageCount >= searchCriteria.pageCount;
        const matchesStatus = !searchCriteria.status || book.status.toLowerCase() === searchCriteria.status.toLowerCase();
        
        const matchesDate = (!searchCriteria.dateFrom || new Date(book.publishedDate.$date) >= new Date(searchCriteria.dateFrom)) &&
                           (!searchCriteria.dateTo || new Date(book.publishedDate.$date) <= new Date(searchCriteria.dateTo));
        
        const matchesAuthors = searchCriteria.authors.length === 0 || 
            searchCriteria.authors.every(author => 
                book.authors.some(a => a.toLowerCase().includes(author.toLowerCase()))
            );

        const matchesCategories = searchCriteria.categories.length === 0 ||
            searchCriteria.categories.every(category => book.categories.includes(category));

        return matchesTitle && matchesIsbn && matchesPageCount && matchesStatus && 
               matchesDate && matchesAuthors && matchesCategories;
    });

    return (
        <div>
            <div className="container py-5">

            <h2 className="mb-4">Advanced Search</h2>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <Typing 
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    
                    <Typing 
                        type="number"
                        label="ISBN"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                    />
                    
                    <Typing 
                        type="number"
                        label="Page Count"
                        name="pageCount"
                        value={formData.pageCount}
                        onChange={handleInputChange}
                    />

                    <Typing 
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    />


                    <div className="col-md-6">
                        <label className="form-label">Published Date Range</label>
                        <div className="row g-2">
                            <div className="col-6">
                                <input
                                    type="date"
                                    name="dateFrom"
                                    className="form-control"
                                    value={formData.dateFrom}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="date"
                                    name="dateTo"
                                    className="form-control"
                                    value={formData.dateTo}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Authors (comma separated)</label>
                        <input
                            type="text"
                            name="authors"
                            className="form-control"
                            value={formData.authors}
                            onChange={handleInputChange}
                            placeholder="author1, author2, ..."
                        />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Categories</label>
                        <div className="row g-3">
                            {categories.map(category => (
                                <div className="col-md-3" key={category}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                            id={`category-${category}`}
                                        />
                                        <label 
                                            className="form-check-label" 
                                            htmlFor={`category-${category}`}
                                        >
                                            {category}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary me-2">
                            Search
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
            {
                searchCriteria.isSearchActive ? (
                    <div className="alert alert-warning mt-4">
                        No books matched.
                    </div>
                ) : <BookDisplay books={filteredBooks}/>
            }
        </div>
    );
}

export default AdvancedSearch;