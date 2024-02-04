import React, { useEffect, useRef, useState } from "react";
import { Col, Card, Row, Statistic } from "antd";
import Chart from "chart.js/auto";

const StatisticCard = ({ title, value, chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const donutChart = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      donutChart.destroy();
    };
  }, [chartData, title]);

  return (
    <Col span={6}>
      <Card className="card">
        <Row align="middle">
          <Col span={6}>
            <canvas ref={chartRef} width="25" height="25"></canvas>
          </Col>
          <Col span={16}>
            <div className="text-end">
              <h3 className="text-dark mt-1">
                <Statistic value={value} />
              </h3>
              <p className="text-muted mb-1 text-truncate">{title}</p>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

const Dashboard = ({ data }) => {
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  const userData = {
    datasets: [
      {
        data: [data.usersCount],
        backgroundColor: ["#36A2EB"],
      },
    ],
  };

  const buildingData = {
    datasets: [
      {
        data: [data.buildingCount],
        backgroundColor: ["#FF6384"],
      },
    ],
  };

  const productData = {
    datasets: [
      {
        data: [data.productCount],
        backgroundColor: ["#4CAF50"],
      },
    ],
  };

  const workOrderData = {
    datasets: [
      {
        data: [data.workOrderCount],
        backgroundColor: ["#FF9800"],
      },
    ],
  };
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {}, 1000);
    setLoading(false);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  return (
    <div>
      {loading ? (
        <></>
      ) : (
        <Row gutter={24}>
          <StatisticCard
            title="Toplam Yönetici Sayısı"
            value={data.usersCount}
            chartData={userData}
          />
          <StatisticCard
            title="Toplam Bina Sayısı"
            value={data.buildingCount}
            chartData={buildingData}
          />
          <StatisticCard
            title="Toplam Ürün Sayısı"
            value={data.productCount}
            chartData={productData}
          />
          <StatisticCard
            title="Toplam İş Emri Sayısı"
            value={data.workOrderCount}
            chartData={workOrderData}
          />
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
