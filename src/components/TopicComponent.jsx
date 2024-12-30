import { Avatar, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { useNavigate } from "react-router-dom";

const TopicComponent = ({ item }) => {
  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(item.id)
  }

  return (
    <Grid
      borderRadius={2}
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      padding={1}
      onClick={handleOnClick}
      // color={"primary"}
      sx={{
        backgroundColor: "primary.main",
        // "&:hover": {
        //   backgroundColor: "primary.dark", // Change to desired hover color
      
        // },
        cursor: "pointer"  
      }}
    >
      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <Typography>{item.title}</Typography>
        <Box display={"flex"} gap={1}>
          <Avatar sx={{ width: 24, height: 24 }} alt="Remy Sharp" />
          <Typography>{item.author}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default TopicComponent;
