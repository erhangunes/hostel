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
  createDefinationApi,
  deleteDefinationApi,
  getDefinationAPI,
  getDefinationByIdAPI,
  updateDefinationApi,
} from "@/app/services/definationAPI";

const TanimAyarlariPage = () => {
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
  const [createDefinationData, setCreateDefinationData] = useState(null);
  const [updateCreateData, setUpdateCreateData] = useState(null);
  const [DefinationData, setDefinationData] = useState([]);
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
    setCreateDefinationData(values);
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
      dataIndex: "definationId",
      key: "definationId",
    },
    {
      title: "Tanım Adı",
      dataIndex: "definationName",
      key: "definationName",
    },

    {
      title: "Ayarlar",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            onClick={() => GetDefinationDataById(record)}
            color="#fff"
            icon={<EditOutlined />}
          >
            Düzenle
          </Button>

          <Popconfirm
            title="Dikkat!"
            description={`${record.definationName} Tanım Kaydı Silmek İstiyor musunuz?`}
            onConfirm={() => DeleteDefinationApi(record)}
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
  const CreateDefinationApi = async () => {
    debugger;
    const result = await createDefinationApi(createDefinationData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenCreateModalPopConfirm(false);
      await GetDefinationApi();
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
  const UpdateDefinationApi = async () => {
    debugger;
    setConfirmLoading(true);
    const newDefinationData = {
      definationId: form.getFieldValue("definationId"),
      definationName: form.getFieldValue("definationName"),
    };
    const result = await updateDefinationApi(newDefinationData);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });
      setConfirmLoading(false);
      setOpenUpdateModalPopConfirm(false);
      await GetDefinationApi();
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
  const DeleteDefinationApi = async (record) => {
    const result = await deleteDefinationApi(record.definationId);
    if (result.isSuccess == true) {
      message.success({
        content: result.responseMessage,
      });

      setConfirmLoading(false);
      await GetDefinationApi();
    } else {
      message.error({
        content: result.responseMessage,
      });
    }
  };

  const GetDefinationApi = async () => {
    const result = await getDefinationAPI();
    if (result.isSuccess == true) {
      setDefinationData(result.resultSet);
    }
  };

  const GetDefinationDataById = async (record) => {
    debugger;
    openUpdateModal();
    const result = await getDefinationByIdAPI(record.definationId);
    if (result.isSuccess == true) {
      form.setFieldsValue({
        definationId: result.resultSet.definationId,
        definationName: result.resultSet.definationName,
      });
    }
  };
  //#endregion
  //#region HOOKS
  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetDefinationApi();
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
        title="Kayıtlı Tanım İşlemleri"
        extra={
          <Button
            type="dashed"
            icon={<FileAddOutlined />}
            onClick={() => {
              openCreateModal();
            }}
          >
            Yeni Tanım Ekle
          </Button>
        }
      >
        {DefinationData && DefinationData.length > 0 ? (
          <Card>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={DefinationData.map((item) => ({
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
          title="Yeni Tanım Ekle"
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
                  label="Tanım Adı"
                  name="definationName"
                  rules={[
                    {
                      required: true,
                      message: "Tanım Adı Yazın!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      const value = e.target.value;
                      const limitedNumericValue = value.slice(0, 50);
                      form.setFieldsValue({ value: limitedNumericValue });
                    }}
                    placeholder="Tanım Adı"
                  />
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Yeni Tanım Eklemek İstiyor musunuz ?"
                    okText="Evet"
                    cancelText="Hayır"
                    open={openCreateModalPopConfirm}
                    onConfirm={CreateDefinationApi}
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
          title="Tanım Düzenleme Formu"
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
                  label="Tanım Adı"
                  name="definationName"
                  rules={[
                    {
                      required: true,
                      message: "Tanım Adı Yazın!",
                    },
                  ]}
                >
                  <Input placeholder="Tanım Adı" />
                </Form.Item>

                <Form.Item style={{ float: "right" }}>
                  <Popconfirm
                    title="Bilgilendirme"
                    description="Tanımı Düzenlemek İstiyor musunuz ?"
                    open={openUpdateModalPopConfirm}
                    okText="Evet"
                    cancelText="Hayır"
                    onConfirm={UpdateDefinationApi}
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
export default withAuth(TanimAyarlariPage);
