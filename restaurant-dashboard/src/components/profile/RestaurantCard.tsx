import React, { useContext, useEffect, useState } from "react";
import {
	Card,
	Typography,
	Button,
	Modal,
	Form,
	Input,
	message,
	Skeleton,
	Col,
	Row,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANT_WITH_DETAIL } from "../../graphql/query";
import { AuthContext } from "../../context/AuthContext";
import CouponTable from "./CouponTable";

const RestaurantCard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { restaurantId } = useContext(AuthContext);
	const { data, loading } = useQuery(GET_RESTAURANT_WITH_DETAIL, {
		variables: { restaurantId: restaurantId },
	});

	if (loading) {
		return <Skeleton />;
	}

	const formatTime = (value: string) => {
		const date = new Date(data.restaurant.openingHour);
		return `${date.getHours()}`;
	};

	return (
		<div>
			<Card
				title={
					<div style={{ display: "flex", alignItems: "center" }}>
						<h1 style={{ marginRight: 20 }}>{data.restaurant.name}</h1>
						{data.restaurant.status === "OPEN" ? (
							<h2 style={{ color: "#0f0" }}>OPEN</h2>
						) : (
							<h2 style={{ color: "#f00" }}>CLOSED</h2>
						)}
					</div>
				}
				extra={
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						Edit
					</Button>
				}
				style={{ marginTop: 16 }}
			>
				<Row gutter={10}>
					<Col lg={6}>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Address:</p>
							<p style={{ fontWeight: "500" }}>{data.restaurant.address}</p>
						</div>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Phone:</p>
							<p style={{ fontWeight: "500" }}>{data.restaurant.phone}</p>
						</div>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Email:</p>
							<p style={{ fontWeight: "500" }}>{data.restaurant.email}</p>
						</div>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Restaurant Type:</p>
							<p style={{ fontWeight: "500" }}>
								{data.restaurant.restaurantType}
							</p>
						</div>
					</Col>
					<Col>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Description:</p>
							<p style={{ fontWeight: "500" }}>{data.restaurant.description}</p>
						</div>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Number of Menu:</p>
							<p style={{ fontWeight: "500" }}>
								{data.restaurant.foods.length}
							</p>
						</div>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Opening Hour:</p>
							<p style={{ fontWeight: "500" }}>
								{formatTime(data.restaurant.openingHour)} AM
							</p>
						</div>
						<div style={{ display: "flex", margin: 0 }}>
							<p style={{ marginRight: 4 }}>Closing Hour:</p>
							<p style={{ fontWeight: "500" }}>
								{formatTime(data.restaurant.closingHour)} PM
							</p>
						</div>
					</Col>
				</Row>

				<Row gutter={2} wrap>
					{data.restaurant.banner.map((url: string, idx: number) => {
						return (
							<Col lg={8} key={idx}>
								<img
									src={url}
									alt='Food'
									style={{ width: "300px", height: "300px", margin: 5 }}
								/>
							</Col>
						);
					})}
				</Row>
			</Card>
			<CouponTable data={data.restaurant.cupons} />
			<UpdateRestaurantModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</div>
	);
};

export default RestaurantCard;

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateRestaurantModal = ({ isModalOpen, setIsModalOpen }: IProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [form] = Form.useForm();

	const onFinish = async (values: any) => {
		try {
			setIsLoading(true);
		} catch (error: any) {
			message.error(error.message);
		} finally {
			setIsLoading(false);
			form.resetFields();
		}
	};

	return (
		<Modal
			title={
				<p
					style={{
						textAlign: "center",
						margin: 0,
						marginBottom: 30,
						padding: 0,
						justifyContent: "center",
					}}
				>
					Edit Detail
				</p>
			}
			open={isModalOpen}
			onCancel={() => {
				setIsModalOpen(false);
			}}
			footer={null}
		>
			<Form
				form={form}
				name='editDetailForm'
				// initialValues={{ restaurantName, restaurantAddress, restaurantPhone }}
				onFinish={onFinish}
			>
				<Form.Item
					name='restaurantName'
					label='Name'
					rules={[
						{ required: true, message: "Please enter the restaurant name" },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='restaurantAddress'
					label='Address'
					rules={[
						{
							required: true,
							message: "Please enter the restaurant address",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='restaurantPhone'
					label='Phone'
					rules={[
						{
							required: true,
							message: "Please enter the restaurant phone number",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Create Variable
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
