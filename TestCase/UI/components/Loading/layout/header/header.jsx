import React, { useEffect } from "react";
import {
  Col,
  Layout,
  Row,
  theme,
  Avatar,
  Dropdown,
  Space,
  Badge,
  message,
  Button,
} from "antd";
import { LockOutlined, DownOutlined } from "@ant-design/icons";
import { decrypt } from "@/libs/encryption";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/redux/slices/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import withAuth from "@/app/withAuth";

const { Header } = Layout;
const HeaderApp = () => {
  const authUser = JSON.parse(decrypt(useSelector((state) => state.auth.user)));
  const [user, setUser] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogoutClick = (e) => {
    message.success({ content: "Çıkış İşleminiz Yapıldı." });
    dispatch(logout());
    router.push("/login");
  };
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    } else {
      message.success({ content: "Çıkış İşleminiz Yapıldı." });
      router.push("/login");
      dispatch(logout());
    }
  }, []);

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row justify="end">
        <Col>
          <Button
            placement="bottom"
            icon={<LockOutlined />}
            size="middle"
            onClick={() => handleLogoutClick()}
            style={{
              marginTop: 17,
              marginRight: 5,
            }}
          >
            <> Oturumu Kapat</>
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default withAuth(HeaderApp);
