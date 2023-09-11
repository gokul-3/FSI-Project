import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, FormControl } from "@mui/material";
import axios from "../../../axios";

const deletePromptText = `Are you sure you want to delete this user account?`;
export default function AlertDialog({
  open,
  setOpen,
  data,
  actionType,
  setActionType,
  setActionMessage,
}) {
  const [roleFilter, setRoleFilter] = useState(data.role);
  const [error, setError] = useState("");

  const handleUserChange = (event) => {
    const selectedRole = event.target.value;
    console.log(selectedRole)
    setRoleFilter(selectedRole);
  };
  const handleAction = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
    if (actionType === "delete") {
      try {
        const user = await axios.delete(`/user?data=${data.id}`, { headers });
        if (user.data.status === "success") {
          setOpen(false);
          setActionType("");
          setActionMessage(user.data.message);
        } else {
          setError(user.data.message);
        }
      } catch (error) {
        setError("An error occurred while deleting the user.");
      }
    }

    if (actionType === "edit") {
      try {
        const user = await axios.put(
          `/user`,
          { data: data.id, Role: roleFilter },
          { headers }
        );
        if (user.data.status === "success") {
          setOpen(false);
          setActionType("");
          setActionMessage(user.data.message);
        } else {
          setError(user.data.message);
        }
      } catch (error) {
        setError("An error occurred while editing the user.");
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
    setActionType("");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box p={1} minWidth={300}>
          <DialogTitle id="alert-dialog-title">
            {`${
              actionType === "delete" ? " Delete Confirmation for " : "Edit Dialog for  "
            }${data.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ width: "100%" }}
              id="alert-dialog-description"
            >
              {actionType === "delete" ? (
                deletePromptText
              ) : (
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 120, width: "100%", marginRight: 2 }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Designation
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={roleFilter}
                    onChange={handleUserChange}
                  >
                    <MenuItem value="customerAdmin">Customer Admin</MenuItem>
                    <MenuItem value="supervisor">Supervisor</MenuItem>
                    <MenuItem value="operator">Operator</MenuItem>
                  </Select>
                </FormControl>
              )}
              <p>{error}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAction} autoFocus>
              {actionType === "delete" ? "Delete" : "Change"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}