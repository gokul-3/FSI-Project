import { Box, Button, Card, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorPageTemplate = ({ header, code }) => {
  const navigate = useNavigate();

  return (
    <Box p={2} height="100vh">
      <Box
        width="50%"
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
          <i>
            {header} {code}
          </i>
        </Typography>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1, { replace: true });
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPageTemplate;
