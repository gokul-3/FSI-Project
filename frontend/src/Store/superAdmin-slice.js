import { createSlice } from "@reduxjs/toolkit";
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    customerCount: 0,
    activeCustomers: 0,
    mpstUsers : {},
    leastUsers : {}

  },
  reducers: {},
});

export const superAdminActions = superAdminSlice.actions;
export default superAdminSlice.reducer;
