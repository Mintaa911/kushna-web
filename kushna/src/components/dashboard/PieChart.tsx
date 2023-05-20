import {

  Pie,
  PieChart,
} from "recharts";

export default function OrderPieChart({ data }: { data: any }) {
	console.log(data);
	return (
		<PieChart width={520} height={200}>
			<Pie
				data={data}
				dataKey='value'
				nameKey='name'
				cx='50%'
				cy='50%'
				outerRadius={80}
				fill='#8884d8'
				label
			/>
		</PieChart>
	);
}
