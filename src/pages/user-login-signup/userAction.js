import {
  getNewAccessJWT,
  getUser,
  logoutUser,
} from "../../helpers/axiosHelper";
import { setBooks, setSelectedBook } from "../book/bookSlice";
import { setStudents } from "../student/studentSlice";
import { setUser } from "./userSlice";

export const postLoginUserAction = () => async (dispatch) => {
  // get user info
  const { status, user } = await getUser();

  // store user info in redux store
  if (status === "success") {
    dispatch(setUser(user));
  }
};

export const autoLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (!accessJWT && refreshJWT) {
    // get new access jwt
    const token = await getNewAccessJWT();

    if (token?.accessJWT) {
      sessionStorage.setItem("accessJWT", token.accessJWT);
      dispatch(postLoginUserAction());
    }
  }

  dispatch(postLoginUserAction());
};

export const logoutUserAction = (email) => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");

  // clear the store
  dispatch(setUser({}));
  dispatch(setBooks([]));
  dispatch(setSelectedBook({}));
  dispatch(setStudents([]));

  // clear the browser storage
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");

  // logout user & remove both jwts from db
  await logoutUser(email, accessJWT);
};
