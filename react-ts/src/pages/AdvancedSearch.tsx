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

interface ValidationErrors {
    title?: string;
    isbn?: string;
    pageCount?: string;
    authors?: string;
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
    const [errors, setErrors] = useState<ValidationErrors>({});
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

    const isFormValid = () => {
        const newErrors: ValidationErrors = {};
        const hasValue = Object.values(formData).some(value => value.trim() !== '') || 
                        selectedCategories.length > 0;
        
        if (!hasValue) {
            newErrors.title = 'At least one field is required';
            setErrors(newErrors);
            return false;
        }

        if (formData.isbn && !/^\d{10,13}$/.test(formData.isbn)) {
            newErrors.isbn = 'ISBN must be 10-13 digits';
        }

        if (formData.title && !/^[A-Za-z0-9.,\s]*$/.test(formData.title)) {
            newErrors.title = 'Invalid characters in title';
        }

        if (formData.pageCount && !/^\d+$/.test(formData.pageCount)) {
            newErrors.pageCount = 'Must be a number';
        }

        if (formData.authors && !/^[A-Za-z\s,]*$/.test(formData.authors)) {
            newErrors.authors = 'Invalid characters in authors';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) return;
        
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

    const hasAnySearchCriteria = () => {
        return Object.values(formData).some(value => value.trim() !== '') || 
               selectedCategories.length > 0;
    };

    const filteredBooks = books.filter(book => {
        if (!searchCriteria.isSearchActive || !hasAnySearchCriteria()) return false;

        const matchesTitle = !formData.title || 
            book.title.toLowerCase().includes(formData.title.toLowerCase());

        const matchesIsbn = !formData.isbn || 
            book.isbn === formData.isbn;

        const matchesPageCount = !formData.pageCount || 
            book.pageCount === parseInt(formData.pageCount);

        const matchesStatus = !formData.status || 
            book.status.toLowerCase() === formData.status.toLowerCase();
        
        const matchesDate = (!formData.dateFrom || new Date(book.publishedDate.$date) >= new Date(formData.dateFrom)) &&
                           (!formData.dateTo || new Date(book.publishedDate.$date) <= new Date(formData.dateTo));
        
        const matchesAuthors = !formData.authors || formData.authors.split(',')
            .every(author => book.authors.some(a => 
                a.toLowerCase().includes(author.trim().toLowerCase())
            ));

        const matchesCategories = selectedCategories.length === 0 ||
            selectedCategories.every(category => book.categories.includes(category));

        return matchesTitle && matchesIsbn && matchesPageCount && 
               matchesStatus && matchesDate && matchesAuthors && matchesCategories;
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
                            error={errors.title}
                        />
                        
                        <Typing 
                            label="ISBN"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleInputChange}
                            error={errors.isbn}
                        />
                        
                        <Typing 
                            label="Page Count"
                            name="pageCount"
                            type="number"
                            value={formData.pageCount}
                            onChange={handleInputChange}
                            error={errors.pageCount}
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
                                    <Typing 
                                        label=""
                                        name="dateFrom"
                                        type="date"
                                        value={formData.dateFrom}
                                        onChange={handleInputChange}
                                        parentClass=""
                                    />
                                </div>
                                <div className="col-6">
                                    <Typing 
                                        label=""
                                        name="dateTo"
                                        type="date"
                                        value={formData.dateTo}
                                        onChange={handleInputChange}
                                        parentClass=""
                                    />
                                </div>
                            </div>
                        </div>

                        <Typing 
                            label="Authors"
                            name="authors"
                            value={formData.authors}
                            onChange={handleInputChange}
                            error={errors.authors}
                        />

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
            <BookDisplay books={filteredBooks}/>
        </div>
    );
}

export default AdvancedSearch;