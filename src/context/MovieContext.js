// src/context/MovieContext.js
import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MovieContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </MovieContext.Provider>
  );
};