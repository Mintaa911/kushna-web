import { Pie, PieChart } from "recharts";

export default function OrderPieChart({ data }: { data: any }) {
	return (
		<PieChart width={520} height={200}>
			<Pie
				data={mapOrderFromHeadquearters(data)}
				dataKey='count'
				nameKey='headQuarter'
				cx='50%'
				cy='50%'
				outerRadius={80}
				fill='#8884d8'
				label
			/>
		</PieChart>
	);
}

function mapOrderFromHeadquearters(data: any) {
	let headQuarterDict = new Map<string, number>();
	data.forEach((order: any) => {
		if (order.headQuarter) {
			const id = order.headQuarter.id as string;
			if (headQuarterDict.get(id)) {
				headQuarterDict.set(id, headQuarterDict.get(id) as number);
			} else {
				headQuarterDict.set(id, 1);
			}
		}
	});

	return Array.from(headQuarterDict, ([name, value]) => ({
		headQuarter: name,
		count: value,
	}));
}
