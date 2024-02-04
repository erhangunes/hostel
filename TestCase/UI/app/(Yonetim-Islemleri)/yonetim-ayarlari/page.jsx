"use client";
import { useEffect, useState } from "react";
import ModalApp from "@/components/Modal";
import {
  FileAddOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  Space,
  Table,
  Form,
  Input,
  Empty,
  Card,
  Button,
  Skeleton,
  Popconfirm,
  message,
} from "antd";
import { useLoading } from "@/context/LoadingContext";
import withAuth from "@/app/withAuth";
import { getUsersApi, registerUserApi } from "@/app/services/authApi";

const YonetimAyarlariPage = () => {
  const { isLoading } = useLoading();
  const [form] = Form.useForm();
  //#region STATEMNG
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [openCreateModalPopConfirm, setOpenCreateModalPopConfirm] =
    useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [openUpdateModalPopConfirm, setOpenUpdateModalPopConfirm] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [createAuthData, setCreateAuthData] = useState(null);
  const [updateCreateData, setUpdateCreateData] = useState(null);
  const [AuthData, setAuthData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  //#endregion
  //#region MODAL
  const openCreateModal = () => {
    setCreateModalOpen(true);
  };
  const closeCreateModal = async () => {
    if (!openCreateModalPopConfirm) {
      setCreateModalOpen(false);
      setOpenCreateModalPopConfirm(false);
      form.resetFields();
    }
  };
  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };
  const closeUpdateModal = async () => {
    if (!openUpdateModalPopConfirm) {
      setUpdateModalOpen(false);
      setOpenUpdateModalPopConfirm(false);
      form.resetFields();
    }
  };
  //#endregion
  //#region ACTIONS

  const handleCreateCustomerOk = (values) => {
    setOpenCreateModalPopConfirm(true);
    setCreateAuthData(values);
  };
  const handleUpdateCustomerOk = (values) => {
    setOpenUpdateModalPopConfirm(true);
    setUpdateCreateData(values);
  };
  const handleCreateModalPopConfirmCancel = () => {
    setOpenCreateModalPopConfirm(false);
    setConfirmLoading(false);
  };
  const handleUpdateModalPopConfirmCancel = () => {
    setOpenUpdateModalPopConfirm(false);
    setConfirmLoading(false);
  };

  const onFinishFailed = (errorInfo) => {};
  //#endregion
  //#region TableColumns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
  ];

  //#endregion
  //#region API REQUEST
  const CreateAuthApi = async () => {
    debugger;
    const result = await registerUserApi(createAuthData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenCreateModalPopConfirm(false);
      await GetAuthApi();
      setCreateModalOpen(false);
      form.resetFields();
    } else {
      message.error({
        content: result.responseMessage,
      });
      setOpenCreateModalPopConfirm(false);
      setConfirmLoading(false);
    }
  };

  const GetAuthApi = async () => {
    const result = await getUsersApi();
    if (result.isSuccess == true) {
      setAuthData(result.resultSet);
    }
  };

  //#endregion
  //#region HOOKS
  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetAuthApi();
      setLoading(isLoading);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  //#endregion

  return (
    <>
      {contextHolder}
      <Card
        loading={loading}
        title="Kayıtlı Yönetici İşlemleri"
        extra={
          <Button
            type="dashed"
            icon={<FileAddOutlined />}
            onClick={() => {
              openCreateModal();
            }}
          >
            Yeni Yönetici Ekle
          </Button>
        }
      >
        {AuthData && AuthData.length > 0 ? (
          <Card>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={AuthData.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
                locale={{ emptyText: <Empty description="Veri Bulunamadı" /> }}
              />{" "}
            </Skeleton>
          </Card>
        ) : (
          <Empty description="Veri Bulunamadı" />
        )}

        <ModalApp
          isOpen={createModalOpen}
          title="Yeni Yönetici Ekle"
          content={
            <Card>
              <Form
                name="basic"
                onFinish={handleCreateCustomerOk}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                form={form}
              >
                <Form.Item
                  label="Yönetici Kullanıcı Adı"
                  name="UserName"
                  rules={[
                    {
                      required: true,
                      message: "Yönetici Kullanıcı Adı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Yönetici Kullanıcı Adı"
                  />
                </Form.Item>

                <Form.Item
                  label="Yönetici Kullanıcı Şifre"
                  name="Password"
                  rules={[
                    {
                      required: true,
                      message: "Yönetici Kullanıcı Şifre Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Yönetici Kullanıcı Şifre"
                  />
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Yeni Yönetici Eklemek İstiyor musunuz ?"
                    okText="Evet"
                    cancelText="Hayır"
                    open={openCreateModalPopConfirm}
                    onConfirm={CreateAuthApi}
                    okButtonProps={{
                      loading: confirmLoading,
                    }}
                    onCancel={handleCreateModalPopConfirmCancel}
                  >
                    {" "}
                  </Popconfirm>
                  <Button
                    type="default"
                    icon={<CheckCircleOutlined />}
                    htmlType="submit"
                  >
                    Kaydet
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          }
          onClose={closeCreateModal}
        />
      </Card>
    </>
  );
};
export default withAuth(YonetimAyarlariPage);
