import { configureStore } from "@reduxjs/toolkit";
import superAdminReducer from "./superAdmin-slice";
import customerAdminReducer from "./customerAdmin-slice";
import userReducer from "./user-slice";
import profileReducer from "./profile-slice";
const store = configureStore({
  reducer: {
    superAdmin: superAdminReducer,
    customerAdmin: customerAdminReducer,
    profile: profileReducer,
    user: userReducer,
  },
});
export default store;
