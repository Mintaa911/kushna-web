import React, { useState } from "react";
import { Button, Card, Modal, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RestaurantTable from "../../components/restuarant/RestaurantTable";

const Restaurant = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onFinish = (values: any) => {
		setLoading(true);
		console.log("Success:", values);
		setTimeout(() => {}, 1000);
		setLoading(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
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
						Create Restaurant
					</p>
				}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					name='basic'
					layout='vertical'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Form.Item
						label='Name'
						name='name'
						rules={[
							{ required: true, message: "Please input restaurant name!" },
						]}
						style={{ marginBottom: 10 }}
					>
						<Input placeholder='restaurant name' />
					</Form.Item>
					<Form.Item
						label='Description'
						name='description'
						rules={[
							{
								required: true,
								message: "Please input restaurant description",
							},
						]}
						style={{ marginBottom: 10 }}
					>
						<Input placeholder='description' />
					</Form.Item>
					<Form.Item
						label='Address'
						name='address'
						rules={[
							{ required: true, message: "Please input restaurant address!" },
						]}
						style={{ marginBottom: 10 }}
					>
						<Input placeholder='address' />
					</Form.Item>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Form.Item
							label='Email'
							name='email'
							rules={[
								{
									type: "email",
									required: true,
									message: "Please input restaurant email!",
								},
							]}
							style={{ marginBottom: 10 }}
						>
							<Input placeholder='email' />
						</Form.Item>
						<Form.Item
							label='Phone Number'
							name='phone'
							rules={[
								{ required: true, message: "Please input your phone number!" },
							]}
							style={{ marginBottom: 10 }}
						>
							<Input placeholder='+251911223344' />
						</Form.Item>
					</div>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Form.Item
							label='Opening Hour'
							name='openingHour'
							rules={[
								{
									required: true,
									message: "Please input restaurant opening hour",
								},
							]}
							style={{ marginBottom: 10 }}
						>
							<Input placeholder='08:00AM' />
						</Form.Item>
						<Form.Item
							label='Closing Hour'
							name='closingHour'
							rules={[
								{
									required: true,

									message: "Please input restaurant closing hour!",
								},
							]}
							style={{ marginBottom: 10 }}
						>
							<Input placeholder='09:00PM' />
						</Form.Item>
					</div>

					<Form.Item
						label='Restaurant Type'
						name='restaurantType'
						rules={[
							{ required: true, message: "Please input restaurant type!" },
						]}
						style={{ marginBottom: 20 }}
					>
						<Select
							defaultValue='HOTEL'
							onChange={() => {}}
							options={[
								{ value: "HOTEL", label: "Hotel" },
								{ value: "HOME", label: "Home" },
							]}
						/>
					</Form.Item>

					<Form.Item style={{ display: "flex", justifyContent: "center" }}>
						<Button loading={loading} type='primary' htmlType='submit'>
							Create Restaurant
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Restaurant;
