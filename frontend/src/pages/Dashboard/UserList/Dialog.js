import React, { useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';

const deletePromptText =
  ` Deleting the user will result in the loss of all account data, 
  including profile information, settings, and created or saved content. 
  Click 'Cancel' to return to your profile, or click 'Delete' if you are certain about account deletion.`


export default function AlertDialog({ open, setOpen, data, actionType, setActionType, setActionMessage, setActionDone }) {

  const [roleFilter, setRoleFilter] = useState(data.role);
  const [error, setError] = useState('')

  const handleUserChange = (event) => {
    const selectedRole = event.target.value;
    setRoleFilter(selectedRole);
  };
  const handleAction = async () => {
    const accessToken = localStorage.getItem('accesstoken');
    const headers = {
      "Authorization": "Bearer " + accessToken
    }
    if (actionType === 'delete') {
      try {
        const user = await axios.delete(`http://localhost:5000/user?data=${data.id}`, { headers });
        if (user.data.status === 'success') {
          setOpen(false);
          setActionType('');
          setActionMessage(user.data.message)
          setActionDone(false)

        } else {
          setError(user.data.message);
        }
      } catch (error) {
        // console.error('Error deleting user:', error);
        setError('An error occurred while deleting the user.');
      }
    }

    if (actionType === 'edit') {
      try {
        const user = await axios.put(`http://localhost:5000/user`, { data: data.id, Role: roleFilter }, { headers });
        if (user.data.status === 'success') {
          setOpen(false);
          setActionType('');
          setActionMessage(user.data.message)
          setActionDone(false)
        } else {
          setError(user.data.message);
        }
      } catch (error) {
        // console.error('Error editing user:', error);
        setError('An error occurred while editing the user.');
      }
    }
  };
  const handleClose = () => {
    setOpen(false)
    setActionType('');
    setActionDone(false)
  };



  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${actionType === 'delete' ? 'Are you sure want to delete' : 'You are editing'} the user ${data.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {actionType === 'delete' ?
              deletePromptText
              :
              < FormControl variant="standard" sx={{ minWidth: 120, marginRight: 2 }}>
                <InputLabel id="demo-simple-select-standard-label">Designation</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={roleFilter}
                  onChange={handleUserChange}
                >
                  <MenuItem value="customerAdmin">Customer Admin</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                  <MenuItem value="operator">Operator</MenuItem>
                </Select>
              </FormControl>}
            <p>{error}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAction} autoFocus>
            {actionType === 'delete' ? 'Delete' : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
}






