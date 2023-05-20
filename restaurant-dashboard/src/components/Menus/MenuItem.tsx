import React from "react";
import { Card, Col, Row } from "antd";
import { Foods } from "../../graphql/types";
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

const MenuItem = (item: Foods) => {
	return (
		<Card
			hoverable
			style={{ width: "fit-content", marginBottom: "20px" }}
			cover={
				<img
					alt='example'
					src={item.images[0]}
					style={{
						width: "250px",
						height: "150px",
						objectFit: "cover",
					}}
				/>
			}
		>
			<Meta title={item.name} />
			<Row gutter={0}>
				<Col span={8} style={{ color: "gray" }}>
					${item.price}
				</Col>
				{/* <Col span={8} style={{ color: "gray" }}>
					{time}
				</Col> */}
				{/* <Col span={8} style={{ color: "white", justifyItems: "center" }}>
					<div
						style={{
							backgroundColor: "orange",
							width: "90%",
							borderRadius: "5px",
							padding: "2px 4px",
						}}
					>
						<StarOutlined />
						&nbsp; &nbsp;
						{item.rating}
					</div>
				</Col> */}
			</Row>
		</Card>
	);
};

export default MenuItem;
