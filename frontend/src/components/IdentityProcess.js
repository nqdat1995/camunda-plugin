import React, { useState } from "react";
import { Col, Row, Select, Form, Input, Button } from "antd";
import { taskComplete } from "../Apis";
import { openNotification } from "../Utils";

function IdentityProcess({ camundaAPI, taskId }) {
  const [defaultValue, setDefaultValue] = useState({
    status: "reject",
    reason: "1",
    comment: "",
  });
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = async (values) => {
    if (values["status"] === "approve") values["reason"] = "";
    console.log(values);

    console.log(taskId);
    const status = await taskComplete(
      camundaAPI,
      taskId,
      `{"variables":{"name":{"value":"Nguyễn Quốc Đạt"}},"withVariablesInReturn":true}`
    );

    if (status) openNotification("Xử lý thành công", "");
    else openNotification("Xử lý thất bại", "");
  };

  return (
    <div>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        style={{ marginBottom: 50 }}
        initialValues={defaultValue}
      >
        <Row gutter={24}>
          <Col span={8} xs={24} xl={8}>
            Điểm số: <b>90</b>
          </Col>
          <Col span={8} xs={24} xl={8}>
            <Form.Item name="status" label="Kết quả">
              <Select
                defaultValue="reject"
                style={{ float: "right", width: 300 }}
                onChange={(value) => {
                  console.log(value);
                }}
              >
                <Select.Option value="reject">Từ chối</Select.Option>
                <Select.Option value="approve">Đồng ý</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} xl={8}>
            <Form.Item name="reason" label="Lý do từ chối">
              <Select defaultValue="" style={{ float: "right", width: 300 }}>
                <Select.Option value="">Lý do từ chối...</Select.Option>
                <Select.Option value="1">
                  CMND/CCCD giả hoặc nghi ngờ giả
                </Select.Option>
                <Select.Option value="2">
                  CMND/CCCD không hợp lệ - chụp từ điện thoại
                </Select.Option>
                <Select.Option value="3">
                  CMND/CCCD không hợp lệ -- photo
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={{ span: 8, offset: 8 }} xs={{ span: 24 }}>
            <Form.Item name="comment" label="Ý kiến">
              <TextArea
                rows={4}
                maxLength={400}
                defaultValue="Nhờ duyệt dùm cái nha trời"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button type="danger" style={{ margin: "10px 10px" }}>
              QUAY VỀ
            </Button>
            <Button
              type="danger"
              htmlType="submit"
              style={{ margin: "10px 10px" }}
            >
              XỬ LÝ RỦI RO
            </Button>
            <Button type="danger" style={{ margin: "10px 10px" }}>
              BỎ NHẬN
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default IdentityProcess;
