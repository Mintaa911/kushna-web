import { Button, Card, Form, Input, Layout, message, Typography } from "antd";
import { LOGIN_USER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
const { Content } = Layout;

export default function Login() {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [loginUser, { error }] = useMutation(LOGIN_USER);
	const { token, setToken, setUserId } = useContext(AuthContext);

	useEffect(() => {
		if (token && Object.keys(token).length !== 0) {
			navigate("/");
		}
	}, [token]);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			const { data } = await loginUser({ variables: { input: values } });
			if (data.login) {
				setToken(data.login.token);
				setUserId(data.login.id);
				navigate("/");
			}
		} catch (error: any) {
			message.error(error.message);
		}

		form.resetFields();

		setLoading(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Content
			style={{
				height: "100vh",
				margin: 0,
				padding: 0,
				marginTop: "10%",
				display: "flex",
				// alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Card
				style={{
					background: "#ddd",
					width: "40%",
					height: "fit-content",
				}}
				bodyStyle={{ padding: 0 }}
			>
				<Typography.Title
					level={3}
					style={{ textAlign: "center", marginBottom: 10 }}
				>
					Login
				</Typography.Title>
				<Form
					form={form}
					name='basic'
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
					style={{ width: "60%", margin: "auto" }}
				>
					<Form.Item
						name='email'
						rules={[
							{
								type: "email",
								required: true,
								message: "Please input your email!",
							},
						]}
					>
						<Input type={"email"} placeholder='example@gmail.com' />
					</Form.Item>
					<Form.Item
						name='password'
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password placeholder='password' />
					</Form.Item>
					<Form.Item
					// style={{ width: "100%", display: "flex", justifyContent: "center" }}
					>
						<Button loading={loading} block type='primary' htmlType='submit'>
							Sign in
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</Content>
	);
}
