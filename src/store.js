import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/user-login-signup/userSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
  },
});

export default store;
