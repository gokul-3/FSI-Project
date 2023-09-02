import { createSlice } from "@reduxjs/toolkit";
const customerAdminSlice = createSlice({
  name: "customerAdmin",
  initialState: {},
  reducers: {},
});

export const customerAdminActions = customerAdminSlice.actions;
export default customerAdminSlice.reducer;
