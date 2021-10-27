import React from "react";
import { Image, Button, Row, Col } from "antd";
import '../static/App.css'

function IdentityCard() {
  return (
    <Row align={"middle"}>
      <Col
        xl={8}
        xs={24}
        className={"center"}
      >
        <Image
          width={400}
          src="https://visakhoinguyen.com/wp-content/uploads/chung-minh-nhan-dan.jpg"
          className={"image"}
        />
      </Col>
      <Col
        xl={8}
        xs={24}
        className={"center"}
      >
        <Image
          width={400}
          src="https://visakhoinguyen.com/wp-content/uploads/chung-minh-nhan-dan.jpg"
          className={"image"}
        />
      </Col>
      <Col
        xl={8}
        xs={24}
        className={"center"}
      >
        <Button type="danger">SO SÁNH ẢNH</Button>
      </Col>
    </Row>
  );
}

export default IdentityCard;
