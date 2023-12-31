import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Button,
  Stack,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Modal,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../../axios";

export const ChangePassword = ({ setShowChangePassword, setModalInfo }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState();

  const schema = Yup.object().shape({
    old_password: Yup.string().required("Old password is required"),
    new_password: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be at most 15 characters")
      .matches(/[0-9]/, "Must include digit")
      .matches(/[a-z]/, "Must include one lowercase")
      .matches(/[A-Z]/, "Must include one uppercase")
      .matches(/[^\w\s]/, "Must include one special character")
      .test(
        "different-from-old",
        "New password must be different from the old password",
        function (value) {
          const oldPassword = this.parent.old_password;
          return value !== oldPassword;
        }
      ),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("new_password"), null],
        "New Password and Old Password must match"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accesstoken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      };
      const response = await axios.put(
        "/auth/change-password",
        { ...data },
        { headers }
      );
      reset();
      setModalInfo({
        title: "Success",
        content: response.data?.message,
      });
      setShowChangePassword(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setModalInfo({ title: "Error", content: err.response.data?.message });
    }
  };
  return (
    <>
      <Box m={3} mt={5}>
        <Paper elevation={4} sx={{ borderRadius: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack direction="column" spacing={2} p={3}>
              <TextField
                disabled={loading}
                required
                type={showOldPassword ? "text" : "password"}
                variant="outlined"
                label="Old Password"
                name="old_password"
                fullWidth
                {...register("old_password")}
                error={errors.old_password ? true : false}
                helperText={errors.old_password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        edge="end"
                      >
                        {showOldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                disabled={loading}
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                label="New Password"
                name="new_password"
                fullWidth
                {...register("new_password")}
                error={errors.new_password ? true : false}
                helperText={errors.new_password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={loading}
                required
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                label="Confirm Password"
                name="confirm_password"
                fullWidth
                {...register("confirm_password")}
                error={errors.confirm_password ? true : false}
                helperText={errors.confirm_password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack justifyContent="flex-end" mt={3} gap={2} direction="row">
                <Button
                  type="button"
                  variant="contained"
                  disabled={loading}
                  size="large"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" size="large">
                  {loading ? (
                    <CircularProgress color="inherit" size={30} />
                  ) : (
                    "Change"
                  )}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};
