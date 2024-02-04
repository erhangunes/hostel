"use client";
import React from "react";
import { Layout, Breadcrumb, theme } from "antd";
import HeaderApp from "./Header/header";
import FooterApp from "./Footer/footer";
import SiderApp from "./Sider/sider";
import { usePathname } from "next/navigation";
import withAuth from "@/app/withAuth";
import { decrypt } from "@/libs/encryption";
import { useSelector } from "react-redux";

const { Content } = Layout;

function AppLayout({ children }) {
  const pathname = usePathname();

  const loginPath = "/login";
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {pathname !== loginPath && <SiderApp />}

      <Layout>
        {pathname !== loginPath && <HeaderApp />}

        <Content
          style={
            pathname === "/login"
              ? { margin: "0 0px" }
              : { margin: "30px 16px" }
          }
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        {pathname !== loginPath && <FooterApp />}
      </Layout>
    </Layout>
  );
}

export default withAuth(AppLayout);
