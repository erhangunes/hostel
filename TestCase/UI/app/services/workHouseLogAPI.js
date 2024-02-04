import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getWorkHouseLogAPI = async () => {
  try {
    const result = await get(
      `${API_BASE_URL}/WorkHouseLog/getWorkHouseLoglist`
    );
    return result;
  } catch (error) {
    console.error("getWorkHouseLogAPI --->:", error);
    return error;
  }
};
const getWorkHouseLogByIdAPI = async (Id) => {
  try {
    const result = await get(
      `${API_BASE_URL}/WorkHouseLog/getWorkHousebyid/${Id}`
    );
    return result;
  } catch (error) {
    console.error("getWorkHouseLogByIdAPI --->:", error);
    return error;
  }
};
const createWorkHouseLogApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/WorkHouseLog/addWorkHouseLog`,
      data
    );
    return result;
  } catch (error) {
    console.error("createWorkHouseLogApi --->:", error);
    return error;
  }
};
const updateWorkHouseLogApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/WorkHouseLog/updateWorkHouseLog`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateWorkHouseLogApi --->:", error);
    return error;
  }
};
const deleteWorkHouseLogApi = async (data) => {
  try {
    const result = await post(
      `${API_BASE_URL}/WorkHouseLog/deleteWorkHouseLog/${data}`
    );
    return result;
  } catch (error) {
    console.error("deleteWorkHouseLogApi --->:", error);
    return error;
  }
};
export {
  getWorkHouseLogAPI,
  getWorkHouseLogByIdAPI,
  createWorkHouseLogApi,
  updateWorkHouseLogApi,
  deleteWorkHouseLogApi,
};
