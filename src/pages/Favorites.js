import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";

function Favorites() {
  const { favorites, removeFavorite } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  };

  if (favorites.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" align="center" sx={{ py: 5 }}>
          No favorite movies yet. Add some from the home page!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {favorites.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveFavorite(movie.id)}
              >
                Remove from Favorites
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Favorites;