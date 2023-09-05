import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userRole: "superAdmin",
    isLoggedIn: false,
    name: "",
    email: "",
    userId:null
  },
  reducers: {
    setProfileInfo(state, action) {
      state.userRole = action.payload.userRole;
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    logout(state, action) {
      state.userRole = "";
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.userId = null
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
