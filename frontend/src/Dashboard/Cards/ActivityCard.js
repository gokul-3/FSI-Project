import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";

const CustomerData = ({ customers, users }) => {
  return customers.map((element, index) => (
    <>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography fontSize="16px" fontWeight={500} display="inline-block">
              {element}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography
              fontSize="16px"
              display="inline-block"
              fontWeight={500}
              sx={{ float: "right" }}
            >
              {users[index]}
            </Typography>
          }
        />
      </ListItem>
      {index !== customers.length - 1 && <Divider variant="inset" />}
    </>
  ));
};
export default function BasicCard(props) {
  return (
    <Card
      sx={{ width: { xs: 400, sm: 500, lg: 550 }, borderRadius: "10px" }}
      variant="elevation"
      elevation={6}
    >
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "center", margin: "1rem 0" }}>
          {props.title}
        </Typography>
        <CustomerData customers={props.names} users={props.count} />
      </CardContent>
    </Card>
  );
}
