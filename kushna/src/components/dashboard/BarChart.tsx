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
	console.log(data);
	return (
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
		</BarChart>
	);
}
