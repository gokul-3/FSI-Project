import { createSlice } from "@reduxjs/toolkit";
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    customerCount: 0,
    activeCustomers: 0,
    mostUsers: {},
    leastUsers: {},
  },
  reducers: {
    setSuperAdminDashboardData(state, action) {
      state.customerCount = action.payload.customerCount;
      state.activeCustomer = action.payload.activeStatus;
      state.mostUsers = action.payload.mostUsers;
      state.leastUsers = action.payload.leastUsers;
    },

  },
});

export const superAdminActions = superAdminSlice.actions;
export default superAdminSlice.reducer;
