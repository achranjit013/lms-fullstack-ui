import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const userAPI = rootAPI + "/users";

export const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};

export const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

export const axiosProcessor = async (obj) => {
  const { isPrivate, refreshToken } = obj;
  if (isPrivate) {
    obj.headers = {
      Authorization: refreshToken ? getRefreshJWT() : getAccessJWT(),
    };
  }

  try {
    const response = await axios(obj);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// create new admin
export const createAdmin = (data) => {
  return axiosProcessor({
    method: "post",
    url: userAPI + "/admin-signup",
    data,
  });
};

// login user
export const loginUser = (data) => {
  return axiosProcessor({
    method: "post",
    url: userAPI + "/login",
    data,
  });
};

// get user info
export const getUser = () => {
  return axiosProcessor({
    method: "get",
    url: userAPI,
    isPrivate: true,
  });
};

// get access jwt
export const getNewAccessJWT = () => {
  return axiosProcessor({
    method: "get",
    url: userAPI + "/get-accessJWT",
    isPrivate: true,
    refreshToken: true,
  });
};
