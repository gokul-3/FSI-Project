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
      state.userType = action.payload.userType;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },
    login(state, action){
      state.isLoggedIn = true;
    },
    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem('refreshtoken', action.payload.refreshToken);
      document.cookie = `accessToken=${action.payload.accessToken}; max-age=900000`

    },
    logout(state, action) {
      state.userRole = "";
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.userId = null
      localStorage.removeItem('refreshtoken')
      document.cookie = `accessToken=''; max-age=100`
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
