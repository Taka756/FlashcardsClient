import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import HomeService from "../services/home-service";
import LoginService from "../services/login-service";
import axios from "axios";

const Home = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({});
  
  const testRestApi = () => {
    return HomeService.testRestApi()
      
  };

  const getCurrentPrincipal = async () => {
    try {
      const result = await LoginService.getTokenInfo();
      console.log("Result getting token info: ", result);
      if (!result.data.active) {
        window.location.replace("/login");
        return;
      }
      setTokenInfo(result.data);
    } catch (err) {
      console.error("Error getting token info: ", err);
      window.location.replace("/login");
    }
  };

  const refresh = async () => {
    const refreshToken = window.localStorage.getItem("refresh_token");
    if (refreshToken === "undefined" || !refreshToken) {
      alert("Not applicable. Refresh token is missing.");
      return;
    }
    try {
      await LoginService.refreshToken();
      await getCurrentPrincipal();
    } catch (err) {
      console.error("Error refreshing token: ", err);
    }
  };

  const tokenInfoString = tokenInfo
    ? JSON.stringify(tokenInfo, null, 8)
    : null;

  const userId = tokenInfo?.principal?.id || null;

  const avatarUrl = userId
    ? `${axios.defaults.baseURL}/resource/user/${userId}/avatar?access_token=${accessToken}`
    : null;

  useEffect(() => {
    getCurrentPrincipal();
    setAccessToken(window.localStorage.getItem("access_token"));
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        HOME PAGE
      </Typography>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <Button variant="contained" color="primary" onClick={refresh}>
          REFRESH TOKENS
        </Button>
        <Button variant="outlined" color="secondary" onClick={testRestApi}>
          TEST
        </Button>
      </Box>
      {avatarUrl && (
        <Box>
          <img
            src={avatarUrl}
            alt="User Avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "10px",
            }}
          />
        </Box>
      )}
      <Typography
        component="pre"
        sx={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
          marginLeft: 2,
          fontSize: "1.5rem",
        }}
      >
        {tokenInfoString}
      </Typography>
    </Box>
  );
};

export default Home;
