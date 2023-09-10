import React, { useState, useEffect, useCallback, Fragment } from "react";
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
import { useLocation, useNavigate ,useParams} from "react-router-dom";
import Action from "./Action";
import { FormModal } from "../../../components/addUserForm/addUserForm";
import axios from "../../../axios";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";
import { ArrowBackIos } from "@mui/icons-material";
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

const initialColumns = [
  { id: "id", label: "User ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "Status", label: "Status", minWidth: 170 },
  { id: "role", label: "Designation", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 170 },
];

const DEBOUNCE_DELAY = 500;

const UserTable = () => {
  // states used

  const [data, setData] = useState([]);
  const [sort, setSort] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nameOrmail, setNameOrMail] = useState("");
  const [roleFilter, setroleFilter] = useState("All Users");
  const [isTyping, setIsTyping] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState("");
  const [addedUserRenderer, setAddedUserRenderer] = useState(false);
  const [count, setCount] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  let {
    customerId,
    userRole,
  } = useSelector((state) => state.profile);
  if (!customerId) {
    customerId = params.customerId;
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const columns = initialColumns.map((column) => {
    return userRole !== "supervisor"
      ? column
      : column.id !== "action" && column;
  });
//Worker Function
  const fetchData = async () => {
    try {
      const queryParams = {
        customer_id: customerId,
        nameOrmail: nameOrmail,
        role: roleFilter,
        page: page,
        pageLimit: rowsPerPage,
        sort:sort
      };

      const accessToken = localStorage.getItem("accesstoken");
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      const response = await axios
        .get(`/user`, {
          params: queryParams,
          headers,
        });

      if (response) {
        if (response.data.status === "success") {

          const responseData = response.data.data;
          setCustomerName(responseData.customerName);
          setData(responseData.users);
          setCount(responseData.totalUsers);
        }
      } }
       catch (error) {
      setData([]);
      setError(error.message);
    }
  };
  const addUserHandler = () => {
    setAddedUserRenderer((prev) => !prev);
  };
  useEffect(() => {
    let typingTimeout;
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
    nameOrmail,
    customerId,
    actionType,
    page,
    rowsPerPage,
    addedUserRenderer,
    sort
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
  const handleNameorEmailChange = (event) => {
    const selectedNameorEmail = event.target.value;
    setNameOrMail(selectedNameorEmail);
    setIsTyping(true)

  };
  const handleRoleChange = (event) => {
    setroleFilter(event.target.value);
  };

  const handleClear = (event) => {
    setNameOrMail("");
  };
  const handleSort = (columnId) => {
    if (sort.length === 0) {
      if (columnId === 'name' || columnId === "id") { setSort([columnId, 'asc']) }
      else {
        setSort([columnId, 'desc'])
      }
    }
    else if ((sort[1] === "asc" && columnId !== "Status") || (sort[1] === "desc" && columnId === "Status")) {
      if (columnId === 'name' || columnId === "id") {
        setSort([columnId, 'desc'])
      }
      else {
        setSort([columnId, 'asc']) }
    }
    else {
      setSort([])
    }}
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
        firmName={customerName}
        onAddUser={addUserHandler}
      />

      <Box p={3} className="responsive-table" position="relative">
        {userRole === "superAdmin" && (
          <Box display="flex" justifyContent="space-between" mt={1}>
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
          </Box>
        )}
        <Typography sx={{ textAlign: "center", mt: 3 }} variant="h4">
          {customerName}
        </Typography>

        <Box
          sx={{
            mx: "2rem",
            mb: "2rem",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                verticalAlign: "center",
                my: "1rem",
                mb: "1.5rem",
              }}
            >
          <TextField
        placeholder="Search by Name or Email..."
        onChange={handleNameorEmailChange}
        variant="standard"
        defaultValue={nameOrmail}
        value={nameOrmail}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: nameOrmail ? 'visible' : 'hidden' }}
              onClick={handleClear}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        sx={{
          m: 2,
          marginTop: '25px',
          '& .Mui-focused .MuiIconButton-root': { color: 'primary.main' },
          
        }}
      />

      <FormControl variant="standard" sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Designation
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={roleFilter}
          onChange={handleRoleChange}
          defaultValue="All Users"
        >
          <MenuItem value="All Users">All Users</MenuItem>
          <MenuItem value="customerAdmin">Customer Admin</MenuItem>
          <MenuItem value="supervisor">Supervisor</MenuItem>
          <MenuItem value="operator">Operator</MenuItem>
        </Select>
      </FormControl>
            </Box>
            {userRole !== "supervisor" ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Add User
              </Button>
            ) : null}
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
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {column.id === 'id' || column.id === 'name' || column.id === 'Status' ? (
                          <>
                            <b>{column.label}</b>
                            {sort.length === 0 ? (
                              <ArrowUpwardOutlinedIcon style={{ height: "16px" }} onClick={() => handleSort(column.id)} />
                            ) : (
                              (sort[1] === "asc" && sort[0] === column.id) ? (
                                <ArrowDownwardOutlinedIcon style={{ color: 'grey', height: "16px" }} onClick={() => handleSort(column.id)} />
                              ) : (
                                <ArrowUpwardOutlinedIcon style={{ color: 'grey', height: "16px" }} onClick={() => handleSort(column.id)} />
                              )
                            )}
                          </>
                        ) : (
                          <b>{column.label}</b>
                        )}
                      </div>
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
                          row["Status"] ? (
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
    </Box>
  </>);

}
export default UserTable;