import axios from "axios";

const rootAPI = process.env.REACT_APP_ROOTAPI;
const userAPI = rootAPI + "/users";

export const axiosProcessor = async (obj) => {
  try {
    const response = await axios(obj);
    console.log(response);
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const createAdmin = (data) => {
  return axiosProcessor({
    method: "post",
    url: userAPI + "/admin-signup",
    data,
  });
};
