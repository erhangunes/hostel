import React, { createContext, useContext, useState } from "react";

// Context'i oluşturma
const LoadingContext = createContext();

// Özel hook, uygulamanın her yerinde yükleme durumuna erişmek için
export const useLoading = () => {
  return useContext(LoadingContext);
};

// Provider bileşeni
export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
