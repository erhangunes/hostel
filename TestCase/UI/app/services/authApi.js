import { get, post, postJSON } from "@/libs/Api/Service";

const { API_BASE_URL } = require("@/libs/generalSettings");

const loginUserApi = async (authData) => {
  debugger;
  try {
    const result = await postJSON(`${API_BASE_URL}/auth/login`, authData);
    return result;
  } catch (error) {
    console.error("loginUserApi --->:", error);
    return error;
    //
  }
};
const registerUserApi = async (authData) => {
  debugger;
  try {
    const result = await postJSON(`${API_BASE_URL}/auth/register`, authData);
    return result;
  } catch (error) {
    console.error("registerUserApi --->:", error);
    return error;
    //
  }
};
const getUsersApi = async () => {
  try {
    const result = await get(`${API_BASE_URL}/auth/getuserslist`);
    return result;
  } catch (error) {
    console.error("getUsersApi --->:", error);
    return error;
  }
};
export { loginUserApi, getUsersApi, registerUserApi };
