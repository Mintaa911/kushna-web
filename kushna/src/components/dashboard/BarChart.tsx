import {
	CartesianGrid,
	XAxis,
	YAxis,
	BarChart,
	Legend,
	Tooltip,
	Bar,
} from "recharts";

export default function OrderBarChart({ data }: { data: any }) {
	return (
		<BarChart
			width={520}
			height={200}
			data={data}
			margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey='pv' fill='#8884d8' />
			<Bar dataKey='uv' fill='#2224d8' />
		</BarChart>
	);
}
