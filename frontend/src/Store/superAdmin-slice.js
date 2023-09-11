import { createSlice } from "@reduxjs/toolkit";
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    Customers: {
      data: {},
      editedName: "",
      editedImg: "",
    },
    customerCount: null,
    activeCustomers: null,
    mostUsers: {},
    leastUsers: {},
  },
  reducers: {
    setCustomersData: (state, action) => {
      state.Customers.data = action.payload;
    },
    setCustomerEditedName: (state, action) => {
      state.Customers.editedName = action.payload;
    },
    setCustomerEditedImg: (state, action) => {
      state.Customers.editedImg = action.payload;
    },
    setSuperAdminDashboardData(state, action) {
      state.customerCount = action.payload.customerCount;
      state.activeCustomers = action.payload.activeStatus;
      state.mostUsers = action.payload.mostUsers;
      state.leastUsers = action.payload.leastUsers;
    },
  },
});

// export const {
//   setCustomerEditedImg,
//   setCustomerEditedName,
//   setCustomersData,
//   setSuperAdminDashboardData,
// } = superAdminSlice.actions;
export const superAdminActions = superAdminSlice.actions;
export default superAdminSlice.reducer;
