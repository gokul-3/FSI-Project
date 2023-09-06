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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { VisibilityOff, Visibility, Cookie } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import img from '../../assets/bg.jpg'
import { profileActions } from '../../Store/profile-slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';


export default function Login() {

  const [showPass, setshowPass] = useState(false)
  const [rememberStatus, setrememberStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [sending, setSending] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, userRole } = useSelector(state => state.profile)
  const form = useForm({
    defaultValues: {
      email_userId: '',
      password: ''
    }
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const onSubmit = (data) => {
    const encodedEmail = window.btoa(data.email_userId + ":" + data.password)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Basic " + encodedEmail
    }
    setSending(true)
    axios.post('/auth/login', { withCredentials: true }, { headers }
    )
      .then(res => {
        setErrorMessage('')
        const { email, name, role, refreshToken, id, accessToken, customerId } = res.data
        dispatch(profileActions.setProfileInfo({ email, name, userRole: role, userId: id, customerId }))
        let refreshTokenToBeSaved = "";
        if (rememberStatus) {
          refreshTokenToBeSaved = refreshToken
        }
        localStorage.setItem('refreshtoken', refreshTokenToBeSaved);
        localStorage.setItem('accesstoken', accessToken);

        dispatch(profileActions.login())
        console.log("reol", role);
        return role
      }).then((role) => {
        console.log(role);
        navigate(`/${role}`)
      })
      .catch(err => {
        if (err.response) {
          setSending(false)
          setErrorMessage(err.response.data.message)
        }
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
              autoComplete='on'
              autoFocus
              {...register('email_userId', {
                required: 'Email is required',
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: 'Enter a valid email'
                }
              })}
              error={!!errors.email_userId}
              helperText={errors.email_userId?.message}
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
                    {showPass ? <Visibility /> : <VisibilityOff />}
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
            <Typography color='red' textAlign='center'>
              {errorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              disabled = {sending}
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '3rem', background: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))' }}
            >
              {sending ? "Please wait...":"Sign in"}
            </Button>
            <Grid container>
              <Grid item xs textAlign='center'>
                <Link to='/forgotpassword'>
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