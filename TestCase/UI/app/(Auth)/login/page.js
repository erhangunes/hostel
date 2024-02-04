"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Form, Input, Button, Card, Col, Row, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { login } from "../../../app/redux/slices/auth/authSlice";
import { useRouter } from "next/navigation";
import { loginUserApi } from "@/app/services/authApi";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadings, setLoadings] = useState(false);
  const router = useRouter();

  const LoginApi = async (values) => {
    setLoadings(true);
    //
    const authInfo = { userName: values.userName, password: values.password };
    debugger;
    const result = await loginUserApi(authInfo);
    if (result.isSuccess == true) {
      message.success({
        content: "Giriş Yapıldı.",
      });
      dispatch(login(result.resultSet));
      setLoadings(false);
      router.push("/dashboard");
    } else {
      message.error({
        content: result.responseMessage,
      });
      setLoadings(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "94vh" }}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card
          style={{ marginBottom: 10, textAlign: "center" }}
          title="Kullanıcı Girişi"
        >
          <Form
            name="login-form"
            onFinish={LoginApi}
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Kullanıcı adı boş bırakılamaz!",
                },
              ]}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Kullanıcı Adı"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {username && (
                  <CheckCircleOutlined
                    style={{ color: "green", marginLeft: "8px" }}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Şifre boş bırakılamaz!",
                },
              ]}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <CheckCircleOutlined
                    style={{ color: "green", marginLeft: "8px" }}
                  />
                )}
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                loading={loadings}
                onClick={() => LoginApi}
                type="primary"
                htmlType="submit"
                icon={<LoginOutlined />}
                style={{ float: "right" }}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
