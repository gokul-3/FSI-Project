import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userRole: "",
    isLoggedIn: false,
    name: "",
    email: "",
    userId:null,
    customerId : null,
    customerName: null
  },
  reducers: {
    setProfileInfo(state, action) {
      state.userRole = action.payload.userRole;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.customerId = action.payload.customerId
      state.customerName = action.payload.customerName
      state.isLoggedIn = true;
      console.log('hello');
    },
    logout(state) {
      state.userRole = "";
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.userId = null
      state.customerId = null,
      state.customerName = null,
      localStorage.removeItem('refreshtoken')
      localStorage.removeItem('accesstoken')
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
