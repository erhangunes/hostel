import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getProductAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/Product/getProductlist`);
    return result;
  } catch (error) {
    console.error("getProductAPI --->:", error);
    return error;
  }
};
const getProductByIdAPI = async (Id) => {
  try {
    const result = await get(
      `${API_BASE_URL}/Product/getProductlistbyid/${Id}`
    );
    return result;
  } catch (error) {
    console.error("getProductByIdAPI --->:", error);
    return error;
  }
};
const createProductApi = async (data) => {
  try {
    const result = await postJSON(`${API_BASE_URL}/Product/addProduct`, data);
    return result;
  } catch (error) {
    console.error("createProductApi --->:", error);
    return error;
  }
};
const updateProductApi = async (data) => {
  try {
    const result = await postJSON(
      `${API_BASE_URL}/Product/updateProduct`,
      data
    );
    return result;
  } catch (error) {
    console.error("updateProductApi --->:", error);
    return error;
  }
};
const deleteProductApi = async (data) => {
  try {
    const result = await post(`${API_BASE_URL}/Product/deleteProduct/${data}`);
    return result;
  } catch (error) {
    console.error("deleteProductApi --->:", error);
    return error;
  }
};
export {
  getProductAPI,
  getProductByIdAPI,
  createProductApi,
  updateProductApi,
  deleteProductApi,
};
