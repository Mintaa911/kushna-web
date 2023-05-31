import React, { useContext, useState } from "react";
import {
	Button,
	Col,
	Row,
	Form,
	message,
	Modal,
	Input,
	Skeleton,
	Select,
} from "antd";
import MenuItem from "./MenuItem";
import { useQuery, useMutation } from "@apollo/client";
import { GET_Foods_From_Restaurant } from "../../graphql/query";
import { Foods } from "../../graphql/types";
import { CREATE_COUPON, CREATE_FOOD } from "../../graphql/mutation";
import { RcFile } from "antd/es/upload";
import BannerUpload from "./BannerUpload";
import { uploadRestaurantBanner } from "../../utils/image";
import { AuthContext } from "../../context/AuthContext";
import { PlusOutlined } from "@ant-design/icons";
import ErrorPage from "../common/Error";

export default function MenuContainer() {
	const { restaurantId } = useContext(AuthContext);
	const { loading, data, error } = useQuery(GET_Foods_From_Restaurant, {
		variables: { restaurantId: restaurantId },
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [variableModalOpen, setVariableModalOpen] = useState(false);
	const [couponModalOpen, setCouponModalOpen] = useState(false);

	if (loading) {
		return <Skeleton active />;
	}
	if (error) {
		<ErrorPage />;
	}

	return (
		<div>
			<Row>
				<Col>
					<h1>Menu</h1>
				</Col>
				<Col style={{ marginLeft: "auto", gap: 4 }}>
					<Button
						style={{
							marginRight: 10,
							backgroundColor: "#D2042D",
							color: "white",
						}}
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						<PlusOutlined style={{ marginRight: "5px" }} />
						<span>Add Menu</span>
					</Button>
					<Button
						style={{
							marginRight: 10,
							backgroundColor: "#008000",
							color: "white",
						}}
						onClick={() => {
							setVariableModalOpen(true);
						}}
					>
						<PlusOutlined style={{ marginRight: "5px" }} />
						<span>Add Variable</span>
					</Button>
					<Button
						style={{
							marginRight: 10,
							backgroundColor: "#FFBF00",
							color: "white",
						}}
						onClick={() => {
							setCouponModalOpen(true);
						}}
					>
						<PlusOutlined style={{ marginRight: "5px" }} />
						<span>Add Coupon</span>
					</Button>
				</Col>
			</Row>
			<Row gutter={2} wrap>
				{data
					? data.foodFromRestaurant.map((item: Foods) => {
							return (
								<Col lg={6} key={item.id}>
									<MenuItem {...item} />
								</Col>
							);
					  })
					: "No Result"}
			</Row>
			<CreateFoodModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			<CreateVariableModal
				isModalOpen={variableModalOpen}
				setIsModalOpen={setVariableModalOpen}
				foods={
					data
						? data.foodFromRestaurant.map((food: Foods) => {
								return { value: food?.id, label: food?.name };
						  })
						: []
				}
			/>
			<CreateCouponModal
				isModalOpen={couponModalOpen}
				setIsModalOpen={setCouponModalOpen}
			/>
		</div>
	);
}

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	foods?: [];
}
function CreateFoodModal({ isModalOpen, setIsModalOpen }: IProps) {
	const [fileList, setFileList] = useState(Array<RcFile>());
	const [isLoading, setIsLoading] = useState(false);
	const { restaurantId } = useContext(AuthContext);
	const [form] = Form.useForm();
	const [createMenu] = useMutation(CREATE_FOOD);

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
			const imageURLs = await uploadRestaurantBanner(fileList);

			if (imageURLs.length === 0) {
				message.error(`There was a problem while uploading images.`);
				return;
			}

			const { data } = await createMenu({
				variables: {
					input: {
						...values,
						price: parseFloat(values.price),
						restaurantId: restaurantId,
						images: imageURLs,
						status: "AVAILABLE",
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
			setFileList([]);
		} catch (error: any) {
			message.error(error.message);
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
					Create Food
				</p>
			}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={null}
		>
			<BannerUpload setFileList={setFileList} />

			<Form
				form={form}
				name='menu'
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
					label='Price'
					name='price'
					rules={[{ required: true, message: "Please input food price!" }]}
					style={{ marginBottom: 10 }}
				>
					<Input type='number' placeholder='price' />
				</Form.Item>
				<Form.Item style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Create Food
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}

function CreateVariableModal({ isModalOpen, setIsModalOpen, foods }: IProps) {
	const [isLoading, setIsLoading] = useState(false);

	const [createVariable] = useMutation(CREATE_FOOD);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const onFinish = async (values: any) => {
		console.log(values);

		try {
			setIsLoading(true);

			// await createVariable({
			// 	variables: {
			// 		input: {
			// 			...values,
			// 		},
			// 	},
			// });

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
					Create Variable
				</p>
			}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={null}
		>
			<Form
				name='variable'
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
					label='Price'
					name='price'
					rules={[{ required: true, message: "Please input food price!" }]}
					style={{ marginBottom: 10 }}
				>
					<Input type='number' placeholder='price' />
				</Form.Item>
				<Form.Item
					label='Food'
					name='food'
					rules={[{ required: true, message: "Please input user type!" }]}
					style={{ marginBottom: 20 }}
				>
					<Select options={foods} />
				</Form.Item>
				<Form.Item style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Create Variable
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}

function CreateCouponModal({ isModalOpen, setIsModalOpen, foods }: IProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { restaurantId } = useContext(AuthContext);
	const [createCoupon] = useMutation(CREATE_COUPON);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const onFinish = async (values: any) => {
		try {
			setIsLoading(true);
			const { data } = await createCoupon({
				variables: {
					input: {
						code: values.code,
						discount: parseFloat(values.discount),
						restaurantId: restaurantId,
					},
				},
			});
			if (data) {
				message.success("Successfully created a coupon");
			} else {
				message.error("Coupon not created");
			}
		} catch (error) {
			message.error("Error! Couldn't create coupon");
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
					Create Coupon
				</p>
			}
			open={isModalOpen}
			onCancel={handleCancel}
			footer={null}
		>
			<Form
				name='coupon'
				layout='vertical'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Code'
					name='code'
					rules={[{ required: true, message: "Please input coupon code!" }]}
					style={{ marginBottom: 10 }}
				>
					<Input placeholder='coupon code' />
				</Form.Item>
				<Form.Item
					label='Discount'
					name='discount'
					rules={[
						{
							required: true,
							message: "Please input discount",
						},
					]}
					style={{ marginBottom: 10 }}
				>
					<Input type='number' placeholder='discount' />
				</Form.Item>
				<Form.Item style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Create Coupon
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
