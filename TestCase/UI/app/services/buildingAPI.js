import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getBuildingAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/building/getbuildinglist`);
    return result;
  } catch (error) {
    console.error("getBuildingAPI --->:", error);
    return error;
  }
};
const getBuildingByIdAPI = async (Id) => {
  try {
    const result = await get(`${API_BASE_URL}/building/getbuildingbyid/${Id}`);
    return result;
  } catch (error) {
    console.error("getBuildingByIdAPI --->:", error);
    return error;
  }
};
const createBuildingApi = async (data) => {
  try {
    const result = await postJSON(`${API_BASE_URL}/building/addbuilding`, data);
    return result;
  } catch (error) {
    console.error("createBuildingApi --->:", error);
    return error;
  }
};
const updateBuildingApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/building/updatebuilding`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateBuildingApi --->:", error);
    return error;
  }
};
const deleteBuildingApi = async (data) => {
  try {
    const result = await post(
      `${API_BASE_URL}/building/deletebuilding/${data}`
    );
    return result;
  } catch (error) {
    console.error("deleteBuildingApi --->:", error);
    return error;
  }
};
export {
  getBuildingAPI,
  getBuildingByIdAPI,
  createBuildingApi,
  updateBuildingApi,
  deleteBuildingApi,
};
