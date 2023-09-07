import React, { Fragment } from "react";
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
import { Link, useNavigate } from "react-router-dom";
const CustomerData = ({ customers }) => {
  const navigate = useNavigate();
  return customers.length === 0
    ? "No customers available"
    : customers.map((element, index) => (
        <Fragment key={index}>
          <ListItem
            onClick={() => {
              navigate(`/customers/${element.customerId}`);
            }}
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <ListItemAvatar>
              <Avatar
                alt={element.CustomerName}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography
                  fontSize="16px"
                  fontWeight={400}
                  color="black"
                  display="inline-block"
                >
                  {element.CustomerName}
                </Typography>
              }
            />
            <ListItemText
              primary={
                <Typography
                  fontSize="16px"
                  display="inline-block"
                  fontWeight={400}
                  sx={{ float: "right" }}
                >
                  {element.UserCount} user{element.UserCount > 1 ? "s" : ""}
                </Typography>
              }
            />
          </ListItem>
          {index !== customers.length - 1 && <Divider variant="inset" />}
        </Fragment>
      ));
};
export default function BasicCard(props) {
  const customerData = props.customerData;
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
        <CustomerData customers={customerData} />
      </CardContent>
    </Card>
  );
}
