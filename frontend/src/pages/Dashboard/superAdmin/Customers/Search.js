import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
  boxShadow: `0 0 5px rgba(0, 0, 0, 0.2)`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  padding: "0", 
  paddingLeft: `calc(1em + ${theme.spacing(2)})`,
  fontSize: "1rem",
  "&::placeholder": {
    fontSize: "0.9rem",
  },
}));


const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  fontSize: "1rem",
  padding: theme.spacing(1, 2),
  marginLeft: theme.spacing(1),
  minWidth: 0, 
  background: "none", 
  color: theme.palette.primary.main, 
}));

export default function Search({onSearch}) {
  const maxlen=50;
  const [searchInput,setSearchInput]=useState(null);
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchInput);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Grid container alignItems="center">
      <Grid item >
        <SearchStyle>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search","maxLength":maxlen }}
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <SearchButton onClick={handleSearch}>
            <SearchIcon />
          </SearchButton>
        </SearchStyle>
      </Grid>
    </Grid>
  );
}