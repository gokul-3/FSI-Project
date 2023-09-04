import { Box, Card, Paper, Typography } from "@mui/material";
import React from "react";
import fallbackSVG404 from "../../assets/fallback.svg";
const URLNotFoundError = () => {
  return (
    <Box p={2}  height="100vh">
      <Box
        width="50%"
        // height="50%"
        borderRadius="20px"
        mx="auto"
        display="flex"
        flexDirection="column"
        bgcolor="white"
        alignItems="center"
        mt={5}
        p={2}
      >
        <Typography
          variant="h3"
          fontFamily="'Montserrat', sans-serif"
          fontWeight={500}
          my={5}
        >
          <i>URL Not Found</i>
        </Typography>
        <img src={fallbackSVG404} alt=""/>
      </Box>
    </Box>
  );
};

export default URLNotFoundError;
