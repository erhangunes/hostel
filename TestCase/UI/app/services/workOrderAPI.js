import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getWorkOrderAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/WorkOrder/getWorkOrderlist`);
    return result;
  } catch (error) {
    console.error("getWorkOrderAPI --->:", error);
    return error;
  }
};
const getWorkOrderByIdAPI = async (Id) => {
  try {
    const result = await get(
      `${API_BASE_URL}/WorkOrder/getWorkOrderbyid/${Id}`
    );
    return result;
  } catch (error) {
    console.error("getWorkOrderByIdAPI --->:", error);
    return error;
  }
};
const createWorkOrderApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/WorkOrder/addWorkOrder`,
      data
    );
    return result;
  } catch (error) {
    console.error("createWorkOrderApi --->:", error);
    return error;
  }
};
const updateWorkOrderApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/WorkOrder/updateWorkOrder`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateWorkOrderApi --->:", error);
    return error;
  }
};
const deleteWorkOrderApi = async (data) => {
  try {
    const result = await post(
      `${API_BASE_URL}/WorkOrder/deleteWorkOrder/${data}`
    );
    return result;
  } catch (error) {
    console.error("deleteWorkOrderApi --->:", error);
    return error;
  }
};
export {
  getWorkOrderAPI,
  getWorkOrderByIdAPI,
  createWorkOrderApi,
  updateWorkOrderApi,
  deleteWorkOrderApi,
};
