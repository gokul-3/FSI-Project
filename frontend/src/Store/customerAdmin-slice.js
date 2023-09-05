import { createSlice } from "@reduxjs/toolkit";
const customerAdminSlice = createSlice({
  name: "customerAdmin",
  initialState: {
    userCount : 0,
    activeUsers : 0,
    newUsers : []
  },
  reducers: {},
});

export const customerAdminActions = customerAdminSlice.actions;
export default customerAdminSlice.reducer;
