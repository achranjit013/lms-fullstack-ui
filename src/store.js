import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/user-login-signup/userSlice";
import bookReducer from "./pages/book/bookSlice";
import studentReducer from "./pages/student/studentSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    bookInfo: bookReducer,
    studentInfo: studentReducer,
  },
});

export default store;
