import React, { Fragment, useState } from "react";

import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
const listDesign = {
  display: "block",
  float: "left",
  width: "33%",
  textAlign: "center",
};
const itemPerPage = 5;
const paginationStyles = {
  '& .MuiPaginationItem-page': {
    color: 'white', 
  },
  '& .Mui-selected': {
    backgroundColor: 'white', 
    color: 'black',
  },
  '& .MuiPaginationItem-icon': {
    color: 'white', }
}

const UserData = ({ users }) => {
  return users.length === 0
    ? "No Users available"
    : users.map((element, index) => {
      
        if (index >= itemPerPage) return <></>;
        const alternateColor = index % 2 == 0 ? "#f5f5f540" : "#ffffff60";
        const endBorder = (index === users.length-1)? "5px" : "0px";
        return (
          <Fragment>
            <ListItem
              alignItems="center"
              key={index}
              sx={{
                backgroundColor: alternateColor,
                borderBottomLeftRadius: endBorder,
                borderBottomRightRadius: endBorder,
              }}
            >
              <ListItemText
                primary={
                  <Typography fontSize="16px">{element.UserName}</Typography>
                }
                sx={listDesign}
              />
              <ListItemText
                primary={
                  <Typography fontSize="16px">
                    {element.UserRole == "customerAdmin"
                      ? "Admin"
                      : element.UserRole.charAt(0).toUpperCase() +
                        element.UserRole.slice(1)}
                  </Typography>
                }
                sx={listDesign}
              />
              <ListItemText
                primary={
                  <Typography fontSize="16px">
                    {element.Difference == 30
                      ? "Today"
                      : element.Difference == 29
                      ? "Yesterday"
                      : `${30 - element.Difference} days ago`}
                  </Typography>
                }
                sx={listDesign}
              />
            </ListItem>
          </Fragment>
        );
      });
};
const ListCard = (props) => {
  const userNames = props.userData;
  const totalItems = userNames.length;
  const pageCount = Math.ceil(totalItems / itemPerPage);
  const [currentPage, setCurrentPage] = useState("1");

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Card
      sx={{
        width: { xs: 400, sm: 450, lg: "60%" },
        borderRadius: "6px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        color: "white",
        background: "linear-gradient(to top, #3871cb, #000)",
      }}
      variant="elevation"
      elevation={6}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", margin: "1rem 0" }}
          fontWeight={500}
        >
          New Users
        </Typography>
        <Typography
          variant="body"
          sx={{ display: "block", margin: "1rem 0", textAlign: "center" }}
        >
          Created in the last 30 days
        </Typography>
        <List
          sx={{
            padding: {
              xs: "0",
              sm: "0 0.8rem",
              md: "0 1.6rem",
              lg: "0 2.5rem",
            },
          }}
        >
          <ListItem key={"title"} sx={{ backgroundColor: "#ffffff60",borderTopLeftRadius:'5px',borderTopRightRadius:'5px' }}>
            <ListItemText
              primary={
                <Typography fontSize="1rem" fontWeight={500}>
                  UserName
                </Typography>
              }
              sx={listDesign}
            />
            <ListItemText
              primary={
                <Typography fontSize="1rem" fontWeight={500}>
                  Designation
                </Typography>
              }
              sx={listDesign}
            />
            <ListItemText
              primary={
                <Typography fontSize="1rem" fontWeight={500}>
                  Created
                </Typography>
              }
              sx={listDesign}
            />
          </ListItem>
          <UserData users={userNames.slice(startIndex,endIndex)} />
        </List>
      </CardContent>
      <CardContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Pagination count={pageCount || 1} onChange={handlePageChange}
        sx={paginationStyles}
        />
      </CardContent>
    </Card>
  );
};
export default ListCard;
