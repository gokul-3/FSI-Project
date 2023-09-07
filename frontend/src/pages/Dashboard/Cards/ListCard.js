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
  return users.length === 0 ?"No Users available":
  users.map((element, index) => {
    if(index>10) return <></>
    const bgColor = (index%2==1)?"#f5f5f5":"#fff";
    return(
    <Fragment key={index} >
      <ListItem alignItems="center" sx={{backgroundColor:bgColor}} key={index} >
        <ListItemText 
          primary={
            <Typography fontSize="14px" sx={{ display: "inline-block",paddingLeft:'10px'}}>
              {element.UserName}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography
              fontSize="14px"
              sx={{ display: "inline-block", paddingRight:'10px',float: "right" }}
            >
              {element.Difference==30?"Today":(element.Difference==29?"Yesterday":`${30 -element.Difference} days ago`)}
            </Typography>
          }
        />
      </ListItem>
      {index !== users.length - 1 && <Divider variant="" />}
    </Fragment>
  )});
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
      <ListItem alignItems="center" key={"title"}  >
        <ListItemText 
          primary={
            <Typography fontSize="16px" fontWeight={500} sx={{ display: "inline-block",paddingLeft:'10px'}}>
              UserName
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography
            fontSize="16px" fontWeight={500}
              sx={{ display: "inline-block", paddingRight:'10px',float: "right" }}
            >
              Created
            </Typography>
          }
        />
      </ListItem>

        <UserData users={userNames} />
      </CardContent>
    </Card>
  );
};
export default ListCard;
