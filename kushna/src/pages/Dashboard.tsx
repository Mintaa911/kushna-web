import { Row, Col, Card } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import BasicCard from "../components/common/BasicCard";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	BarChart,
	Legend,
	Tooltip,
	Bar,
	PieChart,
	Pie,
} from "recharts";
const data = [
	{ name: "Monday", uv: 400, pv: 2400, amt: 2400 },
	{ name: "Tuesday", uv: 200, pv: 2000, amt: 2000 },
	{ name: "Wednesday", uv: 300, pv: 2300, amt: 2300 },
	{ name: "Thursday", uv: 400, pv: 2400, amt: 2400 },
	{ name: "Friday", uv: 200, pv: 2000, amt: 2000 },
	{ name: "Saturday", uv: 300, pv: 2300, amt: 2300 },
	{ name: "Sunday", uv: 300, pv: 2300, amt: 2300 },
];
const data01 = [
	{
		name: "Group A",
		value: 400,
	},
	{
		name: "Group B",
		value: 300,
	},
	{
		name: "Group C",
		value: 300,
	},
	{
		name: "Group D",
		value: 200,
	},
	{
		name: "Group E",
		value: 278,
	},
	{
		name: "Group F",
		value: 189,
	},
];
const Dashboard = () => {
	return (
		<div style={{ paddingLeft: 20, paddingRight: 20 }}>
			<h1>Dashboard</h1>
			<Row gutter={32} style={{}}>
				<Col span={6}>
					<BasicCard
						stat={1020}
						label={"Orders"}
						icon={<BarChartOutlined style={{ fontSize: "48px" }} />}
					/>
				</Col>
				<Col span={6}>
					<BasicCard
						stat={30}
						label={"Restaurants"}
						icon={<BarChartOutlined style={{ fontSize: "48px" }} />}
					/>
				</Col>
				<Col span={6}>
					<BasicCard
						stat={320}
						label={"Customers"}
						icon={<BarChartOutlined style={{ fontSize: "48px" }} />}
					/>
				</Col>
				<Col span={6}>
					<BasicCard
						stat={20}
						label={"Delivery Person"}
						icon={<BarChartOutlined style={{ fontSize: "48px" }} />}
					/>
				</Col>
			</Row>
			<Row gutter={20} style={{ marginTop: 20 }}>
				<Col span={12}>
					<Card style={{ paddingLeft: 20 }} bodyStyle={{ padding: "0" }}>
						<h1>Order From Head Quarter</h1>
						<PieChart width={520} height={200}>
							<Pie
								data={data01}
								dataKey='value'
								nameKey='name'
								cx='50%'
								cy='50%'
								outerRadius={80}
								fill='#8884d8'
								label
							/>
						</PieChart>
					</Card>
				</Col>
				<Col span={12}>
					<Card style={{ paddingLeft: 20 }} bodyStyle={{ padding: "0" }}>
						<h1>Order from Hotel</h1>
						<BarChart
							width={500}
							height={200}
							data={data}
							margin={{ top: 20, right: 20, left: 5, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey='pv' fill='#8884d8' />
							<Bar dataKey='uv' fill='#82ca9d' />
						</BarChart>
					</Card>
				</Col>
			</Row>
			<Card
				bodyStyle={{ padding: "0" }}
				style={{
					marginTop: 20,
					paddingLeft: 20,
				}}
			>
				<h1>Order Distribution Over the Week</h1>
				<LineChart
					width={1000}
					height={250}
					data={data}
					margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
				>
					<Line type='monotone' dataKey='uv' stroke='#8884d8' />
					<CartesianGrid stroke='#ccc' />
					<XAxis dataKey='name' />
					<YAxis dataKey='uv' />
				</LineChart>
			</Card>
		</div>
	);
};

export default Dashboard;
