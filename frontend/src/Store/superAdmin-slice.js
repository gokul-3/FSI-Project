import { createSlice } from "@reduxjs/toolkit";
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    Customers:{
      data:{},
      editedName:"",
      editedImg:""
    }
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
    }
  },
});

export const {setCustomerEditedImg,setCustomerEditedName,setCustomersData} = superAdminSlice.actions;
export default superAdminSlice.reducer;
