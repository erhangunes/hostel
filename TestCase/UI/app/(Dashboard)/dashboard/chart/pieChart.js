import React, { useEffect, useRef } from "react";
import { Card, Row, Col } from "antd";

import Chart from "chart.js/auto";

const DonutChart = ({ data, title }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const donutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((item) => item.type),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(255, 205, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "right",
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
        },
      },
    });

    return () => {
      donutChart.destroy();
    };
  }, [data, title]);

  return (
    <Col span={23}>
      <canvas ref={chartRef} />
    </Col>
  );
};
export default DonutChart;
