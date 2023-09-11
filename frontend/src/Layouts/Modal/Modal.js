import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import React from "react";
const ShowInfoModal = ({
  openModal = false,
  onCloseModal = () => {},
  title = "",
  content = "",
}) => {
  return (
    <Dialog open={openModal} onClose={onCloseModal}>
      <Box sx={{ p: 2 }}>
        <DialogTitle variant="h5">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCloseModal}>
            OK
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
export default ShowInfoModal;
