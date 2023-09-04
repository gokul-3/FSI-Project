import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,  
  Paper,
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Link } from 'react-router-dom';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import img from '../../assets/bg.jpg'

export default function Login() {

  const [showPass, setshowPass] = useState(false)
  const [rememberStatus, setrememberStatus] = useState(false)

  const form = useForm({
    defaultValues: {
      email_username: '',
      password: ''
    }
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data) => {
    console.log(data);
    await axios.post('localhost', {}, {
      auth: {
        data
      },
    })
      .then(res => {
        if (rememberStatus) {
          // add tokens
          if (res.authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7, authHeader.length);
            localStorage.setItem('refreshToken', token)
            return
          }
        }
      })
      .catch(error => {
        console.log(error.message);
      })
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete='off'
              autoFocus
              {...register('email_username', {
                required: 'Email is required',
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: 'Enter a valid email'
                }
              })}
              error={!!errors.email_username}
              helperText={errors.email_username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              type={showPass ? 'text' : 'password'}
              label="Password"
              autoComplete="current-password"
              InputProps={{
                endAdornment:
                  <Button onClick={() => setshowPass(!showPass)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </Button>
              }}
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15})/,
                  message: 'Invalid password'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel control={<Switch checked={rememberStatus} onClick={() => setrememberStatus(!rememberStatus)} />} label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '3rem', background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs textAlign='center'>
                <Link to='forgetpassword'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}