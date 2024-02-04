import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getDefinationAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/Defination/getDefinationlist`);
    return result;
  } catch (error) {
    console.error("getDefinationAPI --->:", error);
    return error;
  }
};
const getDefinationByIdAPI = async (Id) => {
  try {
    const result = await get(
      `${API_BASE_URL}/Defination/getDefinationbyid/${Id}`
    );
    return result;
  } catch (error) {
    console.error("getDefinationByIdAPI --->:", error);
    return error;
  }
};
const createDefinationApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/Defination/addDefination`,
      data
    );
    return result;
  } catch (error) {
    console.error("createDefinationApi --->:", error);
    return error;
  }
};
const updateDefinationApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/Defination/updateDefination`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateDefinationApi --->:", error);
    return error;
  }
};
const deleteDefinationApi = async (data) => {
  try {
    const result = await post(
      `${API_BASE_URL}/Defination/deleteDefination/${data}`
    );
    return result;
  } catch (error) {
    console.error("deleteDefinationApi --->:", error);
    return error;
  }
};
export {
  getDefinationAPI,
  getDefinationByIdAPI,
  createDefinationApi,
  updateDefinationApi,
  deleteDefinationApi,
};
