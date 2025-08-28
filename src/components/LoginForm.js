import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function LoginForm() {
  const { user, error, login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (user) {
    return <Typography>Welcome, {user.name}!</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 300, margin: "40px auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" align="center">
        Login
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </Box>
  );
}

export default LoginForm;
