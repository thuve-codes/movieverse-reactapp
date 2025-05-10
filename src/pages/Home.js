import { useState, useEffect, useContext, useCallback } from "react";
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
  Button,
} from "@mui/material";
import { MovieContext } from "../context/MovieContext";
import { useInView } from "react-intersection-observer"; // For infinite scrolling

function Home() {
  const { searchQuery, setSearchQuery, recentSearches, addRecentSearch } =
    useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 0 }); // Detect when the bottom of the page is in view

  const loadMovies = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      setError(null);
      let newMovies = [];
      if (searchQuery.trim()) {
        newMovies = await searchMovies(searchQuery, page);
      } else {
        newMovies = await fetchTrendingMovies(page);
      }
      setMovies((prev) => [...prev, ...newMovies]);
      setHasMore(newMovies.length > 0); // Stop loading if no more movies
    } catch (err) {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, hasMore, loading]);

  // Reset movies and page when search query changes
  useEffect(() => {
    setMovies([]); // Reset movies on new search
    setPage(1);
    setHasMore(true);
  }, [searchQuery]);

  // Load movies only when the bottom of the page is in view
  useEffect(() => {
    if (inView && !loading) {
      setPage((prev) => prev + 1); // Increment page to trigger load
      loadMovies(); // Load movies only when scrolled into view
    }
  }, [inView, loading, loadMovies]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchQuery(query);
      addRecentSearch(query); // Save the search query to recent searches
    }
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    addRecentSearch(query); // Ensure the clicked recent search is updated
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container sx={{ py: 10 }}>
        <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        {recentSearches.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Recent Searches
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  onClick={() => handleRecentSearch(search)}
                  sx={{ mb: 1 }}
                >
                  {search}
                </Button>
              ))}
            </Box>
          </Box>
        )}
        {loading && movies.length === 0 && (
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
            {searchQuery.trim()
              ? "No movies found. Try a different search!"
              : "Scroll down to load trending movies!"}
          </Typography>
        )}
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
        <div ref={ref}>
          {loading && movies.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </Container>
    </Box>
  );
}

export default Home;