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
  Typography,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "../../axios";

export const FormModal = ({ openModal, setOpenModal, firmName = "" }) => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().required("Admin name is required"),
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

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/user", data);
      setIsLoading(false);
      setResponse(res.message);
      reset();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorText(error.response?.message);
    }
  };

  const handleAddUserCancel = () => {
    reset();
    setResponse("");
    setErrorText("");
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
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          {/* <DialogContentText sx={{ mb: "1em" }}>
            Send them a request
          </DialogContentText> */}

          <form style={{padding: "10px 0"}} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                error={errors.firm ? true : false}
                helperText={errors.firm?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Admin Name"
                type="text"
                id="user_name"
                {...register("name")}
                error={errors.name ? true : false}
                helperText={errors.name?.message}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email Id"
                type="email"
                id="emailid"
                {...register("email")}
                error={Boolean(errorText) || (errors.email ? true : false)}
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
                  error={errors.role ? true : false}
                  disabled={!!firmName}
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
              {/* <Box>{isLoading ? <CircularProgress /> : null}</Box> */}
              <Box>
                {!!response ? (
                  <Typography sx={{ color: "red" }}>{response}</Typography>
                ) : (
                  <Typography sx={{ color: "blue" }}>{errorText}</Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  mt: "2em",
                  gap: "1rem",
                }}
              >
                <Button variant="contained" onClick={handleAddUserCancel}>
                  Cancel
                </Button>
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
    </>
  );
};
