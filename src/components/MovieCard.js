// src/components/MovieCard.js
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Tooltip,
  Box,
  IconButton,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 220,
  margin: theme.spacing(1),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[10],
    cursor: "pointer",
  },
}));

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const genres = movie.genres?.slice(0, 2) || [
    { id: 1, name: "Action" },
    { id: 2, name: "Drama" },
  ];

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const handleCardClick = () => {
    console.log(`Navigate to movie details for: ${movie.id}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="300"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title || "Movie"}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
        }}
      />
      <CardContent sx={{ pb: 1 }}>
        <Tooltip
          title={movie.title || "No Title"}
          placement="top"
          TransitionComponent={Zoom}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{ fontWeight: "bold", mb: 0.5 }}
          >
            {movie.title || "No Title"}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ⭐ {(movie.vote_average || 0).toFixed(1)} / 10 •{" "}
          {movie.release_date?.split("-")[0] || "N/A"}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
          {genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: "0.75rem" }}
            />
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <IconButton
          size="small"
          onClick={handleFavoriteToggle}
          color={isFavorite ? "error" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Show details for: ${movie.id}`);
          }}
        >
          <InfoIcon />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
}

export default MovieCard;