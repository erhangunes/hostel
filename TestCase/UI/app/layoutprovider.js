"use client";

import { usePathname } from "next/navigation";

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/login"}
      {children}
    </>
  );
};
