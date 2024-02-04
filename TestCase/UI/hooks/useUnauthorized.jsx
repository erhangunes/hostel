import { message } from "antd";
const useUnauthorized = () => {
  if (typeof window !== "undefined") {
    // Tarayıcıda çalışan kod
    const storedValue = localStorage.getItem("persist:root");
    const storedRemoveValue = localStorage.removeItem("persist:root");
    message.error({ content: "Oturum Süreniz Doldu." });

    location.assign("/login");
    return;
  }
  return null;
};

export default useUnauthorized;
