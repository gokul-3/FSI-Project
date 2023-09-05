import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userType: "customer",
    isLoggedIn: false,
    name: "",
    email: "",
    userId:null
  },
  reducers: {
    setProfileInfo(state, action) {
      state.userType = action.payload.userType;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    logout(state, action) {
      state.userType = "";
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.userId = null
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
