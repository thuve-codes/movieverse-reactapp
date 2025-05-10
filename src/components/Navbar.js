import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Box,
  Tooltip,
  Zoom,
  styled,
  Button,
} from "@mui/material";
import { useContext } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Added this import
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(90deg,rgb(0, 0, 0) 0%,rgb(6, 14, 58) 100%)"
      : "linear-gradient(90deg,rgb(0, 238, 255) 0%,rgb(104, 121, 211) 100%)",
  boxShadow: theme.shadows[4],
  transition: "background 0.3s ease",
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: theme.palette.grey[300],
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.grey[500],
  },
}));

function Navbar({ darkMode, setDarkMode }) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: 40, height: 40, borderRadius: "50%" }}/>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "white",
                display: { xs: "none", sm: "block" },
              }}
            >
              MovieVerse - CodeByThuve (thuve-codes)
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
         
            <Button 
              component={Link} 
              to="/favorites"
              variant="outlined"
              startIcon={<FavoriteIcon />}
              sx={{ color: "white" }}
            >
              Favorites
            </Button>
          
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;