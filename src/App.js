import { useState, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { MovieProvider } from "./context/MovieContext";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./pages/Favorites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Create Auth Context for user login
export const AuthContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null); // Manage logged-in user
  const [cartItems, setCartItems] = useState([]); // Manage cart items

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
    <AuthContext.Provider value={{ user, setUser, cartItems, setCartItems }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MovieProvider>
          <Router>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Router>
        </MovieProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
