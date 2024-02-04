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
  Alert,
} from "antd";
import { useLoading } from "@/context/LoadingContext";
import withAuth from "@/app/withAuth";

import { getBuildingAPI } from "@/app/services/buildingAPI";
import { getRoomAPI } from "@/app/services/roomAPI";
import { getWareHouseAPI } from "@/app/services/wareHouseAPI";
import {
  createWorkOrderApi,
  deleteWorkOrderApi,
  getWorkOrderAPI,
  getWorkOrderByIdAPI,
  updateWorkOrderApi,
} from "@/app/services/workOrderAPI";
import { deleteWorkHouseLogApi } from "@/app/services/workHouseLogAPI";
import { getDefinationAPI } from "@/app/services/definationAPI";
import { getInventoryAPI } from "@/app/services/inventoryAPI";
import { getProductAPI } from "@/app/services/productAPI";

const IsEmriAyarlariPage = () => {
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
  const [createWorkOrderData, setCreateWorkOrderData] = useState(null);
  const [updateCreateData, setUpdateCreateData] = useState(null);
  const [WorkOrderData, setWorkOrderData] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [wareHouseData, setWareHouseData] = useState([]);
  const [DefinationData, setDefinationData] = useState([]);
  const [InventoryData, setInventoryData] = useState([]);
  const [ProductData, setProductData] = useState([]);

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
    setCreateWorkOrderData(values);
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
      dataIndex: "workOrderId",
      key: "workOrderId",
    },
    {
      title: "Talep Bilgisi",
      dataIndex: "orderText",
      key: "orderText",
    },
    {
      title: "Talep Kategorisi",
      dataIndex: "definationName",
      key: "definationName",
      render: (_, record) => record.definations[0].definationName,
    },
    {
      title: "Ürün Adı",
      dataIndex: "productName",
      key: "productName",
      render: (_, record) => record.product[0].productName,
    },
    {
      title: "Ürün Kodu",
      dataIndex: "productSerialCode",
      key: "productSerialCode",
      render: (_, record) => record.product[0].productSerialCode,
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
      title: "Envanter Adı",
      dataIndex: "inventoryName",
      key: "inventoryName",
      render: (_, record) => record.inventory[0]?.inventoryName,
    },

    {
      title: "Depo Adı",
      dataIndex: "wareHouseName",
      key: "wareHouseName",
      render: (_, record) => record.wareHouse[0].wareHouseName,
    },
    {
      title: "İslem Durumu",
      dataIndex: "status",
      key: "status",

      render: (text, record) => (
        <span style={{ textAlign: "center" }}>
          {record.status ? (
            <Alert message="Aktif" showIcon type="success" />
          ) : (
            <Alert
              message="Pasif"
              showIcon
              style={{ textAlign: "center" }}
              type="error"
            />
          )}
        </span>
      ),
    },
    {
      title: "Ayarlar",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => GetWorkOrderDataById(record)}
            color="#fff"
            icon={<EditOutlined />}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Dikkat!"
            description={`İş Emri Kaydı Silmek İstiyor musunuz?`}
            onConfirm={() => DeleteWorkOrderApi(record)}
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
  const CreateWorkOrderApi = async () => {
    debugger;
    const result = await createWorkOrderApi(createWorkOrderData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenCreateModalPopConfirm(false);
      await GetWorkOrderApi();
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
  const UpdateWorkOrderApi = async () => {
    debugger;
    setConfirmLoading(true);
    const newWorkOrderData = {
      workOrderId: form.getFieldValue("workOrderId"),
      orderText: form.getFieldValue("orderText"),
      buildingId: form.getFieldValue("buildingId"),
      roomId: form.getFieldValue("roomId"),
      wareHouseId: form.getFieldValue("wareHouseId"),
      inventoryId: form.getFieldValue("inventoryId"),
      definationId: form.getFieldValue("definationId"),
      status: form.getFieldValue("status"),
      productId: form.getFieldValue("productId"),
    };
    const result = await updateWorkOrderApi(newWorkOrderData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenUpdateModalPopConfirm(false);
      await GetWorkOrderApi();
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
  const DeleteWorkOrderApi = async (record) => {
    const result = await deleteWorkOrderApi(record.workOrderId);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });

      setConfirmLoading(false);
      await GetWorkOrderApi();
    } else {
      message.error({
        content: result.responseMessage,
      });
    }
  };

  const GetWorkOrderApi = async () => {
    const result = await getWorkOrderAPI();
    if (result.isSuccess == true) {
      setWorkOrderData(result.resultSet);
    }
  };
  const GetProductApi = async () => {
    const result = await getProductAPI();
    if (result.isSuccess == true) {
      setProductData(result.resultSet);
    }
  };
  const GetDefinationApi = async () => {
    const result = await getDefinationAPI();
    if (result.isSuccess == true) {
      setDefinationData(result.resultSet);
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
  const GetInventoryApi = async () => {
    const result = await getInventoryAPI();
    if (result.isSuccess == true) {
      setInventoryData(result.resultSet);
    }
  };
  const GetWorkOrderDataById = async (record) => {
    debugger;
    openUpdateModal();
    const result = await getWorkOrderByIdAPI(record.workOrderId);
    if (result.isSuccess == true) {
      form.setFieldsValue({
        workOrderId: result.resultSet.workOrderId,
        buildingId: result.resultSet.buildingId,
        roomId: result.resultSet.roomId,
        wareHouseId: result.resultSet.wareHouseId,
        orderText: result.resultSet.orderText,
        inventoryId: result.resultSet.inventoryId,
        definationId: result.resultSet.definationId,
        status: result.resultSet.status,
        productId: result.resultSet.productId,
      });
    }
  };
  //#endregion
  //#region HOOKS
  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetWorkOrderApi();
      await GetBuildingControlApi();
      await GetRoomDataApi();
      await GetWareHouseApi();
      await GetInventoryApi();
      await GetDefinationApi();
      await GetProductApi();
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
        title="Kayıtlı İş Emri İşlemleri"
        extra={
          <Button
            type="dashed"
            icon={<FileAddOutlined />}
            onClick={() => {
              openCreateModal();
            }}
          >
            Yeni İş Emri Ekle
          </Button>
        }
      >
        {WorkOrderData && WorkOrderData.length > 0 ? (
          <Card>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={WorkOrderData.map((item) => ({
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
          title="Yeni İş Emri Ekle"
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
                  label="Ürün Seçiniz"
                  name="productId"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Ürün Seçiniz">
                    {ProductData &&
                      ProductData?.map((productItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={productItem.productId}
                          >
                            {" "}
                            {productItem.productName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Tanım Seçiniz"
                  name="definationId"
                  rules={[
                    {
                      required: true,
                      message: "Tanım Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Tanım Seçiniz">
                    {DefinationData &&
                      DefinationData?.map((definationItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={definationItem.definationId}
                          >
                            {" "}
                            {definationItem.definationName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
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
                <Form.Item
                  label="Envanter Seçiniz"
                  name="inventoryId"
                  rules={[
                    {
                      required: true,
                      message: "Envanter Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Envanter Seçiniz">
                    {InventoryData &&
                      InventoryData?.map((inventoryItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={inventoryItem.inventoryId}
                          >
                            {" "}
                            {inventoryItem.inventoryName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Açıklama Yazın"
                  name="orderText"
                  rules={[
                    {
                      required: true,
                      message: "Açıklama Yazın!",
                    },
                  ]}
                >
                  <Input placeholder="Açıklama Yazın" />
                </Form.Item>
                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Yeni İş Emri Eklemek İstiyor musunuz ?"
                    okText="Evet"
                    cancelText="Hayır"
                    open={openCreateModalPopConfirm}
                    onConfirm={CreateWorkOrderApi}
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
                  label="Ürün Seçiniz"
                  name="productId"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Ürün Seçiniz">
                    {ProductData &&
                      ProductData?.map((productItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={productItem.productId}
                          >
                            {" "}
                            {productItem.productName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Tanım Seçiniz"
                  name="definationId"
                  rules={[
                    {
                      required: true,
                      message: "Tanım Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Tanım Seçiniz">
                    {DefinationData &&
                      DefinationData?.map((definationItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={definationItem.definationId}
                          >
                            {" "}
                            {definationItem.definationName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
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
                <Form.Item
                  label="Envanter Seçiniz"
                  name="inventoryId"
                  rules={[
                    {
                      required: true,
                      message: "Envanter Seçiniz!",
                    },
                  ]}
                >
                  <Select placeholder="Envanter Seçiniz">
                    {InventoryData &&
                      InventoryData?.map((inventoryItem, index) => {
                        return (
                          <Select.Option
                            key={index}
                            value={inventoryItem.inventoryId}
                          >
                            {" "}
                            {inventoryItem.inventoryName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Açıklama Yazın"
                  name="orderText"
                  rules={[
                    {
                      required: true,
                      message: "Açıklama Yazın!",
                    },
                  ]}
                >
                  <Input placeholder="Açıklama Yazın" />
                </Form.Item>
                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Genel Kontrolü Düzenlemek İstiyor musunuz ?"
                    open={openUpdateModalPopConfirm}
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={UpdateWorkOrderApi}
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
export default withAuth(IsEmriAyarlariPage);
