import React, { Fragment } from "react";
import {
  Card,
  CardContent,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const UserData = ({ users }) => {
  return users.map((element, index) => (
    <Fragment key={index} >
      <ListItem alignItems="center" key={index} sx={{textAlign:"center"}} >
        <ListItemText 
          primary={
            <Typography fontSize="14px" sx={{ display: "inline-block"}}>
              {element.UserName}
            </Typography>
          }
        />
        {/* <ListItemText
          primary={
            <Typography
              fontSize="14px"
              sx={{ display: "inline-block", float: "right" }}
            >
              {element.length} days ago
            </Typography>
          }
        /> */}
      </ListItem>
      {index !== users.length - 1 && <Divider variant="" />}
    </Fragment>
  ));
};
const ListCard = (props) => {
  const userNames = props.userData;

  return (
    <Card
      sx={{
        width: { xs: 400, sm: 450, lg: "60%" },
        borderRadius: "6px",
        margin: "auto",
      }}
      variant="elevation"
      elevation={6}
    >
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "center", margin: "1rem 0" }}>
          New Users
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", margin: "1rem 0" }}
        >
          (Created within last 30 days)
        </Typography>
        <UserData users={userNames} />
      </CardContent>
    </Card>
  );
};
export default ListCard;
