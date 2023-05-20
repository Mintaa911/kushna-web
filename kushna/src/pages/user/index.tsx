import { Button, Card, Form, Input, Modal, Select } from "antd";
import UserTable from "../../components/user/UserTable";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Create_User } from "../../graphql/mutation";

const User = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [createUser, { loading, data }] = useMutation(Create_User);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onFinish = (values: any) => {
		createUser({ variables: { input: values } });
	};
	useEffect(() => {
		if (data) {
			console.log("successfully created User!");
		}
	}, [data]);

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			<div
				style={{
					marginBottom: 10,
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<h1 style={{ margin: 0 }}>User</h1>
				<Button onClick={showModal} icon={<PlusOutlined />}>
					Create User
				</Button>
			</div>
			<Card>
				<UserTable />
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
						Create User
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
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<Form.Item
							label='First Name'
							name='firstName'
							rules={[{ required: true, message: "Please input First Name!" }]}
							style={{ marginBottom: 10 }}
						>
							<Input placeholder='first name' />
						</Form.Item>
						<Form.Item
							label='Last Name'
							name='lastName'
							rules={[{ required: true, message: "Please input Last Name!" }]}
							style={{ marginBottom: 10 }}
						>
							<Input placeholder='last name' />
						</Form.Item>
					</div>

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
						label='Password'
						name='password'
						rules={[{ required: true, message: "Please input password!" }]}
						style={{ marginBottom: 10 }}
					>
						<Input.Password placeholder='password' />
					</Form.Item>
					<Form.Item
						label='User Type'
						name='role'
						rules={[{ required: true, message: "Please input user type!" }]}
						style={{ marginBottom: 20 }}
					>
						<Select
							defaultValue='RestaurantManager'
							onChange={() => {}}
							options={[
								{ value: "RestaurantManager", label: "Restaurant Manager" },
								{ value: "DeliveryPerson", label: "Delivery Person" },
							]}
						/>
					</Form.Item>
					<Form.Item style={{ display: "flex", justifyContent: "center" }}>
						<Button loading={loading} type='primary' htmlType='submit'>
							Create User
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default User;
