import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Action from './Action';

const { userType, isLoggedIn } = useSelector((state) => state.profile);
if (!isLoggedIn) return <Navigate to="/login" />;

const oldcolumns = [
  { id: 'id', label: 'User ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'Status', label: 'Status', minWidth: 170 },
  { id: 'role', label: 'Designation', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170 },
];

const DEBOUNCE_DELAY = 500;

const UserTable = ({ customer_id }) => {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const columns = oldcolumns.map((column) => { return userType !== 'supervisor' ? column : column.id !== 'action' && column })

  //Worker Funciton
  const fetchData = async () => {
    const queryParams = {
      customer_id: customer_id,
      name: name,
      role: roleFilter,
    };

    const response = await axios.get(`http://localhost:4000/api/users`, {
      params: queryParams,
    });

    if (response.data.status === "success") {
      const responseData = response.data.users;
      setData(responseData);
    } else {
      setData([]);
    }
  };

  // states used
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [roleFilter, setroleFilter] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [actionDone, setActionDone] = useState(true);

  //Effects
  useEffect(() => {
    let typingTimeout;
    setActionDone(true)
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

  }, [roleFilter, name, customer_id, actionType, actionDone]);

  //Handler functions 
  const  handleCloseAlert= () => {
    setActionMessage('')
  }
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
    setIsTyping(true)
  }
  const handleRoleChange = (event) => {
    setroleFilter(event.target.value)
  }
  const handleClear = (event) => {
    setName("")
    setroleFilter("")
  }

  return (
    <div className="responsive-table">
      <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', verticalAlign: 'center' }}>
        <TextField id="standard-basic" value={name} label="Search by Name" variant="standard" onChange={handleNameChange} sx={{ minWidth: 120, marginRight: 2 }} />
        <FormControl variant="standard" sx={{ minWidth: 120, marginRight: 2 }}>
          <InputLabel id="demo-simple-select-standard-label">Designation</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={roleFilter}
            onChange={handleRoleChange}
          >
            <MenuItem value="All Users">All Users</MenuItem>
            <MenuItem value="Customer Admin">Customer Admin</MenuItem>
            <MenuItem value="Supervisor">Supervisor</MenuItem>
            <MenuItem value="Operator">Operator</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Clear Filter">
          <IconButton>
            <ClearIcon onClick={handleClear} />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          color="primary"
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          + Add User
        </Button>
      </div>
      <br></br>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align="left">
                        {column.id === 'Status' ? (row['Active'] ? 'Active' : 'Inactive') : column.id === 'action' ? <Action data={row} actionType={actionType} setActionType={setActionType} setActionMessage={setActionMessage} setActionDone={setActionDone} ></Action> : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <p>{data.length} matches found</p>
      </Paper>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={!!actionMessage} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert onClose={() => setActionMessage('')} severity="success" sx={{ width: '100%' }}>
            {actionMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default UserTable;



