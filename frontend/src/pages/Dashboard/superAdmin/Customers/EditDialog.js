import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerEditedImg,
  setCustomerEditedName,
} from "../../../../Store/superAdmin-slice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

export default function EditDialog({ open, handleClose, handleEditCustomer }) {
  const maxlen = 50;
  const dispatch = useDispatch();
  const editedImg = useSelector(
    (state) => state.superAdmin.Customers.editedImg
  );
  const editedName = useSelector(
    (state) => state.superAdmin.Customers.editedName
  );
  const [nameError, setNameError] = useState("");
  const [fileError, setFileError] = useState("");
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const handleEditChange = (e) => {
    const newName = e.target.value;
    dispatch(setCustomerEditedName(newName));
    if (!newName.trim()) {
      setNameError("Customer name cannot be empty");
    } else {
      setNameError("");
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    dispatch(setCustomerEditedImg(selectedFile));
    if (!selectedFile) {
      setFileError("Please select an image file");
      dispatch(setCustomerEditedImg(null));
    } else if (!selectedFile.type.startsWith("image/")) {
      setFileError("Please select a valid image file");
      dispatch(setCustomerEditedImg(null));
    } else {
      const maxSize = 50 * 1024;
      const fileSize = selectedFile.size;

      if (fileSize > maxSize) {
        setFileError("File size exceeds 50KB");
        dispatch(setCustomerEditedImg(null));
      } else {
        setSelectedFileName(selectedFile.name);
        setFileError("");
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Customer Name"
            type="text"
            value={editedName}
            inputProps={{ maxLength: maxlen }}
            fullWidth
            variant="standard"
            onChange={handleEditChange}
            error={Boolean(nameError)}
            helperText={nameError}
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload-input"
            onChange={handleFileChange}
          />
          <label htmlFor="image-upload-input">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Choose Logo
            </Button>
          </label>
          {selectedFileName && <p>Selected Image: {selectedFileName}</p>}
          {fileError && <div style={{ color: "red" }}>{fileError}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleEditCustomer}
            disabled={nameError || fileError}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
