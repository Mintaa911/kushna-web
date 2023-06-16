import React, { useState } from "react";
import {
	Card,
	Col,
	message,
	Row,
	Popconfirm,
	Modal,
	Form,
	Input,
	Button,
} from "antd";
import { Foods } from "../../graphql/types";
import { DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_FOOD, UPDATED_FOOD } from "../../graphql/mutation";
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [deleteFood] = useMutation(DELETE_FOOD);

	const averageRating =
		item.reviews.length > 0
			? item.reviews
					.map((review: any) => review?.rating)
					.reduce((prev: number, next: number) => prev + next)
			: 0;

	const handleDeleteFood = (id: number) => {
		deleteFood({ variables: { deleteFoodId: id } })
			.then((data) => {
				console.log(data);
				message.success("Food successfully deleted!");
				navigate(0);
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
							{averageRating.toFixed(1) > 0
								? (averageRating.toFixed(1) / item.reviews.length).toFixed(1)
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
					<EditOutlined
						style={{ marginRight: 15 }}
						onClick={(e) => {
							e.stopPropagation();
							setIsModalOpen(true);
						}}
					/>
					<Popconfirm
						title='Delete the task'
						description='Are you sure to delete this food?'
						onConfirm={(e?: React.MouseEvent<HTMLElement>) => {
							e?.stopPropagation();
							handleDeleteFood(item.id);
						}}
						onCancel={(e?: React.MouseEvent<HTMLElement>) => {
							e?.stopPropagation();
						}}
						okText='Yes'
						cancelText='No'
					>
						<DeleteOutlined
							style={{ color: "red" }}
							onClick={(e) => {
								e.stopPropagation();
							}}
						/>
					</Popconfirm>
				</Row>
			</Card>
			<EditMenuModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				price={item.price}
				description={item.description}
				foodId={item.id}
			/>
		</div>
	);
};

export default MenuItem;

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	price: number;
	description: string;
	foodId: number;
}

const EditMenuModal = ({
	isModalOpen,
	setIsModalOpen,
	price,
	description,
	foodId,
}: IProps) => {
	const [form] = Form.useForm();
	const [updateFood] = useMutation(UPDATED_FOOD);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinish = async (input: any) => {
		setIsLoading(true);
		try {
			const { data } = await updateFood({
				variables: {
					foodId: foodId,
					input: {
						description: input.description,
						price: parseInt(input.price),
					},
				},
			});

			if (data.updateFood) {
				message.success("Food menu successfully updated");
				setTimeout(() => {
					navigate(0);
				}, 800);
			}
		} catch (error: any) {
			message.error(error.message);
		}

		setIsLoading(false);
	};
	const onFinishFailed = () => {};

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
				form={form}
				initialValues={{ description: description, price: price }}
				layout='vertical'
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label='Description'
					name={"description"}
					rules={[
						{ required: true, message: "Please input food description!" },
					]}
					style={{ marginBottom: 10 }}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label='Price'
					name={"price"}
					rules={[{ required: true, message: "Please input food price!" }]}
					style={{ marginBottom: 10 }}
				>
					<Input />
				</Form.Item>
				<Form.Item style={{ display: "flex", justifyContent: "center" }}>
					<Button loading={isLoading} type='primary' htmlType='submit'>
						Update Food
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
