import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Stack,
  Dialog,
  InputLabel,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Button,
  FormHelperText,
  Box,
  Input,
  Snackbar,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "../../axios";

export const FormModal = ({
  openModal,
  setOpenModal,
  firmName = "",
  onAddUser,
}) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(1, "Name must contain minimum of 1 character")
      .max(30, "Name can't be more than 30 characters")
      .required("Admin name is required"),
    email: Yup.string()
      .matches(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/,
        "Invalid Email"
      )
      .required("Email Required"),
    firm: Yup.string().trim().required("Firm name is required"),
    role: Yup.string().required("Select Role"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [errorText, setErrorText] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setErrorText("");
      const res = await axios.post("/user", data);
      setIsLoading(false);
      setResponse(res.data?.message);
      setSnackbarOpen(true);
      onAddUser();
      reset();
    } catch (error) {
      setIsLoading(false);
      setErrorText(error.response?.data.message);
    }
  };

  const handleAddUserCancel = () => {
    reset();
    setResponse("");
    setErrorText("");
    setSnackbarOpen(false);
    setOpenModal(false);
  };

  const disableSubmit = () => {
    if (
      !!errors.email ||
      !!errors.name ||
      !!errors.firm ||
      !!errors.role ||
      !!errorText
    ) {
      if (
        !(
          !!getValues("email") &&
          !!getValues("name") &&
          !!getValues("firm") &&
          !!getValues("role")
        )
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Dialog open={openModal} fullWidth>
        <DialogTitle>Add {!!firmName ? "User" : "Customer"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText sx={{ mb: "1em" }}>
            Send them a request
          </DialogContentText> */}

          <form
            style={{ padding: "10px 0" }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={2}>
              <TextField
                margin="normal"
                fullWidth
                label="Customer Name"
                type="text"
                id="firm"
                defaultValue={firmName}
                InputProps={{ readOnly: Boolean(firmName) }}
                {...register("firm")}
                error={!!errors.firm}
                helperText={errors.firm?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                label={!!firmName ? "User Name" : "Admin Name"}
                type="text"
                id="user_name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email Id"
                type="email"
                id="emailid"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <FormControl>
                <InputLabel id="addUser-designation-label">
                  Designation
                </InputLabel>
                <Select
                  id="addUser-designation"
                  labelId="addUser-designation"
                  label="Designation"
                  fullWidth
                  {...register("role")}
                  error={!!errors.role}
                  readOnly={!!!firmName}
                  defaultValue={!!firmName ? "" : "customerAdmin"}
                >
                  <MenuItem value="customerAdmin">Customer Admin</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                  <MenuItem value="operator">Operator</MenuItem>
                </Select>
              </FormControl>
              {Boolean(errors.role ? true : false) ? (
                <FormHelperText
                  style={{ color: "#f94336", marginLeft: "1.3em" }}
                >
                  {errors.role?.message}
                </FormHelperText>
              ) : null}
              <Box display="center">
                {!!errorText ? (
                  <Typography sx={{ color: "red" }}>{errorText}</Typography>
                ) : null}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  mt: "2em",
                  gap: "1rem",
                }}
              >
                <Button onClick={handleAddUserCancel}>Cancel</Button>
                <Button
                  variant="contained"
                  disabled={disableSubmit()}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={30} />
                  ) : (
                    "Send"
                  )}
                </Button>
              </Box>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleAddUserCancel}
      >
        <Alert
          onClose={handleAddUserCancel}
          severity="success"
          sx={{ width: "100%" }}
        >
          {response}
        </Alert>
      </Snackbar>
    </>
  );
};
