import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "890a22ad8ba359c9b3dfb4558ec77ce1"; // Fallback API key
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async (page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch trending movies.");
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to search movies.");
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movie details.");
  }
};

export const fetchMovieVideos = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
    );
    const videos = response.data.results;
    const trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
  } catch (error) {
    throw new Error("Failed to fetch movie videos.");
  }
};