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
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },

    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem('refreshtoken', action.payload.refreshToken);
      localStorage.setItem('accesstoken', action.payload.accessToken);

    },
    logout(state, action) {
      state.userRole = "";
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.userId = null
      localStorage.removeItem('refreshtoken')
      localStorage.removeItem('accesstoken')
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
