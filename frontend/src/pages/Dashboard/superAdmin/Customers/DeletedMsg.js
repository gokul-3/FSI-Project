import { Alert, Snackbar } from '@mui/material'
import React from 'react'
export const DeletedMsg = ({isDeletedMsgOpen,handleClose}) => {
  return (
    <Snackbar
        open={isDeletedMsgOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Customer deleted successfully.
        </Alert>
      </Snackbar>
  )
}
