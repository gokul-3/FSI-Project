import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import superAdminReducer from "./Store/superAdmin-slice";
import customerAdminReducer from "./Store/customerAdmin-slice";
import userReducer from "./Store/user-slice";
import profileReducer from "./Store/profile-slice";

const store = configureStore({
  reducer: {
    superAdmin: superAdminReducer,
    customerAdmin: customerAdminReducer,
    profile: profileReducer,
    user: userReducer,
  },
});


const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
