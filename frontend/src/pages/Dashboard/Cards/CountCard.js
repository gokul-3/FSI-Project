import React from "react";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";

const NumberBox = (props) => {
  return (
    <Box
      sx={{ width: { xs: 300, sm: 220 } }}
      height={150}
      bgcolor="#fff"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="10px"
      borderRadius="10px"
      component={Paper}
      elevation={6}
    >
      <Typography
        variant="h4"
        fontFamily="Roboto, Poppins"
        fontWeight={500}
        color="#3871cb"
      >
        {props.count}
      </Typography>
      <Typography>{props.header}</Typography>
    </Box>
  );
};
export default function CountCard(props) {
  return (
    <Card
      sx={{
        width: { xs: "400px", sm: "450px", lg: "60%" },
        margin: "auto",
        borderRadius: "10px",
        bgcolor: "#3871cb",
      }}
      variant="elevation"
      elevation={6}
    >
      <CardContent>
        <Typography
          fontSize={30}
          fontWeight={500}
          color="#fff"
          sx={{ textAlign: "center", margin: "0.7rem 0" }}
        >
          Customer Statistics
        </Typography>

        <CardContent
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "3rem",
          }}
        >
          <NumberBox {...props.totalCustomers} />
          <NumberBox {...props.recentlyActive } />
        </CardContent>
      </CardContent>
    </Card>
  );
}
