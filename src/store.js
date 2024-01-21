import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/user-login-signup/userSlice";
import bookReducer from "./pages/book/bookSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    bookInfo: bookReducer,
  },
});

export default store;
