import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getInventoryAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/inventory/getInventorylist`);
    return result;
  } catch (error) {
    console.error("getInventoryAPI --->:", error);
    return error;
  }
};
const getInventoryByIdAPI = async (Id) => {
  try {
    const result = await get(
      `${API_BASE_URL}/inventory/getInventorybyid/${Id}`
    );
    return result;
  } catch (error) {
    console.error("getInventoryByIdAPI --->:", error);
    return error;
  }
};
const createInventoryApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/inventory/AddIventory`,
      data
    );
    return result;
  } catch (error) {
    console.error("createInventoryApi --->:", error);
    return error;
  }
};
const updateInventoryApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/inventory/updateInventory`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateInventoryApi --->:", error);
    return error;
  }
};
const deleteInventoryApi = async (data) => {
  try {
    const result = await post(
      `${API_BASE_URL}/inventory/deleteInventory/${data}`
    );
    return result;
  } catch (error) {
    console.error("deleteInventoryApi --->:", error);
    return error;
  }
};
export {
  getInventoryAPI,
  getInventoryByIdAPI,
  createInventoryApi,
  updateInventoryApi,
  deleteInventoryApi,
};
