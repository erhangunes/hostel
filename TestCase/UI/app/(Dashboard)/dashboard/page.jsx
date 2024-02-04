"use client";
import React, { useEffect, useState } from "react";
import { Row, Table, Col, Empty, Card, Skeleton, message, Alert } from "antd";
import DonutChart from "./chart/pieChart";
import StatisticsCards from "./chart/statisticChart";
import withAuth from "@/app/withAuth";
import { getStatisticAPI } from "@/app/services/statisticAPI";
import { getWorkHouseLogAPI } from "@/app/services/workHouseLogAPI";
import { useLoading } from "@/context/LoadingContext";
import { getWorkOrderAPI } from "@/app/services/workOrderAPI";
const Dashboard = () => {
  const { isLoading } = useLoading();
  const [loading, setLoading] = useState(true);

  const [statisticData, setStatisticData] = useState([]);
  const [WorkOrderData, setWorkOrderData] = useState([]);

  useEffect(() => {
    const getStatistic = async () => {
      const result = await getStatisticAPI();
      if (result.isSuccess == true) {
        setStatisticData(result.resultSet);
      } else {
        message.error({ content: result.responseMessage });
      }
    };
    getStatistic();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await GetWorkOrderApi();
      setLoading(isLoading);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const GetWorkOrderApi = async () => {
    const result = await getWorkOrderAPI();
    if (result.isSuccess == true) {
      setWorkOrderData(result.resultSet);
    }
  };
  //#region CHART
  // Veri örneği
  const StatisticCard = () => {
    return <StatisticsCards data={statisticData} />;
  };
  const chartData = [
    { type: "Genel Kontrol", value: statisticData.generalCount },
    { type: "Envanter", value: statisticData.inventoryCount },
    { type: "Tanım", value: statisticData.definationCount },
    { type: "Depo", value: statisticData.wareHouseCount },
    { type: "Depo Çıkış", value: statisticData.wareHouseLogCount },
  ];
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
      render: (_, record) => record.definations[0]?.definationName,
    },
    {
      title: "Ürün Adı",
      dataIndex: "productName",
      key: "productName",
      render: (_, record) => record.product[0]?.productName,
    },
    {
      title: "Ürün Kodu",
      dataIndex: "productSerialCode",
      key: "productSerialCode",
      render: (_, record) => record.product[0]?.productSerialCode,
    },
    {
      title: "Bina Adı",
      dataIndex: "buildingName",
      key: "buildingName",
      render: (_, record) => record.building[0]?.buildingName,
    },
    {
      title: "Oda Adı",
      dataIndex: "roomName",
      key: "roomName",
      render: (_, record) => record.room[0]?.roomName,
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
  ];

  //#endregion
  return (
    <>
      {" "}
      <StatisticCard />
      <div
        style={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          margin: "10px 0",
          opacity: 0.5,
        }}
      ></div>
      <Row gutter={24} style={{ marginTop: 5 }}>
        <Col span={7}>
          <Card className="card" loading={loading} title="Diğer İşlem Sayıları">
            {" "}
            <DonutChart data={chartData} />
          </Card>
        </Col>
        <Col span={17}>
          <Card
            className="card"
            loading={loading}
            title="Kayıtlı İş Emri İşlemleri"
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
                    locale={{
                      emptyText: <Empty description="Veri Bulunamadı" />,
                    }}
                  />{" "}
                </Skeleton>
              </Card>
            ) : (
              <Empty description="Veri Bulunamadı" />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default withAuth(Dashboard);
