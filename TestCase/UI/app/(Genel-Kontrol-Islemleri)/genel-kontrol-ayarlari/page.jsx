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
  Select,
  message,
} from "antd";
import { useLoading } from "@/context/LoadingContext";
import withAuth from "@/app/withAuth";
import {
  createGeneralControlApi,
  deleteGeneralControlApi,
  getGeneralControlAPI,
  getGeneralControlByIdAPI,
  updateGeneralControlApi,
} from "@/app/services/generalControlAPI";
import { getBuildingAPI } from "@/app/services/buildingAPI";
import { getRoomAPI } from "@/app/services/roomAPI";
import { getWareHouseAPI } from "@/app/services/wareHouseAPI";

const GenelKontrolAyarlariPage = () => {
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
  const [createGeneralControlData, setCreateGeneralControlData] =
    useState(null);
  const [updateCreateData, setUpdateCreateData] = useState(null);
  const [GeneralControlData, setGeneralControlData] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [wareHouseData, setWareHouseData] = useState([]);

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
    setCreateGeneralControlData(values);
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
      dataIndex: "generalControld",
      key: "generalControld",
    },
    {
      title: "Bina Adı",
      dataIndex: "buildingName",
      key: "buildingName",
      render: (_, record) => record.building[0].buildingName,
    },
    {
      title: "Oda Adı",
      dataIndex: "roomName",
      key: "roomName",
      render: (_, record) => record.room[0].roomName,
    },
    {
      title: "Depo Adı",
      dataIndex: "wareHouseName",
      key: "wareHouseName",
      render: (_, record) => record.wareHouse[0].wareHouseName,
    },
    {
      title: "Ayarlar",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => GetGeneralControlDataById(record)}
            color="#fff"
            icon={<EditOutlined />}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Dikkat!"
            description={`Genel Kontrol Kaydı Silmek İstiyor musunuz?`}
            onConfirm={() => DeleteGeneralControlApi(record)}
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
  const CreateGeneralControlApi = async () => {
    debugger;
    const result = await createGeneralControlApi(createGeneralControlData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenCreateModalPopConfirm(false);
      await GetGeneralControlApi();
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
  const UpdateGeneralControlApi = async () => {
    debugger;
    setConfirmLoading(true);
    const newGeneralControlData = {
      generalControlId: form.getFieldValue("generalControlId"),
      buildingId: form.getFieldValue("buildingId"),
      roomId: form.getFieldValue("roomId"),
      wareHouseId: form.getFieldValue("wareHouseId"),
    };
    const result = await updateGeneralControlApi(newGeneralControlData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenUpdateModalPopConfirm(false);
      await GetGeneralControlApi();
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
  const DeleteGeneralControlApi = async (record) => {
    const result = await deleteGeneralControlApi(record.generalControld);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });

      setConfirmLoading(false);
      await GetGeneralControlApi();
    } else {
      message.error({
        content: result.responseMessage,
      });
    }
  };

  const GetGeneralControlApi = async () => {
    const result = await getGeneralControlAPI();
    if (result.isSuccess == true) {
      setGeneralControlData(result.resultSet);
    }
  };

  const GetBuildingControlApi = async () => {
    const result = await getBuildingAPI();
    if (result.isSuccess == true) {
      setBuildingData(result.resultSet);
    }
  };
  const GetRoomDataApi = async () => {
    const result = await getRoomAPI();
    if (result.isSuccess == true) {
      setRoomData(result.resultSet);
    }
  };
  const GetWareHouseApi = async () => {
    const result = await getWareHouseAPI();
    if (result.isSuccess == true) {
      setWareHouseData(result.resultSet);
    }
  };
  const GetGeneralControlDataById = async (record) => {
    debugger;
    openUpdateModal();
    const result = await getGeneralControlByIdAPI(record.generalControld);
    if (result.isSuccess == true) {
      form.setFieldsValue({
        generalControlId: result.resultSet.generalControlId,
        buildingId: result.resultSet.buildingId,
        roomId: result.resultSet.roomId,
        wareHouseId: result.resultSet.wareHouseId,
      });
    }
  };
  //#endregion
  //#region HOOKS
  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetGeneralControlApi();
      await GetBuildingControlApi();
      await GetRoomDataApi();
      await GetWareHouseApi();
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
        title="Kayıtlı Genel Kontrol İşlemleri"
        extra={
          <Button
            type="dashed"
            icon={<FileAddOutlined />}
            onClick={() => {
              openCreateModal();
            }}
          >
            Yeni Genel Kontrol Ekle
          </Button>
        }
      >
        {GeneralControlData && GeneralControlData.length > 0 ? (
          <Card>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={GeneralControlData.map((item) => ({
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
          title="Yeni Genel Kontrol Ekle"
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
                  label="Bina Seçiniz"
                  name="buildingId"
                  rules={[
                    {
                      required: true,
                      message: "Bina Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Bina Seçiniz">
                    {buildingData &&
                      buildingData?.map((buildingItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={buildingItem.buildingId}
                          >
                            {" "}
                            {buildingItem.buildingName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Oda Seçiniz"
                  name="roomId"
                  rules={[
                    {
                      required: true,
                      message: "Oda Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Oda Seçiniz">
                    {roomData &&
                      roomData?.map((roomItem, index) => {
                        return (
                          <Select.Option key={index} value={roomItem.roomId}>
                            {" "}
                            {roomItem.roomName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Depo Seçiniz"
                  name="wareHouseId"
                  rules={[
                    {
                      required: true,
                      message: "Depo Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Depo Seçiniz">
                    {wareHouseData &&
                      wareHouseData?.map((wareHouseItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={wareHouseItem.wareHouseId}
                          >
                            {" "}
                            {wareHouseItem.wareHouseName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Yeni Genel Kontrol Eklemek İstiyor musunuz ?"
                    okText="Evet"
                    cancelText="Hayır"
                    open={openCreateModalPopConfirm}
                    onConfirm={CreateGeneralControlApi}
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
          title="Genel Kontrol Düzenleme Formu"
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
                  label="Bina Seçiniz"
                  name="buildingId"
                  rules={[
                    {
                      required: true,
                      message: "Bina Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Bina Seçiniz">
                    {buildingData &&
                      buildingData?.map((buildingItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={buildingItem.buildingId}
                          >
                            {" "}
                            {buildingItem.buildingName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Oda Seçiniz"
                  name="roomId"
                  rules={[
                    {
                      required: true,
                      message: "Oda Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Oda Seçiniz">
                    {roomData &&
                      roomData?.map((roomItem, index) => {
                        return (
                          <Select.Option key={index} value={roomItem.roomId}>
                            {" "}
                            {roomItem.roomName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Depo Seçiniz"
                  name="wareHouseId"
                  rules={[
                    {
                      required: true,
                      message: "Depo Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Depo Seçiniz">
                    {wareHouseData &&
                      wareHouseData?.map((wareHouseItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={wareHouseItem.wareHouseId}
                          >
                            {" "}
                            {wareHouseItem.wareHouseName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Genel Kontrolü Düzenlemek İstiyor musunuz ?"
                    open={openUpdateModalPopConfirm}
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={UpdateGeneralControlApi}
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
export default withAuth(GenelKontrolAyarlariPage);
