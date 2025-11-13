import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useThemeMode } from "../context/themeModeContext";

function SignInPage() {
  const { signin } = useAuth();
  const {mode} = useThemeMode()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signin(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign in failed");
    }
  };
// linear-gradient(135deg, #74ABE2, #5563DE)
  return (
    <Box
      sx={{
        height: "90%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: mode === "light" ? "whitesmoke" : "",
      }}
    >
      <Container maxWidth={false}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 6,
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            backgroundColor: mode === "light" ? "#fff" : "" ,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            {error && (
              <Typography color="error" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.2,
                fontWeight: "bold",
                textTransform: "none",
                // color : "whitesmoke"
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default SignInPage;
