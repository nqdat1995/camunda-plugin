import React, { useState } from "react";
import { Form, Row, Col, DatePicker, Input, Select, Button, Table } from "antd";
import {
  StatusList,
  IdentifyScore,
  Partner,
  CustomerType,
  RiskManagement,
  DefaultFormValue,
  TableColumns,
} from "../Constants";
import "../static/App.css";
import { openNotification } from "../Utils";
import { fetchData, claimApplication, getUser, getTaskList } from "../Apis";

function EkycContractView({ camundaAPI }) {
  const [form] = Form.useForm();
  const [sampleData, setSampleData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [contracts, setContracts] = useState([]);

  const onFinish = async (values) => {
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
    const mockData = await fetchData(camundaAPI, JSON.stringify(data));

    if (mockData !== null) {
      setSampleData(mockData);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const arr = selectedRows.filter((val) => val["ProcessID"]);
      const ids = arr.map((x) => x["ID"]);
      for (let i = 0; i < ids.length; i++) {
        selectedRowKeys.splice(selectedRowKeys.indexOf(ids[i]));
        selectedRows.splice(selectedRows.indexOf((x) => x["ID"] === ids[i]));
        openNotification(`Hợp đồng ${ids[i]} đã được nhận trước đó`, "");
      }
      setContracts(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const claimApplications = async () => {
    setButtonDisable(true);
    await sleep(1000);
    try {
      for (let i = 0; i < contracts.length; i++) {
        if (!contracts[i]["ProcessID"]) {
          console.log(contracts[i]["FullName"]);
          const api = await fetch(
            `http://localhost:8080/engine-rest/process-definition/key/sample_process/start`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": camundaAPI.CSRFToken,
              },
              body: `{"variables":{"name":{"value":"${contracts[i]["FullName"]}","type":"string"}}}`,
              method: "POST",
            }
          );

          const result = await api.json();
          console.log(result);
          if (result["id"]) {
            const taskList = await getTaskList(camundaAPI, result["id"]);
            if (taskList) {
              const taskId = taskList[0]["id"];
              if (
                sampleData.find((sample) => sample["ID"] === contracts[i]["ID"])
              ) {
                console.log("Set task id value");
                sampleData.find((sample) => sample["ID"] === contracts[i]["ID"])[
                  "TaskID"
                ] = taskId;
              }
              const user = await getUser(camundaAPI);
              if (user !== null) {
                const claim = await claimApplication(
                  camundaAPI,
                  taskId,
                  `{"userId":"${user["userId"]}"}`
                );
                if (claim)
                  openNotification("Đã thực hiện tạo và nhận xử lý hồ sơ", "");
                else
                  openNotification(
                    "Nhận xử lý hồ sơ thất bại, vui lòng tự nhận hồ sơ sau",
                    ""
                  );
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    setButtonDisable(false);
    console.log(sampleData)
    console.log("Done");
  };

  return (
    <div className="container">
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        style={{ marginBottom: 50 }}
        initialValues={DefaultFormValue}
      >
        <Row gutter={24}>
          <Col xl={8} xs={24}>
            <Form.Item name="FromDate" label="Từ ngày">
              <DatePicker style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
          <Col xl={8} xs={24}>
            <Form.Item name="ToDate" label="Đến ngày">
              <DatePicker style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
          <Col xl={8} xs={24}>
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
          <Col xl={8} xs={24}>
            <Form.Item name="Status" label="Trạng thái">
              <Select defaultValue="" style={{ float: "right", width: 300 }}>
                {Object.entries(StatusList).map(([key, val]) => (
                  <Select.Option value={key}>{val}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xl={8} xs={24}>
            <Form.Item name="Score" label="Điểm định danh">
              <Select defaultValue="" style={{ float: "right", width: 300 }}>
                {Object.entries(IdentifyScore).map(([key, val]) => (
                  <Select.Option value={key}>{val}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xl={8} xs={24}>
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
          <Col xl={8} xs={24}>
            <Form.Item name="FullName" label="Tên khách hàng">
              <Input style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
          <Col xl={8} xs={24}>
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
          <Col xl={8} xs={24}>
            <Form.Item name="IDNo" label="CMND">
              <Input style={{ float: "right", width: 300 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={8} xs={24}>
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
          <Col xl={8} xs={24}>
            <Form.Item name="UserID" label="User xử lý">
              <Input style={{ float: "right", width: 300 }} value="hello" />
            </Form.Item>
          </Col>
          <Col xl={8} xs={24}>
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
          <Col span={24} className="button-container">
            <Button
              type="primary"
              htmlType="submit"
              className="button"
              disabled={buttonDisable}
            >
              TÌM KIẾM
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="button"
              onClick={claimApplications}
              disabled={buttonDisable}
            >
              NHẬN XLHS
            </Button>
            <Button
              type="primary"
              htmlType="button"
              className="button"
              disabled={buttonDisable}
            >
              HỒ SƠ CẦN XỬ LÝ
            </Button>
            <Button
              type="primary"
              htmlType="button"
              className="button"
              disabled={buttonDisable}
            >
              EXCEL
            </Button>
          </Col>
        </Row>
      </Form>
      {isSearch && (
        <Table
          rowKey="ID"
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
