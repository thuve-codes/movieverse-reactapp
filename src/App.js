// src/App.js
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./components/MovieDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SearchBar from './components/SearchBar'; // ✅ Correct way for default export


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#3f51b5" },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
  <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
  <SearchBar onSearch={handleSearch} /> {/* ✅ Correct location */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:id" element={<MovieDetails />} />
  </Routes>
</Router>

      </ThemeProvider>
  );
}

export default App;
