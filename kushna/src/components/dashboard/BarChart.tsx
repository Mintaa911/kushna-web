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
			data={mapOrderToWeekdays(data)}
			margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey='weekday' />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey='count' fill='#8884d8' />
		</BarChart>
	);
}

function mapOrderToWeekdays(orders: any) {
	let weekdayMap = new Map<string, number>([
		["Mon", 0],
		["Tue", 0],
		["Wed", 0],
		["Thu", 0],
		["Fri", 0],
		["Sat", 0],
		["Sun", 0],
	]);

	orders.forEach((order: any) => {
		const weekday = new Date(order.createdAt).toLocaleDateString("en-us", {
			weekday: "short",
		});
		weekdayMap.set(weekday, 1 + (weekdayMap.get(weekday) as number));
	});
	const res = Array.from(weekdayMap, ([key, val]) => ({
		weekday: key,
		count: val,
	}));

	return res;
}
