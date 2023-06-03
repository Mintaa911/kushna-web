import React from "react";
import { Card, Col, message, Row } from "antd";
import { Foods } from "../../graphql/types";
import { DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_FOOD } from "../../graphql/mutation";
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
	const [deleteFood] = useMutation(DELETE_FOOD);

	const handleDeleteFood = (id: number) => {
		deleteFood({ variables: { deleteFoodId: id } })
			.then((data) => {
				console.log(data);
				message.success("Food successfully deleted!");
				// navigate(0);
			})
			.catch((error: any) => {
				console.log(error.message);
				message.error(error.message);
			});
	};
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
				<Meta
					title={
						<Row style={{ display: "flex", justifyContent: "space-between" }}>
							<Col>{item.name}</Col>
							<Col style={{ fontWeight: 700, fontSize: "1.1rem" }}>
								${item.price}
							</Col>
						</Row>
					}
				/>
				<Row
					style={{
						width: "full",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Col span={8}>
						<div
							style={{
								width: "90%",
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
					<Col span={8} style={{ justifyItems: "center" }}></Col>
				</Row>
				<Row
					style={{
						width: "full",
						display: "flex",
						justifyContent: "end",
					}}
				>
					<EditOutlined style={{ marginRight: 15 }} onClick={() => {}} />
					<DeleteOutlined
						onClick={(e) => {
							e.stopPropagation();
							handleDeleteFood(item.id);
						}}
					/>
				</Row>
			</Card>
		</div>
	);
};

export default MenuItem;
