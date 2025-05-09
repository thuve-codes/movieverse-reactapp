// src/App.js
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { MovieProvider } from "./context/MovieContext";

function App() {
  const [darkMode, setDarkMode] = useState(true);

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
      <MovieProvider>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Home />
      
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;