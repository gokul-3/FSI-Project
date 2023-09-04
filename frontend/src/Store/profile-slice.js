import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userType: "superAdmin",
  },
  reducers: {
    setProfileInfo(state, action) {
      state.userType = action.payload.userType;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
