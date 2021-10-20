import React, { useState } from "react";
import { Form, Row, Col, DatePicker, Input, Select, Button, Table } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import {
  StatusList,
  IdentifyScore,
  Partner,
  CustomerType,
  RiskManagement,
  DefaultFormValue,
  TableColumns,
  SampleDataSource
} from "./Constants";

function EkycContractView({ camundaAPI }) {
  const [form] = Form.useForm();
  const [sampleData, setSampleDate] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");

  const cockpitApi = camundaAPI.cockpitApi;
  const engine = camundaAPI.engine;

  const onFinish = (values) => {
    setIsSearch(true);
    const data = {};
    if (values["FromDate"] !== "")
      values["FromDate"] = values["FromDate"].format("YYYYMMDD");
    if (values["ToDate"] !== "")
      values["ToDate"] = values["ToDate"].format("YYYYMMDD");
    Object.entries(values).forEach(([key, val]) => {
      data[key] = val;
    });
    console.log(JSON.stringify(data));
    fetch(`${cockpitApi}/plugin/cockpit-plugin/${engine}/mockData`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": camundaAPI.CSRFToken,
      },
      //body: "{ \"first\": \"undefined\", \"second\": \"hello\" }",
      body: JSON.stringify(data),
      method: "POST",
    })
      .then(async (res) => {
        let data = await res.json();
        console.log(data);
        setSampleDate(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div style={{ padding: "0 100px" }}>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        style={{ marginBottom: 50 }}
        initialValues={DefaultFormValue}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="FromDate" label="Từ ngày">
              <DatePicker style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="ToDate" label="Đến ngày">
              <DatePicker style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="IP"
              label="IP"
              //validateStatus={validate ? "error" : "success"}
              //help={validate ? "IP should not be empty" : ""}
              rules={[
                {
                  pattern:
                    "^([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\\.([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3}$",
                  message: "IP format is incorrect",
                },
              ]}
            >
              <Input style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="Status" label="Trạng thái">
              <Select defaultValue="" style={{ float: "right", width: 300 }}>
                {Object.entries(StatusList).map(([key, val]) => (
                  <Select.Option value={key}>{val}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="Score" label="Điểm định danh">
              <Select defaultValue="" style={{ float: "right", width: 300 }}>
                {Object.entries(IdentifyScore).map(([key, val]) => (
                  <Select.Option value={key}>{val}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="MerchantID" label="Đối tác">
              <Select defaultValue="" style={{ float: "right", width: 300 }}>
                <Select.Option value="">Đối tác</Select.Option>
                {Object.entries(Partner).map(([key, val]) => (
                  <Select.Option value={key}>{val}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="FullName" label="Tên khách hàng">
              <Input style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="MobileNo"
              label="SĐT"
              rules={[
                {
                  pattern: "^[0][0-9]{9}$",
                  message: "SĐT không đúng định dạng",
                },
              ]}
            >
              <Input style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="IDNo" label="CMND">
              <Input style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name="RiskKind" label="QLRR">
              <Select
                defaultValue="default"
                style={{ float: "right", width: 300 }}
              >
                {Object.entries(RiskManagement).map(([key, val]) => (
                  <Select.Option value={key}>{val}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="UserID" label="User xử lý">
              <Input style={{ float: "right", width: 300 }} value="hello" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="UserProcess" label="Loại khách hàng">
              <Select
                defaultValue="default"
                style={{ float: "right", width: 300 }}
              >
                {Object.entries(CustomerType).map(([key, val]) => (
                  <Select.Option value={key}>{val}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "0 10px" }}
            >
              TÌM KIẾM
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "0 10px" }}
            >
              NHẬN XLHS
            </Button>
            <Button
              type="primary"
              htmlType="button"
              style={{ margin: "0 10px" }}
            >
              HỒ SƠ CẦN XỬ LÝ
            </Button>
            <Button
              type="primary"
              htmlType="button"
              style={{ margin: "0 10px" }}
            >
              EXCEL
            </Button>
          </Col>
        </Row>
      </Form>
      {isSearch && (
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          dataSource={sampleData}
          columns={TableColumns}
        />
      )}
    </div>
  );
}

export default EkycContractView;
