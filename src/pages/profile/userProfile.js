import React, { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ChangePassword } from "./changePassword";
import ShowInfoModal from "../../Layouts/Modal/Modal";

const UserProfile = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const user = useSelector((state) => state.profile);
  const [modalInfo, setModalInfo] = useState(false);
  const setModalInfoHandler = (modalInfo) => {
    setModalInfo(modalInfo);
  };
  const setShowChangePasswordHander = (showPassword) => {
    setShowChangePassword(showPassword);
  };
  return (
    <>
      <ShowInfoModal
        title={!!modalInfo && modalInfo.title}
        content={!!modalInfo && modalInfo.content}
        openModal={!!modalInfo}
        onCloseModal={() => {
          setModalInfo(false);
        }}
      />
      <Stack direction="column" gap={2} margin={3}>
        <Typography sx={{ my: 2 }} variant="h5">
          User Info
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          sx={{ pointerEvents: "none" }}
          value={user.name}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={user.email}
          sx={{ pointerEvents: "none" }}
        />
        {showChangePassword ? (
          <ChangePassword
            setShowChangePassword={setShowChangePasswordHander}
            setModalInfo={setModalInfoHandler}
          />
        ) : (
          <Box mt={1} display="flex" justifyContent="end">
            <Button
              variant="contained"
              onClick={() => setShowChangePassword(true)}
            >
              Change Password
            </Button>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default UserProfile;
