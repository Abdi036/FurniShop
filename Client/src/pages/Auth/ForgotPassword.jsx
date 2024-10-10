import { useState } from "react";

import axios from "axios";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/forgotPassword",
        { email }
      );
      console.log(response.data);
      setMessage("Token sent to email.");
      setError("");

      // Clear the message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

      setEmail("");
    } catch (error) {
      setMessage("");
      setError(
        error.response?.data?.message || "Failed to send reset link. Try again."
      );

      // Clear the error after 3 seconds
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
          </Button>
        </Box>
        {loading && (
          <Typography color="textSecondary" variant="body2">
            Sending...
          </Typography>
        )}
        {message && (
          <Typography color="success.main" variant="body2">
            {message}
          </Typography>
        )}
        {error && (
          <Typography color="error.main" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
