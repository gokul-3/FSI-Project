import React from "react";
import {
  Box,
  Card,
  CardContent,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

const NumberBox = (props) => {
  return props.count === null ? (
    <Skeleton
      variant="rounded"
      sx={{ width: { xs: 300, sm: 220 } }}
      height={150}
    />
  ) : (
    <Box
      sx={{
        width: { xs: 300, sm: 220 },
        background: "linear-gradient(to top, white, #d5e5ff)",
      }}
      height={150}
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
  console.log(props.totalCustomers.header);
  const gradientColor =
    // (props.totalCustomers.header.split(" ")[1]=='Customers')
    //   ? 
      "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)"
      // : "linear-gradient(to bottom, #3871cb, #000)";
  return (
    <Card
      sx={{
        width: { xs: "400px", sm: "450px", lg: "60%" },
        margin: "auto",
        borderRadius: "10px",
        background: gradientColor,
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
          <NumberBox {...props.recentlyActive} />
        </CardContent>
      </CardContent>
    </Card>
  );
}
