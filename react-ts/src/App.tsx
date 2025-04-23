import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
// import AdvancedSearch from "./pages/AdvancedSearch"
import { useDispatch } from "react-redux"
import { setBooks } from "./redux/slices/bookSlice"
import books from "./book-data"
import { useEffect } from "react"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBooks(books));
  }, []);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        {/* <Route path="/advanced-search" element={<AdvancedSearch />} /> */}
      </Routes>
    </>
  )
}

export default App
