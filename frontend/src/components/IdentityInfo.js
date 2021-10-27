import React from "react";
import { Row, Col, Table } from "antd";

function IdentityInfo() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div>
      <Row style={{ padding: 10 }}>
        <Col span={8} xl={8} xs={24}>
          Ngày đăng ký app: <b>22/10/2020</b>
        </Col>
        <Col span={8} xl={8} xs={24}>
          Ngày định danh: <b>22/10/2020</b>
        </Col>
      </Row>
      <Row style={{ padding: 10 }}>
        <Col span={16} xl={16} xs={24}>
          Định danh hiện tại:{" "}
          <b>Định danh cấp 2 - Chờ duyệ định danh trực tuyến</b>
        </Col>
        <Col span={4} xl={4} xs={24}>
          Trạng thái hiện tại: <b>Hoạt động</b>
        </Col>
        <Col span={4} xl={4} xs={24}>
          Loại KH: <b>Chuẩn</b>
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
}
export default IdentityInfo;
