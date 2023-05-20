import { LineChart,Line,CartesianGrid,XAxis,YAxis } from "recharts";

export default function OrderPieChart({ data }: { data: any }) {
	console.log(data);
	return (
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
	);
}
