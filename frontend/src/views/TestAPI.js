import React from "react";
import { Input, Button, Form, Col, Row } from "antd";

function TestAPI({ camundaAPI }) {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = async ({ values }) => {
    try {
      const api = await fetch(values["url"], {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": camundaAPI.CSRFToken,
        },
        body: values["request"],
      });
      const res = await api.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="url" label="URL">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item name="request" label="Request">
            <TextArea rows={5} maxLength={1000} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button type="danger" style={{ margin: "10px 10px" }}>
            SEND
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TestAPI;
