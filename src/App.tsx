import React, { useState, useMemo, createContext, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Box,
  Button,
  IconButton,
  CssBaseline,
  Avatar,
  TextField,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Navbar} from "./components/navbar";
import { AuthProvider } from "./context/authContext";
import { ThemeModeProvider } from "./context/themeModeContext";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({ key: "css", prepend: true });

// // ---------- Theme Context ----------
// const ColorModeContext = createContext({ toggleColorMode: () => {} });
   // "dev": "vite",
    // "serve:ssr": "node server/index.js",
    //     "dev": "tsx server/index.js",
    // "build": "tsc -b && vite build",
    // import createEmotionServer from "@emotion/server/create-instance";
export const App = () => {
  // const [mode, setMode] = useState<"light" | "dark">("light");

  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  //     },
  //   }),
  //   []
  // );

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode]
  // );

  return (
    // <ColorModeContext.Provider value={colorMode}>
    <Container
      maxWidth={false}
      disableGutters
      sx={{width: "100vw",height : "100dvh",margin : 0,padding :0}}
      >
          <Navbar />
          {/* <AppBar
           position="static"
            sx={{
              width: "100%",
              left: 0,
              right: 0,
              borderRadius: 0,
            }}
           > */}
            {/* <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Task Management
              </Typography>
              <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar> */}
          {/* </AppBar> */}
          {/* <Container
           maxWidth={false}
           disableGutters
           sx={{ mt: 4, width: "100%", px: 2 }}
           > */}
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskTable />} /> */}
            </Routes>
       </Container>
  );
};