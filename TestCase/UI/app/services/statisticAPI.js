import { get, post, postJSON } from "@/libs/Api/Service";
const { API_BASE_URL } = require("@/libs/generalSettings");

const getStatisticAPI = async () => {
  try {
    const result = await get(`${API_BASE_URL}/statistic/getstatistic`);
    return result;
  } catch (error) {
    console.error("getStatisticAPI --->:", error);
    return error;
  }
};
export { getStatisticAPI };
