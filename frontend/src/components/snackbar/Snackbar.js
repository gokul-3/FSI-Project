import React from 'react';
import {Snackbar, Alert} from '@mui/material'

export const SnackbarNotify = ({openSnackbar, handleSnackbarClose, snackbarMessage}) => {
    return (
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarMessage.status} sx={{ width: '100%' }}>
                {snackbarMessage.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarNotify;