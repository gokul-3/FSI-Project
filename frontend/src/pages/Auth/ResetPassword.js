import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MessageModel from './MessageModel';

const defaultTheme = createTheme();


export default function ResetPassword() {


  const [showPass, setshowPass] = useState(false)
  const [sending, setSending] = useState(false)
  const [model, setModel] = useState({
    open: false,
    message: '',
    navigate: ''
  })

  const { token } = useParams()
  const schema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8)
      .max(15)
      .matches(/[0-9]/, "Must include digit")
      .matches(/[a-z]/, "Must include one lowercase")
      .matches(/[A-Z]/, "Must include one uppercase")
      .matches(/[^\w\s]/, "Must include one special character")
    ,
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      console.log(data);
      const encodedPassword = window.btoa(":" + data.confirm_password)
      console.log(encodedPassword);
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + encodedPassword
      }
      setSending(true)
      axios.put(`http://192.168.53.116:5000/auth/resetPassword/${token}`, {}, { headers })
        .then(res => {
          setModel(
            {
              open: true,
              message: res.data.message,
              navigate: '/login'
            },
            setSending(false)
          )
        })
        .catch(err => {
          setSending(false)
          setModel(
            {
              open: true,
              message: err.message,
              navigate: '/login'
            },
          )
        }
        )
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
              p: 5,
              borderRadius: 5,
              background: '#fff',
              boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
            }}
          >
            <Typography component="h1" color="primary" variant="h5" sx={{ m: 5, fontWeight: '800', fontSize: '27px' }}>
              Reset account password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, }}>
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type={showPass ? 'text' : 'password'}
                id="new_password"
                autoFocus
                {...register("password")}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment:
                    <Button onClick={() => setshowPass(!showPass)}>
                      {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Confirm Password"
                type='password'
                id="confirm_password"
                {...register("confirm_password")}
                error={errors.confirm_password ? true : false}
                helperText={errors.confirm_password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={sending}
                sx={{ mt: 3, mb: 2, width: 1, height: '3rem', background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))' }}
              >
                {sending ? "Please wait" : "Reset"}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
      {model.open && <MessageModel {...model} />}
    </ThemeProvider>
  )
}