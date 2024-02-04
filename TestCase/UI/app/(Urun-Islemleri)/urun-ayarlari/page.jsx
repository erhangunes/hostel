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
  createProductApi,
  deleteProductApi,
  getProductAPI,
  getProductByIdAPI,
  updateProductApi,
} from "@/app/services/productAPI";
import { getInventoryAPI } from "@/app/services/inventoryAPI";

const UrunAyarlariPage = () => {
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
  const [createProductData, setCreateProductData] = useState(null);
  const [updateCreateData, setUpdateCreateData] = useState(null);
  const [ProductData, setProductData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [InventoryData, setInventoryData] = useState([]);

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
    setCreateProductData(values);
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
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Ürün Adı",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Ürün Kodu",
      dataIndex: "productSerialCode",
      key: "productSerialCode",
    },
    {
      title: "Ürün Adeti",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Depo Giriş Tarihi",
      dataIndex: "createAt",
      key: "createAt",
      render: (record) => {
        const date = new Date(record).toLocaleDateString();
        return <span>{date}</span>;
      },
    },

    {
      title: "Depo Adı",
      dataIndex: "wareHouseName",
      key: "wareHouseName",
      render: (_, record) => record.wareHouse[0]?.wareHouseName,
    },
    {
      title: "Envanter Adı",
      dataIndex: "inventoryName",
      key: "inventoryName",
      render: (_, record) => record.inventory[0]?.inventoryName,
    },
    {
      title: "Ayarlar",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => GetProductDataById(record)}
            color="#fff"
            icon={<EditOutlined />}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Dikkat!"
            description={`${record.productName} Ürün Kaydını Silmek İstiyor musunuz?`}
            onConfirm={() => DeleteProductApi(record)}
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
  const CreateProductApi = async () => {
    debugger;
    const result = await createProductApi(createProductData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenCreateModalPopConfirm(false);
      await GetProductApi();
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
  const UpdateProductApi = async () => {
    debugger;
    setConfirmLoading(true);
    const newProductData = {
      productId: form.getFieldValue("productId"),
      productName: form.getFieldValue("productName"),
      productSerialCode: form.getFieldValue("productSerialCode"),
      productQuantity: form.getFieldValue("productQuantity"),
      invantoryId: form.getFieldValue("invantoryId"),
    };
    const result = await updateProductApi(newProductData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenUpdateModalPopConfirm(false);
      await GetProductApi();
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
  const DeleteProductApi = async (record) => {
    const result = await deleteProductApi(record.productId);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });

      setConfirmLoading(false);
      await GetProductApi();
    } else {
      message.error({
        content: result.responseMessage,
      });
    }
  };

  const GetProductApi = async () => {
    const result = await getProductAPI();
    if (result.isSuccess == true) {
      setProductData(result.resultSet);
    }
  };
  const GetInventoryApi = async () => {
    const result = await getInventoryAPI();
    if (result.isSuccess == true) {
      setInventoryData(result.resultSet);
    }
  };
  const GetProductDataById = async (record) => {
    debugger;
    openUpdateModal();
    const result = await getProductByIdAPI(record.productId);
    if (result.isSuccess == true) {
      form.setFieldsValue({
        productId: result.resultSet.productId,
        productName: result.resultSet.productName,
        productSerialCode: result.resultSet.productSerialCode,
        productQuantity: result.resultSet.productQuantity,
        invantoryId: result.resultSet.invantoryId,
      });
    }
  };
  //#endregion
  //#region HOOKS
  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetProductApi();
      await GetInventoryApi();
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
        title="Kayıtlı Ürün İşlemleri"
        extra={
          <Button
            type="dashed"
            icon={<FileAddOutlined />}
            onClick={() => {
              openCreateModal();
            }}
          >
            Yeni Ürün Ekle
          </Button>
        }
      >
        {ProductData && ProductData.length > 0 ? (
          <Card>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={ProductData.map((item) => ({
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
          title="Yeni Ürün Ekle"
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
                  label="Ürün Adı"
                  name="productName"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Adı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Ürün Adı"
                  />
                </Form.Item>
                <Form.Item
                  label="Ürün Seri Numarası"
                  name="productSerialCode"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Seri Numarası Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Ürün Seri Numarası"
                  />
                </Form.Item>
                <Form.Item
                  label="Ürün Adet Sayısı"
                  name="productQuantity"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Adet Sayısı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Ürün Adet Sayısı"
                  />
                </Form.Item>
                <Form.Item
                  label="Envanter Seçiniz"
                  name="invantoryId"
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

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Yeni Ürün Eklemek İstiyor musunuz ?"
                    okText="Evet"
                    cancelText="Hayır"
                    open={openCreateModalPopConfirm}
                    onConfirm={CreateProductApi}
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
          title="Ürün Düzenleme Formu"
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
                  label="Ürün Adı"
                  name="productName"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Adı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Ürün Adı"
                  />
                </Form.Item>
                <Form.Item
                  label="Ürün Seri Numarası"
                  name="productSerialCode"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Seri Numarası Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Ürün Seri Numarası"
                  />
                </Form.Item>
                <Form.Item
                  label="Ürün Adet Sayısı"
                  name="productQuantity"
                  rules={[
                    {
                      required: true,
                      message: "Ürün Adet Sayısı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Ürün Adet Sayısı"
                  />
                </Form.Item>
                <Form.Item
                  label="Envanter Seçiniz"
                  name="invantoryId"
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
                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Ürünü Düzenlemek İstiyor musunuz ?"
                    open={openUpdateModalPopConfirm}
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={UpdateProductApi}
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
export default withAuth(UrunAyarlariPage);
