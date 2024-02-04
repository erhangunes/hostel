// Redux'tan token'ı çeken bir custom hook
import { decrypt } from "@/libs/encryption";

function useAuthToken() {
  if (typeof window !== "undefined") {
    // Tarayıcıda çalışan kod
    const storedValue = localStorage.getItem("persist:root");

    if (storedValue) {
      const data = JSON.parse(storedValue);

      if (data && data.auth) {
        const decryptedData = data.auth;
        try {
          const parsedData = JSON.parse(decryptedData);
          const decryptUserData = decrypt(parsedData.user);
          const auth = JSON.parse(decryptUserData);
          return auth;
        } catch (error) {
          console.error("Error parsing decrypted data:", error);
        }
      } else {
        console.error(
          "Invalid data format or missing 'auth' field in stored value."
        );
      }
    } else {
      console.error(
        "No stored value found with the key 'persist:root' in localStorage."
      );
    }
  }

  return null;
}

export default useAuthToken;
