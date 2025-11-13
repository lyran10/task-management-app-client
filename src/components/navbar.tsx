import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAuth } from "../context/authContext";
import { useThemeMode } from "../context/themeModeContext";

// -------------------- Top Navigation Bar --------------------
export const Navbar = () => {
  const { user, signout } = useAuth();
  const { mode, toggle } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar position="static" color="primary" elevation={2} sx={{height : "10%", width : "100%"}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* App Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          TaskManager
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Theme Toggle */}
          <IconButton color="inherit" onClick={toggle}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Authenticated User View */}
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>

              {/* Avatar Menu */}
              <IconButton
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Avatar sx={{ width: 32, height: 32, ml: 1 }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem disabled>{user.name}</MenuItem>
                <MenuItem
                  onClick={() => {
                    signout();
                    setAnchorEl(null);
                  }}
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            // Guest View
            <>
              <Button color="inherit" component={Link} to="/">
                Sign In
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
