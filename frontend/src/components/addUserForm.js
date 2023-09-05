import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import {
    Stack, Dialog, InputLabel, DialogContent, DialogContentText,
    DialogTitle, MenuItem, Select, TextField, FormControl,
    DialogActions, Button, FormHelperText, Snackbar, Alert, Box, Input
} from '@mui/material';
import Axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

export const FormModal = ({ openModal, setOpenModal, firmName = '' }) => {
    const [age, setAge] = useState('')
    const schema = Yup.object().shape({
        name: Yup.string().trim().required('Name is required'),
        email: Yup.string().matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/, "Invalid Email").required('Email Required'),
        firm: Yup.string().trim().required('Firm name required'),
        role: Yup.string().required('Select Role'),
        // icon: Yup
        //     .mixed()
        //     .required("Required")
        //     .test("is-valid-type", "Not a valid image type",
        //         value => isValidFileType(value && value.name.toLowerCase(), "image"))
        //     .test("is-valid-size", "Max allowed size is 100KB",
        //         value => value && value.size <= MAX_FILE_SIZE)
    });

const { register, handleSubmit, formState:{errors}, getValues } = useForm({ resolver: yupResolver(schema) });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({
        status: 'info',
        message: 'Request sent successfully'
    });

    const MAX_FILE_SIZE = 102400; //100KB

    const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    const onSubmit = async (data) => {

        try {
            console.log(data);
            const formData = new FormData();
            formData.append()
            console.log(formData);
            const response = await Axios.post('http://localhost:4000/adduser', formData);
            console.log('Response from server', response);
            // setOpenSnackbar(!openSnackbar);
        } catch (error) {
            console.error('Error sending POST request:', error.response);

            // if (error.response.status == 409) {
            //     setErrorText((prev) => ({ ...prev, email: 'user already exists' }));
            // }
            // else {
            //     setSnackbarMessage({
            //         status: 'error',
            //         message: 'Failed to send request!'
            //     });
            //     setOpenSnackbar(true);
            // }
        }
    }

    const handleAddUserCancel = () => {
        setOpenModal(false);
    }

    const disableSubmit = () => {
        if(!!errors.email || !!errors.name || !!errors.firm || !!errors.role){
            if(!(!!getValues('email') && !!getValues('name') && !!getValues('firm') && !!getValues('role'))){
                return true;
            }
        }
        return false;
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
                                error={errors.email ? true : false}
                                helperText={errors.email?.message}
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
                                    <MenuItem value='customer admin'>Customer Admin</MenuItem>
                                    <MenuItem value='supervisor'>Supervisor</MenuItem>
                                    <MenuItem value='operator'>Operator</MenuItem>
                                </Select>
                            </FormControl>
                            {(Boolean(errors.role ? true : false)) ? (
                                <FormHelperText style={{ color: '#f94336', marginLeft: '1.3em' }}>{errors.role?.message}</FormHelperText>
                            ) : (
                                null
                            )}

                            <Input
                                type='file'
                                id='customer_icon'
                                label='Firm Logo'
                                {...register('icon')}
                            />

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
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarMessage.status} sx={{ width: '100%' }}>
                    {snackbarMessage.message}
                </Alert>
            </Snackbar>

        </>

    );
}
