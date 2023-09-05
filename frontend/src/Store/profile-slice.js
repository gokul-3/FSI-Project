import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userRole: "",
    isLoggedIn: false,
    name: "",
    email: "",
    userId:null,
    customerId : null
  },
  reducers: {
    setProfileInfo(state, action) {
      state.userRole = action.payload.userRole;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.customerId = action.payload.customerId
    },

    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem('refreshtoken', action.payload.refreshToken);
      localStorage.setItem('accesstoken', action.payload.accessToken);

    },
    logout(state) {
      state.userRole = "";
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.userId = null
      state.customerId = null
      localStorage.removeItem('refreshtoken')
      localStorage.removeItem('accesstoken')
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
