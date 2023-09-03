import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import {
    Stack, Dialog, InputLabel, DialogContent, DialogContentText,
    DialogTitle, MenuItem, Select, TextField, FormControl,
    DialogActions, Button, FormHelperText, Snackbar, Alert
} from '@mui/material';
import Axios from 'axios';

export const FormModal = ({ openModal, setOpenModal, firmName = '' }) => {

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({
        status: 'info',
        message: 'Request sent successfully'
    })
    const [errorText, setErrorText] = useState({
        email: '',
        designation: '',
        firm: ''
    });
    const [userData, setUserData] = useState({
        email: '',
        designation: '',
        firm: firmName
    })

    const handleAddUserChange = (e) => {

        if (e.target.type === 'email') {
            setUserData((prev) => ({ ...prev, email: e.target.value }));
        }
        else if (e.target.type === 'text') {
            setUserData((prev) => ({ ...prev, firm: e.target.value }));
        }
        else {
            setUserData((prev) => ({ ...prev, designation: e.target.value }));
        }


    }

    const validateAddUserFields = (e) => {
        if (e.target.type === 'email') {

            if (e.target.value == '') {
                setErrorText((prev) => ({ ...prev, email: 'enter a mail id' }));
            }
            else {
                const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                if (!emailRegex.test(e.target.value)) {
                    setErrorText((prev) => ({ ...prev, email: 'Enter a valid email' }));
                }
                else {
                }

            }
        }
        else if (e.target.type === 'text') {
            if (e.target.value == '') {
                setErrorText((prev) => ({ ...prev, firm: 'enter your firm' }));
            }
            else {
                const firmRegex = /^[A-Za-z0-9]+[A-Za-z0-9\s]*[a-zA-Z0-9]+$/;
                if (!firmRegex.test(e.target.value)) {
                    setErrorText((prev) => ({ ...prev, firm: 'enter a valid firm name' }));
                }
            }
        }
        else {
            setErrorText((prev) => ({ ...prev, designation: '' }));
            if (e.target.value === '')
                setErrorText((prev) => ({ ...prev, designation: 'select the designation' }));
            else
                setErrorText((prev) => ({ ...prev, designation: '' }));
        }
    }

    const handleAddUserSubmit = async () => {


        try {
            const response = await Axios.post('http://localhost:4000/addUser', userData);
            console.log('Response from server', response);
            setOpenSnackbar(!openSnackbar);
        } catch (error) {
            console.error('Error sending POST request:', error.response);

            if (error.response.status == 409) {
                setErrorText((prev) => ({ ...prev, email: 'user already exists' }));
            }
            else {
                setSnackbarMessage({
                    status: 'error',
                    message: 'Failed to send request!'
                });
                setOpenSnackbar(true);
            }

            
        }
    }

    const handleAddUserCancel = () => {
        setUserData({
            email: '',
            designation: '',
            firm: ''
        });

        setErrorText({
            email: '',
            designation: '',
            firm: ''
        });

        setOpenModal(false);

    }

    const addUserFieldFocus = (e) => {
        if (e.target.type === 'email') {
            setErrorText((prev) => ({ ...prev, email: '' }));
        }
        else if (e.target.type === 'text') {
            setErrorText((prev) => ({ ...prev, firm: '' }));
        }
        else {
            setErrorText((prev) => ({ ...prev, designation: '' }));
        }
    }

    const disableSubmit = () => {
        if (Boolean(userData.email) && Boolean(userData.designation) && Boolean(userData.firm)) {
            if (!(Boolean(errorText.email) || Boolean(errorText.designation) || Boolean(errorText.firm))) {
                return false;
            }
        }
        return true;
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(!openSnackbar);
        setOpenModal(false);
    }
    return (

        <>
            <Dialog open={openModal} fullWidth>
                <DialogTitle>Want to add new user?</DialogTitle>
                <DialogContent>
                    <DialogContentText>Send them a request</DialogContentText>
                    <Stack spacing={2} sx={{ width: '50%', margin: '20px auto auto auto' }}>
                        <FormControl >
                            <TextField
                                variant='outlined'
                                label='Email Address'
                                type='email'
                                id='addUser-email'
                                onBlur={validateAddUserFields}
                                error={Boolean(errorText.email)}
                                helperText={errorText.email}
                                onChange={handleAddUserChange}
                                onFocus={addUserFieldFocus}
                                autoComplete='off'
                            >
                            </TextField>
                        </FormControl>
                        <FormControl>
                            <TextField
                                variant='outlined'
                                label='Your Firm'
                                type='text'
                                id='addUser-firm'
                                onBlur={validateAddUserFields}
                                error={Boolean(errorText.firm)}
                                helperText={errorText.firm}
                                onChange={handleAddUserChange}
                                onFocus={addUserFieldFocus}
                                autoComplete='off'
                                defaultValue={firmName}
                                InputProps={
                                    { readOnly: Boolean(firmName) }
                                }
                            >

                            </TextField>

                        </FormControl>
                        <FormControl>

                            <InputLabel id='addUser-designation-label'>Designation</InputLabel>
                            <Select
                                id='addUser-designation'
                                labelId='addUser-designation'
                                label='Designation'
                                value={userData.designation}
                                onChange={handleAddUserChange}
                                onBlur={validateAddUserFields}
                                type='designation'
                                error={Boolean(errorText.designation)}
                                onFocus={addUserFieldFocus}
                            >
                                <MenuItem value='customer admin'>Customer Admin</MenuItem>
                                <MenuItem value='supervisor'>Supervisor</MenuItem>
                                <MenuItem value='operator'>Operator</MenuItem>
                            </Select>
                            {(Boolean(errorText.designation)) ? (
                                <FormHelperText style={{ color: '#f64336' }}>{errorText.designation}</FormHelperText>
                            ) : (
                                null
                            )}
                        </FormControl>

                    </Stack>
                </DialogContent>
                <DialogActions>

                    <Button variant='outlined'
                        disabled={disableSubmit()}
                        endIcon={<SendIcon />}
                        onClick={handleAddUserSubmit}
                    >
                        Send
                    </Button>
                    <Button variant='outlined' onClick={handleAddUserCancel}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarMessage.status} sx={{ width: '100%' }}>
                    {snackbarMessage.message}
                </Alert>
            </Snackbar>

        </>

    );
}
