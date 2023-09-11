import { createSlice } from "@reduxjs/toolkit";
const customerAdminSlice = createSlice({
  name: "customerAdmin",
  initialState: {
    userCount: null,
    activeUsers: null,
    newUsers: [],
  },
  reducers: {
    setCustomerDashboardData(state, action) {
      state.userCount = action.payload.userCount;
      state.activeUsers = action.payload.activeUsers;
      state.newUsers = action.payload.newUsers;
    },
  },
});

export const customerAdminActions = customerAdminSlice.actions;
export default customerAdminSlice.reducer;
