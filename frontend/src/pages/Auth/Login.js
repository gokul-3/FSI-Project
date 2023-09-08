import React, { useState } from "react";
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
  Checkbox,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { VisibilityOff, Visibility, Cookie } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { setProfileInfo } from "../../Store/profileSetter";
import moment from "moment";

export default function Login() {
  const [showPass, setshowPass] = useState(false);
  const [rememberStatus, setrememberStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email_userId: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const onSubmit = async (data) => {
    const encodedMessage = window.btoa(data.email_userId + ":" + data.password);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic " + encodedMessage,
    };
    setSending(true);
    try {
      const res = await axios.post(
        "/auth/login",
        { withCredentials: true },
        { headers }
      );

      setErrorMessage("");
      const { refreshToken, id, accessToken } = res.data;
      let refreshTokenToBeSaved = "";
      if (rememberStatus) {
        refreshTokenToBeSaved = refreshToken;
      }
      localStorage.setItem("refreshtoken", refreshTokenToBeSaved);
      localStorage.setItem("accesstoken", accessToken);
      const expiryDate = moment().add(15, "m").toDate();
      localStorage.setItem("expirydate", expiryDate.toString());
      const profileInfo = (await axios.get("dashboard")).data;
      setProfileInfo(profileInfo);
      navigate("/");
    } catch (err) {
      if (err.response) {
        setSending(false);
         setErrorMessage(err.response.data.message);
         return;
      }
      setErrorMessage(err.message)

    }
  };
  const isAccessTokenPresent = localStorage.getItem('accesstoken');
  if (isAccessTokenPresent) {
    return <Navigate to="/" />
  }
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", color: "" }}
      bgcolor={"#f6f6ff"}
      display="flex"
      justifyContent="center"
      alignContent={"center"}
      minHeight={'60vh'}
    >
      <Grid
        item
        xs={12}
        sm={9}
        md={5}
        component={Paper}
        elevation={3}
        borderRadius={3}
      >
        <Box
          sx={{
            my: 7,
            mx: 9,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6" pb={4} color={"#38a1cb"}>
            FSI PROJECTS
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="on"
              autoFocus
              {...register("email_userId", {
                required: "Email is required",
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email_userId}
              helperText={errors.email_userId?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              type={showPass ? "text" : "password"}
              label="Password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <Button
                    style={{ color: "grey", fontSize: "1.4rem" }}
                    onClick={() => setshowPass(!showPass)}
                  >
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </Button>
                ),
              }}
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormControlLabel
              sx={{ color: "#555" }}
              label="Keep me Logged in"
              control={
                <Checkbox
                  style={{ opacity: 0.75 }}
                  checked={rememberStatus}
                  onClick={() => setrememberStatus(!rememberStatus)}
                />
              }
            />
            <Typography color="#d91818" textAlign="center" fontWeight={300}>
              {errorMessage}
            </Typography>
            <Button
              type="submit"
              fullWidth
              disabled={sending}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                height: "3rem",
                background:
                  "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
              }}
            >
              {sending ? "Please wait..." : "Sign in"}
            </Button>
            <Grid container>
              <Grid item xs textAlign="center">
                <Link
                  to="/forgotpassword"
                  style={{ textDecoration: "none", color: "#418ff4" }}
                >
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
