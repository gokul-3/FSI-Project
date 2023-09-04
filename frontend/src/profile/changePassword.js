import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const ChangePassword = ({ setShowChangePassword }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
  const schema = Yup.object().shape({
    old_password: Yup.string().required("Old password is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8)
      .max(15)
      .matches(/[0-9]/, "Must include digit")
      .matches(/[a-z]/, "Must include one lowercase")
      .matches(/[A-Z]/, "Must include one uppercase")
      .matches(/[^\w\s]/, "Must include one special character"),
      
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

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (err) {}
  };
  return (
    <Box m={3} mt={5}>
      <Paper elevation={4} sx={{ borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack direction="column" spacing={2} p={3}>
            <TextField
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
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label="New Password"
              name="password"
              fullWidth
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
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
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack mt={3} gap={2} direction="row">
              <Button
                type="button"
                variant="contained"
                size="large"
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large">
                Change
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
