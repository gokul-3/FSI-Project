import React, { useState, useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Box, FormControl, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Action from "./Action";
import { FormModal } from "../../../components/addUserForm/addUserForm";
import axios from "../../../axios";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";
import { ArrowBackIos } from "@mui/icons-material";

const oldcolumns = [
  { id: "id", label: "User ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "Status", label: "Status", minWidth: 170 },
  { id: "role", label: "Designation", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

const DEBOUNCE_DELAY = 1000;

const UserTable = () => {
  // states used
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [name, setName] = useState("");
  const [roleFilter, setroleFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionDone, setActionDone] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  let {
    customerId,
    userRole,
    name: userName,
  } = useSelector((state) => state.profile);
  let { Customers } = useSelector((state) => state.superAdmin);
  if (!customerId) {
    customerId = params.customerId;
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const columns = oldcolumns.map((column) => {
    return userRole !== "supervisor"
      ? column
      : column.id !== "action" && column;
  });
  //Worker Funciton
  const fetchData = async () => {
    try {
      const queryParams = {
        customer_id: customerId,
        name: name,
        role: roleFilter,
        email: emailFilter,
        page: page,
        pageLimit: rowsPerPage,
      };

      const accessToken = localStorage.getItem("accesstoken");
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      const response = await axios.get(`/user`, {
        params: queryParams,
        headers,
      });
      if (response.data.status === "success") {
        const responseData = response.data.users;
        setData(responseData.users);
        setCount(responseData.totalUsers);
      } else {
        setData([]);
        setError(response.data.message);
      }
    } catch (error) {
      return (
        <ErrorPageTemplate
          header={"Page not found"}
          code={HttpStatusCode.NotFound}
        />
      );
    }
  };
  //Effects
  useEffect(() => {
    let typingTimeout;
    setActionDone(true);
    if (!isTyping) {
      fetchData();
    } else {
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
        fetchData();
      }, DEBOUNCE_DELAY);
    }
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [
    roleFilter,
    name,
    emailFilter,
    customerId,
    actionType,
    actionDone,
    page,
    rowsPerPage,
  ]);

  if (pathname.split("/")[1] === "customers" && userRole != "superAdmin") {
    return (
      <ErrorPageTemplate
        header={"Unauthorised Error"}
        code={HttpStatusCode.Unauthorized}
      />
    );
  } else if (
    pathname.split("/")[1] === "operators" &&
    userRole != "customerAdmin"
  ) {
    return (
      <ErrorPageTemplate
        header={"Unauthorised Error"}
        code={HttpStatusCode.Unauthorized}
      />
    );
  }

  //Handler functions
  const handleCloseAlert = () => {
    setActionMessage("");
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleNameChange = (event) => {
    const selectedName = event.target.value;
    setName(selectedName);
    setIsTyping(true);
  };
  const handleEmailChange = (event) => {
    const selectedEmail = event.target.value;
    setEmailFilter(selectedEmail);
    setIsTyping(true);
  };

  const handleRoleChange = (event) => {
    setroleFilter(event.target.value);
  };
  const handleClear = (event) => {
    setName("");
    setroleFilter("");
    setEmailFilter("");
    setIsTyping(true);
  };

  if (error != "") {
    return (
      <ErrorPageTemplate
        header={"Page Not Found"}
        code={HttpStatusCode.NotFound}
      />
    );
  }

  return (
    <>
      <FormModal
        openModal={openForm}
        setOpenModal={setOpenForm}
        firmName={data[0]?.customer.name}
      />
      <Box p={3} className="responsive-table" position="relative">
        <Button
          sx={{
            float: "left",
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIos fontSize="12px" /> Back
        </Button>
        {userRole !== "supervisor" ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ float: "right" }}
            onClick={() => {
              setOpenForm(true);
            }}
          >
            Add User
          </Button>
        ) : null}
        {userRole === "superAdmin" && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Typography
              sx={{ textAlign: { xs: "center", sm: "start" } }}
              variant="h4"
              fontWeight={500}
            >
              {data[0]?.customer.name}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            my: "2rem",
          }}
        >
          <TextField
            id="standard-basic"
            value={name}
            label="Search by Name"
            variant="standard"
            onChange={handleNameChange}
            sx={{ minWidth: 120, marginRight: 2 }}
          />
          <TextField
            id="email-filter"
            value={emailFilter}
            label="Search by Email"
            variant="standard"
            onChange={handleEmailChange}
            sx={{ minWidth: 120, marginRight: 2 }}
          />

          <FormControl
            variant="standard"
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Designation
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={roleFilter}
              onChange={handleRoleChange}
              placeholder="Designation"
            >
              <MenuItem value="All Users">All Users</MenuItem>
              <MenuItem value="customerAdmin">Customer Admin</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="operator">Operator</MenuItem>
            </Select>
          </FormControl>

          {(name.length !== 0 || emailFilter.length !== 0) && (
            <Tooltip title="Clear Filter">
              <IconButton
                onClick={handleClear}
                sx={{ position: "relative", top: "10px" }}
              >
                <Typography onClick={handleClear}>Clear</Typography>
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table padding="10px" stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{ minWidth: column.minWidth }}
                    >
                      <b>{column.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === "Status" ? (
                          row["Active"] ? (
                            "Active"
                          ) : (
                            "Inactive"
                          )
                        ) : column.id === "action" ? (
                          <Action
                            data={row}
                            actionType={actionType}
                            setActionType={setActionType}
                            setActionMessage={setActionMessage}
                            setActionDone={setActionDone}
                          ></Action>
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Box p={2}>{count} matches found</Box>
        </Paper>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={!!actionMessage}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={() => setActionMessage("")}
              severity="success"
              sx={{ width: "100%" }}
            >
              {actionMessage}
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </>
  );
};

export default UserTable;
