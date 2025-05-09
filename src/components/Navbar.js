
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Box,
  Tooltip,
  Zoom,
  styled,
} from "@mui/material";
import { useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(90deg,rgb(0, 0, 0) 0%,rgb(6, 14, 58) 100%)"
      : "linear-gradient(90deg,rgb(207, 209, 219) 0%,rgb(104, 121, 211) 100%)",
  boxShadow: theme.shadows[4],
  transition: "background 0.3s ease",
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: theme.palette.grey[300],
    "&.Mui-checked": {
      color: theme.palette.primary.main, // Fixed: Use valid MUI color
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.grey[500],
  },
}));

function Navbar({ darkMode, setDarkMode }) {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MovieIcon sx={{ fontSize: 32, color: "white" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
              display: { xs: "none", sm: "block" },
            }}
          >
            MovieVerse
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            TransitionComponent={Zoom}
          >
            <StyledSwitch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              icon={<LightModeIcon fontSize="small" />}
              checkedIcon={<DarkModeIcon fontSize="small" />}
            />
          </Tooltip>
          <Typography
            variant="body2"
            sx={{ color: "white", display: { xs: "none", md: "block" } }}
          >
            {darkMode ? "Dark" : "Light"} Mode
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
