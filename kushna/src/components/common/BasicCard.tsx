import { Card, Row, Col } from "antd";

type AppProps = {
	stat: number;
	label: string;
	icon: React.ReactNode;
};

export default function BasicCard({ stat, label, icon }: AppProps) {
	return (
		<Card style={{ padding: 15 }} bodyStyle={{ padding: "0" }}>
			<Row justify={"space-between"}>
				<Col span={16} style={{ justifyContent: "center" }}>
					<p
						style={{
							padding: 0,
							margin: 0,
							marginBottom: 1,
							fontWeight: "bold",
							fontSize: 20,
							// textAlign: "center",
						}}
					>
						{stat}
					</p>
					<p
						style={{
							padding: 0,
							margin: 0,
							marginTop: 1,
							// textAlign: "center",
						}}
					>
						{label}
					</p>
				</Col>
				<Col
					span={8}
					style={{
						margin: "auto",
						alignSelf: "center",
						display: "flex",
						justifyContent: "flex-end",
						paddingRight: 5,
					}}
				>
					{icon}
				</Col>
			</Row>
		</Card>
	);
}
