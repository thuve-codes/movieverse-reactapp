// src/components/SearchBar.js
import { useState } from "react"; // Add this import
import { TextField, Box } from "@mui/material";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
      setQuery(""); // Clear input after search
    }
  };

  return (
    <Box sx={{ maxWidth: 500, width: "100%" }}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleSearch}
        placeholder="Search movies..."
        variant="outlined"
        size="small"
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      />
    </Box>
  );
}

export default SearchBar;