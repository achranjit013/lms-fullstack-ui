import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const userAPI = rootAPI + "/users";
const bookAPI = rootAPI + "/books";
// const bookAPI = rootAPI + "/books";

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
    if (error.response?.data?.message.includes("jwt expired")) {
      const { accessJWT } = await getNewAccessJWT();

      if (accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
        return axiosProcessor(obj);
      }
    }

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

// create new admin
export const createStudent = (data) => {
  return axiosProcessor({
    method: "post",
    url: userAPI,
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

// logout user
export const logoutUser = async (data) => {
  return axiosProcessor({
    method: "post",
    url: userAPI + "/logout",
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
    url: userAPI + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  });
};

// create/add new book
export const createBook = (data) => {
  return axiosProcessor({
    method: "post",
    url: bookAPI,
    data,
    isPrivate: true,
  });
};

// get all books
export const getAllBook = (_id) => {
  return axiosProcessor({
    method: "get",
    url: _id ? bookAPI + "/" + _id : bookAPI,
    isPrivate: true,
  });
};

// update a book
export const updateBook = (data) => {
  return axiosProcessor({
    method: "put",
    url: bookAPI,
    data,
    isPrivate: true,
  });
};
// update a book
export const deleteBook = (_id) => {
  return axiosProcessor({
    method: "delete",
    url: bookAPI + "/" + _id,
    isPrivate: true,
  });
};

// get all students
export const getAllStudent = () => {
  return axiosProcessor({
    method: "get",
    url: userAPI + "/student-list",
    isPrivate: true,
  });
};
