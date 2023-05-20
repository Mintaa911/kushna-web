import React from "react";
import { Button, Card, Col, Row } from "antd";
import MenuItem, { IMenuItem } from "./MenuItem";

const temp: IMenuItem[] = [
  {
    key: "1",
    title: "Title 1",
    description: "Description 1",
    price: 10,
    image:
      "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?size=626&ext=jpg&ga=GA1.1.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
  {
    key: "2",
    title: "Title 2",
    description: "Description 2",
    price: 20,
    image:
      "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?size=626&ext=jpg&ga=GA1.1.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
  {
    key: "3",
    title: "Title 3",
    description: "Description 3",
    price: 30,
    image:
      "https://img.freepik.com/premium-photo/penne-pasta-tomato-sauce-with-meat-tomatoes-decorated-with-pea-sprouts-dark-table_2829-3412.jpg?size=626&ext=jpg&uid=R102896642&ga=GA1.1.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
  {
    key: "4",
    title: "Title 4",
    description: "Description 4",
    price: 40,
    image:
      "https://img.freepik.com/free-photo/big-sandwich-hamburger-with-juicy-beef-burger-cheese-tomato-red-onion-wooden-table_2829-19631.jpg?size=626&ext=jpg&uid=R102896642&ga=GA1.1.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
  {
    key: "5",
    title: "Title 5",
    description: "Description 5",
    price: 50,
    image:
      "https://img.freepik.com/free-photo/roast-chicken-liver-with-vegetables_2829-8325.jpg?size=626&ext=jpg&uid=R102896642&ga=GA1.2.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
  {
    key: "6",
    title: "Title 6",
    description: "Description 6",
    price: 60,
    image:
      "https://img.freepik.com/premium-photo/juicy-american-burger-hamburger-cheeseburger-with-two-beef-patties-with-sauce-basked-black-space_124865-5964.jpg?size=626&ext=jpg&uid=R102896642&ga=GA1.2.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
  {
    key: "7",
    title: "Title 7",
    description: "Description 7",
    price: 70,
    image:
      "https://img.freepik.com/free-photo/front-view-sweet-pancakes-tower-arrangement_23-2148654085.jpg?size=626&ext=jpg&uid=R102896642&ga=GA1.2.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
  {
    key: "8",
    title: "Title 8",
    description: "Description 8",
    price: 80,
    image:
      "https://img.freepik.com/free-photo/top-view-cheese-pizza_23-2147611627.jpg?size=626&ext=jpg&uid=R102896642&ga=GA1.2.1056547104.1684144578&semt=sph",
    time: "10 mins",
    rating: 4.5,
  },
];

const MenuContainer = () => (
  <div>
    <Row>
      <Col>
        <h1>Menu Container</h1>
      </Col>
      <Col style={{ marginLeft: "auto" }}>
        <p>
          <Button>Add Menu</Button>
        </p>
      </Col>
      <Col span={24}>
        <p style={{ color: "gray" }}>10 Options</p>
      </Col>
    </Row>
    <Row gutter={12}>
      {temp.map((item, _) => {
        return (
          <Col xs={24} sm={24} md={24} lg={12} xl={6} key={item.key}>
            <MenuItem {...item} />
          </Col>
        );
      })}
    </Row>
  </div>
);

export default MenuContainer;
