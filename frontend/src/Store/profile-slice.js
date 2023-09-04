import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userType: "superAdmin",
    isLoggedIn: "",
    name: "",
    email: "",
  },
  reducers: {
    setProfileInfo(state, action) {
      state.userType = action.payload.userType;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
