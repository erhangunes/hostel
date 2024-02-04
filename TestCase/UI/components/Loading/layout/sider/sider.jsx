// components/Sider.js
import React, { useEffect, useState } from "react";
import { Layout, Menu, theme, Avatar } from "antd";
import {
  FormOutlined,
  ProjectOutlined,
  PieChartOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ApiOutlined,
  AppstoreAddOutlined,
  UserSwitchOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { decrypt } from "@/libs/encryption";
import { useSelector } from "react-redux";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Anasayfa", "/"),
  getItem("Yönetici İşlemleri", "sub8", <UserSwitchOutlined />, [
    getItem("Yönetici Ayarları", "yonetim-ayarlari"),
  ]),
  getItem("Bina", "sub1", <ShopOutlined />, [
    getItem("Bina Ayarları", "bina-ayarlari"),
  ]),
  getItem("Tanım", "sub2", <ProjectOutlined />, [
    getItem("Tanım Ayarları", "tanim-ayarlari"),
  ]),
  getItem("Genel Kontrol", "sub3", <FormOutlined />, [
    getItem("Genel Kontrol Ayarları", "genel-kontrol-ayarlari"),
  ]),
  getItem("Envanter", "sub4", <AppstoreOutlined />, [
    getItem("Envanter Ayarları", "envanter-ayarlari"),
  ]),
  getItem("Ürünler", "sub5", <PieChartOutlined />, [
    getItem("Ürün Ayarları", "urun-ayarlari"),
  ]),
  getItem("Odalar", "sub6", <ApiOutlined />, [
    getItem("Oda Ayarları", "oda-ayarlari"),
  ]),

  getItem("Depolar", "sub7", <ClusterOutlined />, [
    getItem("Depo Ayarları", "depo-ayarlari"),
    getItem("Depo Çıkış İşlemleri", "depo-cikis-ayarlari"),
  ]),

  getItem("İş Emri İşlemleri", "sub/", <AppstoreAddOutlined />, [
    getItem("İş Emri Ayarları", "is-emri-ayarlari"),
  ]),
];
function renderMenuItems(items, currentPath) {
  return items.map((item) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
          {renderMenuItems(item.children, currentPath)}
        </Menu.SubMenu>
      );
    } else {
      const isActive = `/${item.key}` === currentPath;
      const menuItemClass = isActive ? "active" : "";

      return (
        <Menu.Item key={item.key} icon={item.icon} className={menuItemClass}>
          <Link href={`/${item.key}`}>
            {item.icon} {item.label}
          </Link>
        </Menu.Item>
      );
    }
  });
}
function SiderApp() {
  const [collapsed, setCollapsed] = useState(false);
  const authUser = JSON.parse(decrypt(useSelector((state) => state.auth.user)));
  const [user, setUser] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    } else {
    }
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column", // Display items in a column
          marginTop: "-2px",
          marginBottom: 20,
          alignItems: "center",
          color: "#fff", // Set text color to white
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: "600", marginTop: 20 }}>
          Hoşgeldin {user.userName}
        </span>
        <span
          style={{ fontSize: "12px", textAlign: "center", fontWeight: "600" }}
        ></span>
      </div>
      <Menu theme="dark" defaultSelectedKeys={["/"]} mode="vertical">
        {renderMenuItems(items, usePathname)}
      </Menu>
    </Sider>
  );
}

export default SiderApp;
