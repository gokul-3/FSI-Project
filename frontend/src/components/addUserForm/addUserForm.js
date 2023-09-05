import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import {
    Stack, Dialog, InputLabel, DialogContent, DialogContentText,
    DialogTitle, MenuItem, Select, TextField, FormControl,
    Button, FormHelperText, Box, Input
} from '@mui/material';
import Axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import SnackbarNotify from '../snackbar/Snackbar';

export const FormModal = ({ openModal, setOpenModal, firmName = '' }) => {
    const schema = Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        email: Yup.string().matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/, "Invalid Email").required('Email Required'),
        firm: Yup.string().trim().required('Firm name required'),
        role: Yup.string().required('Select Role'),
    });

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm({ resolver: yupResolver(schema) });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({
        status: 'info',
        message: 'Request sent successfully'
    })

    const onSubmit = async (data) => {

        try {
            const response = await Axios.post('http://localhost:4000/adduser', data);
            console.log('Response from server', response);
            const encodedEmail = window.btoa(data.email + ":")
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Basic " + encodedEmail
            }
            const res = await Axios.post('http://192.168.53.116:5000/auth/createPassword', {}, { headers });
            reset();
            setOpenSnackbar(!openSnackbar);
        } catch (error) {
            if (error.response.status == 409) {
                errors.email = true;
                setUserAlreadyExists("User already exists")
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
        reset();
        setUserAlreadyExists('');
        setOpenModal(false);
    }

    const disableSubmit = () => {
        if (!!errors.email || !!errors.name || !!errors.firm || !!errors.role) {
            if (!(!!getValues('email') && !!getValues('name') && !!getValues('firm') && !!getValues('role'))) {
                return true;
            }
        }
        return false;
    }

    const handleSnackbarClose = () => {
        reset();
        setOpenSnackbar(!openSnackbar);
        setOpenModal(false);
        setUserAlreadyExists('');
    }

    return (

        <>
            <Dialog open={openModal} fullWidth>
                <DialogTitle>Want to add new user?</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: '1em' }}>Send them a request</DialogContentText>

                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Name"
                                type='text'
                                id="user_name"
                                {...register("name")}
                                error={errors.name ? true : false}
                                helperText={errors.name?.message}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email Id"
                                type='email'
                                id="emailid"
                                {...register("email")}
                                error={Boolean(userAlreadyExists) || (errors.email ? true : false)}
                                helperText={userAlreadyExists || errors.email?.message}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                label='Firm Name'
                                type='text'
                                id='firm'
                                defaultValue={firmName}
                                InputProps={
                                    { readOnly: Boolean(firmName) }
                                }
                                {...register("firm")}
                                error={errors.firm ? true : false}
                                helperText={errors.firm?.message}
                            />
                            <FormControl>
                                <InputLabel id='addUser-designation-label'>Designation</InputLabel>
                                <Select
                                    id='addUser-designation'
                                    labelId='addUser-designation'
                                    label='Designation'
                                    fullWidth
                                    {...register('role')}
                                    error={errors.role ? true : false}
                                    defaultValue=''
                                >
                                    <MenuItem value='customerAdmin'>Customer Admin</MenuItem>
                                    <MenuItem value='supervisor'>Supervisor</MenuItem>
                                    <MenuItem value='operator'>Operator</MenuItem>
                                </Select>
                            </FormControl>
                            {(Boolean(errors.role ? true : false)) ? (
                                <FormHelperText style={{ color: '#f94336', marginLeft: '1.3em' }}>{errors.role?.message}</FormHelperText>
                            ) : (
                                null
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: '2em' }}>
                                <Button variant='outlined'
                                    disabled={disableSubmit()}
                                    endIcon={<SendIcon />}
                                    type='submit'
                                >
                                    Send
                                </Button>
                                <Button variant='outlined' onClick={handleAddUserCancel}>
                                    Cancel
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
            <SnackbarNotify
                openSnackbar={openSnackbar}
                handleSnackbarClose={handleSnackbarClose}
                snackbarMessage = {snackbarMessage}
            />

        </>

    );
}





