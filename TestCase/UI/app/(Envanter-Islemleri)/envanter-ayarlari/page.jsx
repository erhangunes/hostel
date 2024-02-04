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
  Select,
  Button,
  Skeleton,
  Popconfirm,
  message,
} from "antd";
import { useLoading } from "@/context/LoadingContext";
import withAuth from "@/app/withAuth";
import {
  createInventoryApi,
  deleteInventoryApi,
  getInventoryAPI,
  getInventoryByIdAPI,
  updateInventoryApi,
} from "@/app/services/inventoryAPI";
import { getWareHouseAPI } from "@/app/services/wareHouseAPI";

const EnvanterAyarlariPage = () => {
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
  const [createInventoryData, setCreateInventoryData] = useState(null);
  const [updateCreateData, setUpdateCreateData] = useState(null);
  const [InventoryData, setInventoryData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [wareHouseData, setWareHouseData] = useState([]);

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
    setCreateInventoryData(values);
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
      dataIndex: "inventoryId",
      key: "inventoryId",
    },
    {
      title: "Envanter Adı",
      dataIndex: "inventoryName",
      key: "inventoryName",
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
            onClick={() => GetInventoryDataById(record)}
            color="#fff"
            icon={<EditOutlined />}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Dikkat!"
            description={`${record.inventoryName} Envanter Kaydını Silmek İstiyor musunuz?`}
            onConfirm={() => DeleteInventoryApi(record)}
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
  const CreateInventoryApi = async () => {
    debugger;
    const result = await createInventoryApi(createInventoryData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenCreateModalPopConfirm(false);
      await GetInventoryApi();
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
  const UpdateInventoryApi = async () => {
    debugger;
    setConfirmLoading(true);
    const newInventoryData = {
      inventoryId: form.getFieldValue("inventoryId"),
      inventoryName: form.getFieldValue("inventoryName"),
      wareHouseId: form.getFieldValue("wareHouseId"),
    };
    const result = await updateInventoryApi(newInventoryData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenUpdateModalPopConfirm(false);
      await GetInventoryApi();
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
  const DeleteInventoryApi = async (record) => {
    const result = await deleteInventoryApi(record.inventoryId);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });

      setConfirmLoading(false);
      await GetInventoryApi();
    } else {
      message.error({
        content: result.responseMessage,
      });
    }
  };

  const GetInventoryApi = async () => {
    const result = await getInventoryAPI();
    if (result.isSuccess == true) {
      setInventoryData(result.resultSet);
    }
  };
  const GetWareHouseApi = async () => {
    const result = await getWareHouseAPI();
    if (result.isSuccess == true) {
      setWareHouseData(result.resultSet);
    }
  };
  const GetInventoryDataById = async (record) => {
    debugger;
    openUpdateModal();
    const result = await getInventoryByIdAPI(record.inventoryId);
    if (result.isSuccess == true) {
      form.setFieldsValue({
        inventoryId: result.resultSet.inventoryId,
        inventoryName: result.resultSet.inventoryName,
        wareHouseId: result.resultSet.wareHouseId,
      });
    }
  };
  //#endregion
  //#region HOOKS
  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetInventoryApi();
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
        title="Kayıtlı Envanter İşlemleri"
        extra={
          <Button
            type="dashed"
            icon={<FileAddOutlined />}
            onClick={() => {
              openCreateModal();
            }}
          >
            Yeni Envanter Ekle
          </Button>
        }
      >
        {InventoryData && InventoryData.length > 0 ? (
          <Card>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={InventoryData.map((item) => ({
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
          title="Yeni Envanter Ekle"
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
                  label="Envanter Adı"
                  name="inventoryName"
                  rules={[
                    {
                      required: true,
                      message: "Envanter Adı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Envanter Adı"
                  />
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
                    description="Yeni Envanter Eklemek İstiyor musunuz ?"
                    okText="Evet"
                    cancelText="Hayır"
                    open={openCreateModalPopConfirm}
                    onConfirm={CreateInventoryApi}
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
          title="Envanter Düzenleme Formu"
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
                  label="Envanter Adı"
                  name="inventoryName"
                  rules={[
                    {
                      required: true,
                      message: "Envanter Adı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Envanter Adı"
                  />
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
                    description="Envanteri Düzenlemek İstiyor musunuz ?"
                    open={openUpdateModalPopConfirm}
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={UpdateInventoryApi}
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
export default withAuth(EnvanterAyarlariPage);
