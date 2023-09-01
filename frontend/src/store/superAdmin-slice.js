import { createSlice } from "@reduxjs/toolkit";
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {},
  reducers: {},
});

export const superAdminActions = superAdminSlice.actions;
export default superAdminSlice.reducer;
