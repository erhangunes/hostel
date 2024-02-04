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
import {
  createRoomApi,
  deleteRoomApi,
  getRoomAPI,
  getRoomByIdAPI,
  updateRoomApi,
} from "@/app/services/roomAPI";

const OdaAyarlariPage = () => {
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
  const [createRoomData, setCreateRoomData] = useState(null);
  const [updateCreateData, setUpdateCreateData] = useState(null);
  const [RoomData, setRoomData] = useState([]);
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
    setCreateRoomData(values);
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
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "Oda Adı",
      dataIndex: "roomName",
      key: "roomName",
    },

    {
      title: "Ayarlar",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => GetRoomDataById(record)}
            color="#fff"
            icon={<EditOutlined />}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Dikkat!"
            description={`${record.roomName} Oda Kaydını Silmek İstiyor musunuz?`}
            onConfirm={() => DeleteRoomApi(record)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="default" icon={<DeleteOutlined />}>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //#endregion
  //#region API REQUEST
  const CreateRoomApi = async () => {
    debugger;
    const result = await createRoomApi(createRoomData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenCreateModalPopConfirm(false);
      await GetRoomApi();
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
  const UpdateRoomApi = async () => {
    debugger;
    setConfirmLoading(true);
    const newRoomData = {
      RoomId: form.getFieldValue("roomId"),
      RoomName: form.getFieldValue("roomName"),
    };
    const result = await updateRoomApi(newRoomData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenUpdateModalPopConfirm(false);
      await GetRoomApi();
      setUpdateModalOpen(false);
      form.resetFields();
    } else {
      message.error({
        content: result.responseMessage,
      });
      setOpenUpdateModalPopConfirm(false);
      setConfirmLoading(false);
    }
  };
  const DeleteRoomApi = async (record) => {
    const result = await deleteRoomApi(record.roomId);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });

      setConfirmLoading(false);
      await GetRoomApi();
    } else {
      message.error({
        content: result.responseMessage,
      });
    }
  };

  const GetRoomApi = async () => {
    const result = await getRoomAPI();
    if (result.isSuccess == true) {
      setRoomData(result.resultSet);
    }
  };

  const GetRoomDataById = async (record) => {
    debugger;
    openUpdateModal();
    const result = await getRoomByIdAPI(record.roomId);
    if (result.isSuccess == true) {
      form.setFieldsValue({
        roomId: result.resultSet.roomId,
        roomName: result.resultSet.roomName,
      });
    }
  };
  //#endregion
  //#region HOOKS
  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetRoomApi();
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
        title="Kayıtlı Oda İşlemleri"
        extra={
          <Button
            type="dashed"
            icon={<FileAddOutlined />}
            onClick={() => {
              openCreateModal();
            }}
          >
            Yeni Oda Ekle
          </Button>
        }
      >
        {RoomData && RoomData.length > 0 ? (
          <Card>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={RoomData.map((item) => ({
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
          title="Yeni Oda Ekle"
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
                  label="Oda Adı"
                  name="roomName"
                  rules={[
                    {
                      required: true,
                      message: "Oda Adı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Oda Adı"
                  />
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Yeni Oda Eklemek İstiyor musunuz ?"
                    okText="Evet"
                    cancelText="Hayır"
                    open={openCreateModalPopConfirm}
                    onConfirm={CreateRoomApi}
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
        <ModalApp
          isOpen={updateModalOpen}
          title="Oda Düzenleme Formu"
          content={
            <Card>
              <Form
                name="basic"
                onFinish={handleUpdateCustomerOk}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                form={form}
              >
                <Form.Item
                  label="Oda Adı"
                  name="roomName"
                  rules={[
                    {
                      required: true,
                      message: "Oda Adı Yazın!",
                    },
                  ]}
                >
                  <Input placeholder="Oda Adı" />
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Odayı Düzenlemek İstiyor musunuz ?"
                    open={openUpdateModalPopConfirm}
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={UpdateRoomApi}
                    okButtonProps={{
                      loading: confirmLoading,
                    }}
                    onCancel={handleUpdateModalPopConfirmCancel}
                  ></Popconfirm>
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
          onClose={closeUpdateModal}
        />
      </Card>
    </>
  );
};
export default withAuth(OdaAyarlariPage);
