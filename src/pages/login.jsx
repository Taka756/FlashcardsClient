import React from "react";
import { Button, Box, Typography } from "@mui/material";
import LoginService from "../services/login-service";

const Login = () => {
  const login = () => {
    return LoginService.login()
  };

  const loginClient = async () => {
    try {
      await LoginService.loginClient();
      window.location.replace("/home");
    } catch (error) {
      console.error("Client Login Error: ", error);
    }
  };

  const loginPassword = async () => {
    try {
      await LoginService.loginPassword();
      window.location.replace("/home");
    } catch (error) {
      console.error("Password Login Error: ", error);
    }
  };

  return (
    
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        LOGIN PAGE
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={login}>
          LOGIN (authorization code)
        </Button>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" color="secondary" onClick={loginClient}>
          LOGIN (client credentials)
        </Button>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" color="success" onClick={loginPassword}>
          LOGIN (password grant type). Login: admin@example.com
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
