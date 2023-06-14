import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

import RestaurantTable from "../../components/restuarant/RestaurantTable";
import CreateRestaurantModal from "../../components/restuarant/RestaurantModal";

const Restaurant = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	return (
		<div>
			<div
				style={{
					marginBottom: 10,
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<h1 style={{ margin: 0 }}>Restaurant</h1>
				<Button onClick={showModal} icon={<PlusOutlined />}>
					Create Restaurant
				</Button>
			</div>
			<Card style={{}}>
				<RestaurantTable />
			</Card>
			<CreateRestaurantModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</div>
	);
};

export default Restaurant;
