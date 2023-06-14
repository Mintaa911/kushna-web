import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import {
	CartesianGrid,
	XAxis,
	YAxis,
	BarChart,
	Legend,
	Tooltip,
	Bar,
} from "recharts";
import { GET_FOODS } from "../../graphql/query";

export default function TopRatedChart() {
	const [foods, setFoods] = useState();
	const { data, loading, error } = useQuery(GET_FOODS);

	useEffect(() => {
		if (data) {
			const res = mapFood(data.foods);
			setFoods(res);
		}
	}, [data]);

	if (loading) {
		return <Skeleton />;
	}
	if (error) {
		return <div>error</div>;
	}

	return (
		<BarChart
			width={520}
			height={200}
			data={foods}
			margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray='2 2' />
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey='rating' fill='#8884d8' scale={2} />
		</BarChart>
	);
}

function mapFood(data: any) {
	const res = data.map((food: any) => {
		const rate =
			food.reviews.length > 1
				? food.reviews.reduce((accumulator: number, current: any) => {
						return current.rating + accumulator;
				  }, 0) / food.reviews.length
				: 0;

		return { name: food.name, rating: parseFloat(rate.toFixed(1)) };
	});

	return res.sort((a: any, b: any) => b.rating - a.rating).slice(0, 5);
}
