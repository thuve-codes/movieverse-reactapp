import { useState } from "react";
import { TextField, Box } from "@mui/material";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, width: "100%" }}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch} 
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
