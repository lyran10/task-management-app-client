import React, { useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useThemeMode } from "../context/themeModeContext";

const SignUpPage = () => {
  const { signup } = useAuth();
  const {mode} = useThemeMode()
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

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
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 3 }} elevation={6}>
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Email"
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

          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>

          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Already have an account?{" "}
            <Button variant="text" component={Link} to="/">
              Sign In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
