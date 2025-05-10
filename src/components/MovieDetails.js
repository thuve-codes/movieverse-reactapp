import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Rating,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ArrowBack, AddShoppingCart } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../App";
import YouTube from "react-youtube"; // Import react-youtube

const MovieDetails = () => {
  const { user, cartItems, setCartItems } = useContext(AuthContext);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "890a22ad8ba359c9b3dfb4558ec77ce1";
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [trailerUrl, setTrailerUrl] = useState(null); // State for trailer URL
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const movieData = await movieResponse.json();
        if (!movieResponse.ok) {
          throw new Error("Failed to fetch movie details.");
        }
        setMovie(movieData);

        // Fetch trailer
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const videoData = await videoResponse.json();
        if (videoResponse.ok) {
          const trailer = videoData.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        toast.error("Failed to load movie details or trailer");
      }
    };

    fetchData();
  }, [id]);

  function addToCart() {
    if (!movie) return;

    if (!user) {
      toast.warning("You need to login first");
      navigate("/login");
      return;
    }

    const itemExists = cartItems.find((item) => item.movie.id === movie.id);
    if (!itemExists) {
      const newItem = { movie, qty, price: 9.99 };
      setCartItems((state) => [...state, newItem]);
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, newItem]));
      toast.success("Movie added to cart successfully");
    } else {
      toast.warning("Movie already in cart");
    }
  }

  function increaseQty() {
    setQty((prevQty) => prevQty + 1);
  }

  function decreaseQty() {
    if (qty > 1) setQty((state) => state - 1);
  }

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0, // Disable autoplay
    },
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Movie not found</Typography>
        <Button variant="contained" onClick={() => navigate("/")} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, mx: "auto", my: 4 }}>
        <Box sx={{ mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
          <Box flex={1}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                borderRadius: 8,
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </Box>

          <Box flex={2}>
            <Typography variant="h3" component="h1" gutterBottom>
              {movie.title}
            </Typography>

            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
              <Typography variant="body1">
                {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
              </Typography>
            </Box>

            <Box display="flex" gap={1} mb={3} flexWrap="wrap">
              {movie.genres?.map((genre) => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography paragraph>{movie.overview}</Typography>

            {/* Trailer Section */}
            {trailerUrl && (
              <Box sx={{ mt: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Trailer
                </Typography>
                <YouTube videoId={trailerUrl.split("embed/")[1]} opts={opts} />
                {/* Alternative with iframe:
                <iframe
                  width="100%"
                  height="390"
                  src={trailerUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                */}
              </Box>
            )}

            <Divider sx={{ my: 3 }} />
            <Box display="flex" gap={4} flexWrap="wrap">
              <Box>
                <Typography variant="subtitle2">Release Date</Typography>
                <Typography>
                  {new Date(movie.release_date).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Runtime</Typography>
                <Typography>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Language</Typography>
                <Typography>{movie.original_language.toUpperCase()}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
      <ToastContainer />
    </>
  );
};

export default MovieDetails;