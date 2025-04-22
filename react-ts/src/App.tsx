import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import AdvancedSearch from "./pages/AdvancedSearch"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
      </Routes>
    </>
  )
}

export default App
