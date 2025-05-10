import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  ); // Store recent searches

  // Add a search query to recent searches, limiting to the last 5 searches
  const addRecentSearch = (query) => {
    if (query.trim() && !recentSearches.includes(query)) {
      const updatedSearches = [query, ...recentSearches].slice(0, 5); // Limit to 5 recent searches
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  };

  const addFavorite = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movieId) =>
    favorites.some((movie) => movie.id === movieId);

  return (
    <MovieContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        recentSearches,
        addRecentSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};