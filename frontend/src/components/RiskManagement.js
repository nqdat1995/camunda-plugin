import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "antd";

function RiskManagement() {
  const [devices, setDevices] = useState([]);
  const [ips, setIps] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let getDevices = () => {
      // fetch data
    };
    getDevices();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "SĐT",
      dataIndex: "MobileNo",
      key: "MobileNo",
    },
    {
      title: "Tên KH",
      dataIndex: "CustomerName",
      key: "CustomerName",
    },
    {
      title: "Ngày sinh",
      dataIndex: "DOB",
      key: "DOB",
    },
    {
      title: "CMND/CCCD/Hộ Chiếu",
      dataIndex: "IDNo",
      key: "IDNo",
    },
    {
      title: "Loại",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Điểm",
      dataIndex: "Score",
      key: "Score",
    },
    {
      title: "Thất bại",
      dataIndex: "Fail",
      key: "Fail",
    },
    {
      title: "XLRR",
      dataIndex: "XLRR",
      key: "XLRR",
    },
    {
      title: "XLHS",
      dataIndex: "XLHS",
      key: "XLHS",
    },
  ];

  return (
    <div>
      <Row gutter={24}>
        <Col span={24}>
          Thiết bị sử dụng:{" "}
          <b>D5F6AD4F654DSF654ASD6F546D4SF6A4D6A4F6DS4F6A46AFD4SA654DS</b>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Table dataSource={devices} columns={columns} pagination={false} />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          IP: <b>192.168.1.1</b>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Table dataSource={ips} columns={columns} pagination={false} />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          User: <b>03847828473</b>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Table dataSource={users} columns={columns} pagination={false} />
        </Col>
      </Row>
    </div>
  );
}
export default RiskManagement;
