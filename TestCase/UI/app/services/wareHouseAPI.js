import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getWareHouseAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/WareHouse/getWareHouselist`);
    return result;
  } catch (error) {
    console.error("getWareHouseAPI --->:", error);
    return error;
  }
};
const getWareHouseByIdAPI = async (Id) => {
  try {
    const result = await get(
      `${API_BASE_URL}/WareHouse/getWareHousebyid/${Id}`
    );
    return result;
  } catch (error) {
    console.error("getWareHouseByIdAPI --->:", error);
    return error;
  }
};
const createWareHouseApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/WareHouse/addWareHouse`,
      data
    );
    return result;
  } catch (error) {
    console.error("createWareHouseApi --->:", error);
    return error;
  }
};
const updateWareHouseApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/WareHouse/updateWareHouse`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateWareHouseApi --->:", error);
    return error;
  }
};
const deleteWareHouseApi = async (data) => {
  try {
    const result = await post(
      `${API_BASE_URL}/WareHouse/deleteWareHouse/${data}`
    );
    return result;
  } catch (error) {
    console.error("deleteWareHouseApi --->:", error);
    return error;
  }
};
export {
  getWareHouseAPI,
  getWareHouseByIdAPI,
  createWareHouseApi,
  updateWareHouseApi,
  deleteWareHouseApi,
};
