import React from "react";
import { Card, Col, Row } from "antd";
import { StarOutlined } from "@ant-design/icons";
const { Meta } = Card;

export interface IMenuItem {
  key: string;
  title: string;
  description: string;
  price: number;
  image: string;
  time: string;
  rating: number;
}

const MenuItem = (item: IMenuItem) => {
  const { title, description, price, image, time, rating } = item;
  return (
    <Card
      hoverable
      style={{ width: "fit-content", marginBottom: "20px" }}
      cover={
        <img
          alt="example"
          src={image}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
          }}
        />
      }
    >
      <Meta title={title} />
      <Row gutter={6}>
        <Col span={8} style={{ color: "gray" }}>
          ${price}
        </Col>
        <Col span={8} style={{ color: "gray" }}>
          {time}
        </Col>
        <Col span={8} style={{ color: "white", justifyItems: "center" }}>
          <div style={{ backgroundColor: "orange", width: "50%", borderRadius: "5px", padding: "2px 4px" }}>
            <StarOutlined />
            &nbsp; &nbsp;
            {rating}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MenuItem;
