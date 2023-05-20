import React, { useState, useEffect } from "react";
import { Button, Col, Row, Form, message, Modal, Input } from "antd";
import MenuItem from "./MenuItem";
import { useQuery, useMutation } from "@apollo/client";
import { GET_Foods } from "../../graphql/query";
import { Foods } from "../../graphql/types";
import { CREATE_FOOD } from "../../graphql/mutation";
import { RcFile } from "antd/es/upload";
import BannerUpload from "./BannerUpload";
import { uploadRestaurantBanner } from "../../utils/image";

export default function MenuContainer() {
	const { loading, data } = useQuery(GET_Foods);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	if (loading) {
		return <p>loading...</p>;
	}

	return (
		<div>
			<Row>
				<Col>
					<h1>Menu Container</h1>
				</Col>
				<Col style={{ marginLeft: "auto" }}>
					<p>
						<Button onClick={showModal}>Add Menu</Button>
					</p>
				</Col>
			</Row>
			<Row gutter={2} wrap>
				{data.foods.map((item: Foods) => {
					return (
						<Col lg={6} key={item.id}>
							<MenuItem {...item} />
						</Col>
					);
				})}
			</Row>
			<CreateRestaurantModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</div>
	);
}

interface IProps {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function CreateRestaurantModal({ isModalOpen, setIsModalOpen }: IProps) {
	const [fileList, setFileList] = useState(Array<RcFile>());
	const [isLoading, setIsLoading] = useState(false);

	const [createRestaurant] = useMutation(CREATE_FOOD);

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const onFinish = async (values: any) => {
		console.log(values);

		// try {
		// 	setIsLoading(true);
		// 	if (fileList.length === 0) {
		// 		message.error(`Add one or more images to upload.`);
		// 		return;
		// 	}
		// 	const bannerURLs = await uploadRestaurantBanner(fileList);

		// 	if (bannerURLs.length === 0) {
		// 		message.error(`There was a problem while uploading images.`);
		// 		return;
		// 	}

		// 	const { data } = await createRestaurant({
		// 		variables: {
		// 			input: {
		// 				...values,
		// 				openingHour: values.openingHour.toISOString(),
		// 				closingHour: values.closingHour.toISOString(),
		// 				banner: bannerURLs,
		// 			},
		// 		},
		// 	});

		// 	if (data) {
		// 		console.log(
		// 			"Uploaded image to storage and created a restaurant record on DB"
		// 		);
		// 		console.log(data);
		// 	}

		// 	// clear file list
		// 	// setFileList([]);
		// } catch (error) {
		// 	console.log(error);
		// 	console.log("Do something about it");
		// } finally {
		// 	setIsLoading(false);
		// }
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
					label='Price'
					name='price'
					rules={[{ required: true, message: "Please input food price!" }]}
					style={{ marginBottom: 10 }}
				>
					<Input type={"number"} placeholder='price' />
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
