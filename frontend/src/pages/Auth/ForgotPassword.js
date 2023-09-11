import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MessageModel from "./MessageModel";
import axios from "../../axios";
import { CircularProgress } from "@mui/material";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [model, setModel] = useState({
    open: false,
    message: "",
    navigate: "",
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    const encodedEmail = window.btoa(data.email + ":");
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Basic " + encodedEmail,
    };
    setSending(true);
    axios
      .post("/auth/send-reset-email", {}, { headers })
      .then((res) => {
        setErrorMessage("");
        console.log(res.data.message);
        setModel(
          {
            open: true,
            message: res.data.message,
            navigate: "/",
          },
          setSending(false)
        );
      })
      .catch((err) => {
        setSending(false);
        if (err.response) {
          setErrorMessage(err.response.data.message);
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          background: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 10,
              p: 5,
              borderRadius: 5,
              background: "#fff",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            }}
          >
            <Typography
              component="h1"
              color="primary"
              variant="h5"
              sx={{ m: 5, fontWeight: "800", fontSize: "30px" }}
            >
              Forgot password
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Enter your registered email to reset the password
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                // sx={{margin:'0 10px 0 10px'}}
                fullWidth
                label="Email"
                autoComplete="off"
                autoFocus
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email_username}
                helperText={errors.email_username?.message}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={sending}
                sx={{
                  mt: 3,
                  mb: 2,
                  minWidth: "8rem",
                  height: "3rem",
                  background:
                    "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
                }}
              >
                {sending ? <CircularProgress sx={{ color: "#fff" }} size={25} />: "Send email"}
              </Button>
            </form>
            <Typography color="red" textAlign="center">
              {errorMessage}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {model.open && <MessageModel {...model} />}
    </ThemeProvider>
  );
}
