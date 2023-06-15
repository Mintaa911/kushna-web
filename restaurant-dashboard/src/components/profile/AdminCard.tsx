import React, { useContext, useEffect, useState } from "react";

import {
	Card,
	Avatar,
	Typography,
	Button,
	Modal,
	Form,
	Input,
	message,
	Skeleton,
} from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { GET_MANAGER } from "../../graphql/query";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@apollo/client";

const { Title, Text } = Typography;

const AdminCard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { userId } = useContext(AuthContext);
	const { data, loading } = useQuery(GET_MANAGER, {
		variables: { managerId: userId },
	});

	if (loading) {
		return <Skeleton />;
	}

	return (
		<div>
			<Card
				title='Restaurant Admin Profile'
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
			>
				<div
					style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
				>
					<Avatar size={64} icon={<UserOutlined />} />
					<Title style={{ margin: "0 16px" }} level={3}>
						{`${data.manager.user.firstName} ${data.manager.user.lastName}`}
					</Title>
				</div>
				<Text strong>Email:</Text> {data.manager.user.email}
			</Card>
			<UpdateProfileModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</div>
	);
};

export default AdminCard;

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProfileModal = ({ isModalOpen, setIsModalOpen }: IProps) => {
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
			title='Edit Profile'
			open={isModalOpen}
			onCancel={() => {
				setIsModalOpen(false);
			}}
			footer={null}
		>
			<Form
				form={form}
				name='editProfileForm'
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
				<Form.Item style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Save
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
