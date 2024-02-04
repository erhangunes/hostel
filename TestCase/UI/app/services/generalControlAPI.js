import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getGeneralControlAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/General/GetGeneralControlList`);
    return result;
  } catch (error) {
    console.error("getGeneralControlAPI --->:", error);
    return error;
  }
};
const getGeneralControlByIdAPI = async (Id) => {
  try {
    const result = await get(
      `${API_BASE_URL}/General/getGeneralControlbyid/${Id}`
    );
    return result;
  } catch (error) {
    console.error("getGeneralControlByIdAPI --->:", error);
    return error;
  }
};
const createGeneralControlApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/General/addGeneralControl`,
      data
    );
    return result;
  } catch (error) {
    console.error("createGeneralControlApi --->:", error);
    return error;
  }
};
const updateGeneralControlApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/General/updateGeneralControl`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateGeneralControlApi --->:", error);
    return error;
  }
};
const deleteGeneralControlApi = async (data) => {
  try {
    const result = await post(
      `${API_BASE_URL}/General/deleteGeneralControl/${data}`
    );
    return result;
  } catch (error) {
    console.error("deleteGeneralControlApi --->:", error);
    return error;
  }
};
export {
  getGeneralControlAPI,
  getGeneralControlByIdAPI,
  createGeneralControlApi,
  updateGeneralControlApi,
  deleteGeneralControlApi,
};
