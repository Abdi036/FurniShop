import { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://furnishop-api.onrender.com/api/v1/users/resetPassword/${token}`,
        { password, confirmPassword }
      );
      console.log(response.data);
      setMessage("Password reset successfully.");
      setError("");

      // Clear the message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("");
      setError(
        error.response?.data?.message || "Failed to reset password. Try again."
      );

      // Clear the error after 3 seconds
      setTimeout(() => setError(""), 3000);
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
          >
            Reset Password
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
