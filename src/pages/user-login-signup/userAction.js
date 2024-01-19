import { getNewAccessJWT, getUser } from "../../helpers/axiosHelper";
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
    const response = await getNewAccessJWT();

    if (response?.accessJWT) {
      sessionStorage.setItem("accessJWT", response.accessJWT);
      dispatch(postLoginUserAction());
    }
  }

  dispatch(postLoginUserAction());
};
