import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function BasicCard() {
  const NumberBox = (props) => {
    return (
      <Box sx={{ width: "50%", padding: "2.5%" }}>
        <Typography variant="h4" sx={{ paddingBottom: "12px" }}>
          {props.count}
        </Typography>
        <Typography>{props.head}</Typography>
      </Box>
    );
  };
  return (
    <Card
      sx={{ minWidth: 300, maxWidth: 450, margin: "1rem", borderRadius: "6px" }}
      variant="elevation"
      elevation={4}
    >
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "center", margin: "1rem 0" }}>
          Customer Statistics
        </Typography>

        <CardContent style={{ display: "flex", textAlign: "center" }}>
          <NumberBox head=" Total Customers " count="12" />
          <NumberBox head=" Recently Active " count="4" />
        </CardContent>
      </CardContent>
    </Card>
  );
}
