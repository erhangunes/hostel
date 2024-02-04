"use client";

import { LayoutProvider } from "./layoutprovider";
import Loading from "../components/Loading";
import { LoadingProvider } from "@/context/LoadingContext";
import AppLayout from "@/components/Loading/layout";
import { Providers } from "./redux/provider";
import Script from "next/script";
import { useEffect } from "react";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  useEffect(() => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.style.display = "block";
      document.querySelector(".loading-screen").style.display = "none";
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Yönetim Paneli</title>
        <link rel="stylesheet" href="/css/hostel-global.css" />
        <link rel="stylesheet" href="/css/icons.css" />
        <link rel="stylesheet" href="/css/boostrap.min.css" />
        <link rel="stylesheet" href="/css/loading.css" />
      </head>
      <body>
        <div className="loading-screen">
          <div className="loader"></div>
        </div>
        <div id="content" style={{ display: "none" }}>
          <Providers>
            <LoadingProvider>
              <LayoutProvider>
                <Loading />
                <AppLayout>{children}</AppLayout>
              </LayoutProvider>
            </LoadingProvider>
          </Providers>
        </div>
        <Script src="/js/loading.js"></Script>
      </body>
    </html>
  );
}
