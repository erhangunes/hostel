import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getRoomAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/Room/getRoomlist`);
    return result;
  } catch (error) {
    console.error("getRoomAPI --->:", error);
    return error;
  }
};
const getRoomByIdAPI = async (Id) => {
  try {
    const result = await get(`${API_BASE_URL}/Room/getRoombyid/${Id}`);
    return result;
  } catch (error) {
    console.error("getRoomByIdAPI --->:", error);
    return error;
  }
};
const createRoomApi = async (data) => {
  try {
    const result = await postJSON(`${API_BASE_URL}/Room/addRoom`, data);
    return result;
  } catch (error) {
    console.error("createRoomApi --->:", error);
    return error;
  }
};
const updateRoomApi = async (data) => {
  try {
    const result = await postJSON(`${API_BASE_URL}/Room/updateRoom`, data);
    return result;
  } catch (error) {
    console.error("updateRoomApi --->:", error);
    return error;
  }
};
const deleteRoomApi = async (data) => {
  try {
    const result = await post(`${API_BASE_URL}/Room/deleteRoom/${data}`);
    return result;
  } catch (error) {
    console.error("deleteRoomApi --->:", error);
    return error;
  }
};
export {
  getRoomAPI,
  getRoomByIdAPI,
  createRoomApi,
  updateRoomApi,
  deleteRoomApi,
};
