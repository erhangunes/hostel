import useAuthToken from "@/hooks/useAuthToken";
import useUnauthorized from "@/hooks/useUnauthorized";

import { message } from "antd";
function parseData(data) {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }
  return formData;
}

async function handleUnauthorized() {
  useUnauthorized();
}

function request(url, data = false, method = "GET", type = "FORM_DATA") {
  let cleanedToken = useAuthToken();

  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanedToken.token}`,
        },
      };

      if (data && method === "POST") {
        if (data) {
          options.body =
            type === "JSON" ? JSON.stringify(data) : parseData(data);
        } else {
          options.headers.Authorization = data;
          options.body =
            type === "JSON" ? JSON.stringify(data) : parseData(data);
        }
      }

      const response = await fetch(url, options);
      if (response.status == 401) {
        message.error({
          content: "Oturum Süreniz Doldu!",
        });
        handleUnauthorized();
      } else if (response.status == 403) {
        message.error({
          content: "Bu İşlemi Görmeye Yetkiniz Bulunmamaktadır!",
        });
      } else {
        const result = await response.json();
        if (response.ok) {
          resolve(result);
        } else {
          reject(result);
        }
      }
    } catch (error) {
      return error;
    }
  });
}

export const post = (url, data) => request(url, data, "POST");
export const postJSON = (url, data) => request(url, data, "POST", "JSON");
export const putJSON = (url, data) => request(url, data, "PUT", "JSON");
export const deletes = (url, data) => request(url, data, "DELETE");
export const get = (url, data) => request(url, data);
