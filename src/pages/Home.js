// src/pages/Home.js
import { useState, useEffect, useContext } from "react";
import { fetchTrendingMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import {
  Container,
  Grid,
  CircularProgress,
  Alert,
  Typography,
  Box,
} from "@mui/material";
import { MovieContext } from "../context/MovieContext";

function Home() {
  const { searchQuery, setSearchQuery } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        if (searchQuery.trim()) {
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
        } else {
          const trendingMovies = await fetchTrendingMovies();
          setMovies(trendingMovies);
        }
      } catch (err) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}
        {!loading && !error && movies.length === 0 && (
          <Typography variant="h6" align="center" sx={{ py: 5 }}>
            No movies found. Try searching!
          </Typography>
        )}
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;