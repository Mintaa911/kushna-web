import React, { useState } from "react";

import dayjs from "dayjs";
import { RcFile } from "antd/es/upload";
import { useMutation } from "@apollo/client";
import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Modal,
	Form,
	Input,
	Select,
	TimePicker,
	message,
} from "antd";

import { uploadRestaurantBanner } from "../../utils/image";
import { CREATE_RESTAURANT } from "../../graphql/mutation";
import BannerUpload from "../../components/restuarant/BannerUpload";
import RestaurantTable from "../../components/restuarant/RestaurantTable";

const format = "HH:mm";

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

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateRestaurantModal({ isModalOpen, setIsModalOpen }: IProps) {
	const [fileList, setFileList] = useState(Array<RcFile>());
	const [isLoading, setIsLoading] = useState(false);
	const [form] = Form.useForm();
	const [createRestaurant] = useMutation(CREATE_RESTAURANT);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const onFinish = async (values: any) => {
		try {
			setIsLoading(true);
			if (fileList.length === 0) {
				message.error(`Add one or more images to upload.`);
				return;
			}
			const bannerURLs = await uploadRestaurantBanner(fileList);

			if (bannerURLs.length === 0) {
				message.error(`There was a problem while uploading images.`);
				return;
			}

			const { data } = await createRestaurant({
				variables: {
					input: {
						...values,
						openingHour: values.openingHour.toISOString(),
						closingHour: values.closingHour.toISOString(),
						banner: bannerURLs,
					},
				},
			});

			if (data) {
				message.success(
					"Uploaded image to storage and created a restaurant record on DB"
				);
				form.resetFields();
			}

			// clear file list
			// setFileList([]);
		} catch (error) {
			console.log(error);
			console.log("Do something about it");
		} finally {
			setIsLoading(false);
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
					Create Restaurant
				</p>
			}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={null}
		>
			<BannerUpload setFileList={setFileList} />

			<Form
				form={form}
				name='basic'
				layout='vertical'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Name'
					name='name'
					rules={[{ required: true, message: "Please input restaurant name!" }]}
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
						<TimePicker defaultValue={dayjs("00:00", format)} format={format} />
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
						<TimePicker defaultValue={dayjs("00:00", format)} format={format} />
					</Form.Item>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<Form.Item
						label='Restaurant Type'
						name='restaurantType'
						rules={[
							{ required: true, message: "Please input restaurant type!" },
						]}
						style={{ marginBottom: 20 }}
					>
						<Select
							onChange={() => {}}
							options={[
								{ value: "HOTEL", label: "Hotel" },
								{ value: "HOME", label: "Home" },
							]}
						/>
					</Form.Item>
				</div>

				<Form.Item style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Create Restaurant
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
