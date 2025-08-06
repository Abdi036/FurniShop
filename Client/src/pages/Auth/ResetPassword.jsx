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
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `https://furnishop-d6qb.onrender.com/api/v1/users/resetPassword/${token}`,
        { password, confirmPassword }
      );
      console.log(response.data);
      setMessage("Password reset successfully.");
      setError("");

      setPassword("");
      setConfirmPassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage("");
      setError(
        error.response?.data?.message || "Failed to reset password. Try again."
      );
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>
        </Box>
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
