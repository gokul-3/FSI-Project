import { createSlice } from "@reduxjs/toolkit";
const supervisorSlice = createSlice({
  name: "supervisor",
  initialState: {},
  reducers: {},
});

export const supervisorActions = supervisorSlice.actions;
export default supervisorSlice.reducer;
