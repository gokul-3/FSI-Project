import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ChangePassword } from "./changePassword";

const UserProfile = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const user = {
    name: "John",
    email: "xyz@visailabs.com",
  };

  return (
    <Stack direction="column" gap={2} margin={3}>
      <Typography sx={{ my: 2 }} variant="h5" color="grey">
        User Info
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        value={user.name}
        disabled
      />

      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        value={user.email}
        disabled
      />
      {showChangePassword ? (
        <ChangePassword setShowChangePassword={setShowChangePassword} />
      ) : (
        <Button onClick={() => setShowChangePassword(true)}>
          Change Password
        </Button>
      )}
    </Stack>
  );
};

export default UserProfile;
