import React from "react";
import { Card, Col, Row } from "antd";
import { Foods } from "../../graphql/types";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
	return (
		<div>
			<Card
				hoverable
				onClick={() => {
					navigate("/food-detail", { state: item });
				}}
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
					<Col span={8} style={{ color: "gray" }}>
						{/* {time} */}
					</Col>
					<Col span={8} style={{ color: "white", justifyItems: "center" }}>
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
							{item.reviews.length > 0
								? item.reviews
										.map((review) => review?.rating)
										.reduce((prev, next) => prev + next)
								: 0}
						</div>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default MenuItem;
