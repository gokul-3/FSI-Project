import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import superAdminReducer from "./store/superAdmin-slice";
import customerAdminReducer from "./store/customerAdmin-slice";
import supervisorReducer from "./store/supervisor-slice";
import userReducer from "./store/user-slice";

const store = configureStore({
  reducer: {
    superAdmin: superAdminReducer,
    customerAdmin: customerAdminReducer,
    supervisor: supervisorReducer,
    user: userReducer,
  },
});
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
