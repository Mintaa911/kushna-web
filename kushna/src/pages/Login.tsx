import { Button, Card, Form, Input, Layout, Typography } from "antd";

const { Content } = Layout;

export default function Login() {
	const onFinish = (values: any) => {
		alert(`${JSON.stringify(values)}`);
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
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Card
				style={{
					background: "#EEEEEE",
					width: "40%",
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
						<Button
							// loading={loading}
							block
							type='primary'
							htmlType='submit'
						>
							Sign in
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</Content>
	);
}
