
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { fetchMovieDetails } from "../services/api";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[5],
  mt: 4,
}));

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
      } catch (err) {
        setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6" align="center">
          Movie not found.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, bgcolor: "background.default", minHeight: "100vh" }}>
      <StyledCard>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", sm: 200 },
              height: 300,
              objectFit: "cover",
              borderTopLeftRadius: { xs: "inherit", sm: 0 },
              borderBottomLeftRadius: { sm: 0 },
            }}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={movie.title || "Movie"}
          />
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              {movie.title || "No Title"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {movie.overview || "No overview available."}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Release Date:</strong>{" "}
              {movie.release_date || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Rating:</strong> ⭐{" "}
              {(movie.vote_average || 0).toFixed(1)} / 10
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )) || (
                <>
                  <Chip label="Action" size="small" color="primary" variant="outlined" />
                  <Chip label="Drama" size="small" color="primary" variant="outlined" />
                </>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ mt: 2 }}
            >
              Back to Home
            </Button>
          </CardContent>
        </Box>
      </StyledCard>
    </Container>
  );
}

export default MovieDetails;