import { Row, Col, Card, Skeleton } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import BasicCard from "../components/common/BasicCard";
import useBreakpoint from "../hooks/UseBreakpoint";
import { ChartData1 } from "../data/SampleData";
import OrderBarChart from "../components/dashboard/BarChart";
import OrderPieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import { useQuery } from "@apollo/client";
import { GET_ORDERS, GET_RESTAURANTS, GET_USERS } from "../graphql/query";
import { useEffect, useState } from "react";
import ErrorPage from "../components/common/Error";

const Dashboard = () => {
	const [orderCount, setOrderCount] = useState(0);
	const [restaurantCount, setRestaurantCount] = useState(0);
	const [customerCount, setCustomerCount] = useState(0);
	const [deliveryPersonCount, setDeliveryPersonCount] = useState(0);

	const breakpoint = useBreakpoint();
	const {
		data: restaurants,
		loading: loadingRestaurant,
		error: restaurantError,
	} = useQuery(GET_RESTAURANTS);
	const {
		data: orders,
		loading: loadingOrder,
		error: orderError,
	} = useQuery(GET_ORDERS);
	const {
		data: users,
		loading: loadingUser,
		error: userError,
	} = useQuery(GET_USERS);

	useEffect(() => {
		if (restaurants) {
			setRestaurantCount(restaurants.restaurants.length);
		}
		if (orders) {
			setOrderCount(orders.getAllOrders.length);
		}
		if (users) {
			setCustomerCount(
				users.users.filter((user: any) => user.role === "Customer").length
			);
			setDeliveryPersonCount(
				users.users.filter((user: any) => user.role === "DeliveryPerson").length
			);
		}
	}, [restaurants, orders, users]);

	if (loadingUser || loadingOrder || loadingRestaurant) {
		return <Skeleton />;
	}
	if (restaurantError || orderError || userError) {
		return <ErrorPage />;
	}

	return (
		<div style={{}}>
			<h1>Dashboard</h1>
			<Row gutter={{ xs: 4, sm: 6, md: 32 }} wrap style={{}}>
				<Col span={6}>
					<BasicCard
						stat={orderCount}
						label={"Orders"}
						icon={
							<BarChartOutlined
								style={{ fontSize: breakpoint > 768 ? "48px" : "12px" }}
							/>
						}
					/>
				</Col>
				<Col span={6}>
					<BasicCard
						stat={restaurantCount}
						label={"Restaurants"}
						icon={<BarChartOutlined style={{ fontSize: "48px" }} />}
					/>
				</Col>
				<Col span={6}>
					<BasicCard
						stat={customerCount}
						label={"Customers"}
						icon={<BarChartOutlined style={{ fontSize: "48px" }} />}
					/>
				</Col>
				<Col span={6}>
					<BasicCard
						stat={deliveryPersonCount}
						label={"Delivery Person"}
						icon={<BarChartOutlined style={{ fontSize: "48px" }} />}
					/>
				</Col>
			</Row>
			<Row gutter={20} style={{ marginTop: 20 }}>
				<Col span={12}>
					<Card style={{ paddingLeft: 20 }} bodyStyle={{ padding: "0" }}>
						<h1>Booked Order From Head Quarter</h1>
						<OrderPieChart data={orders.getAllOrders} />
					</Card>
				</Col>
				<Col span={12}>
					<Card style={{ paddingLeft: 5 }} bodyStyle={{ padding: "0" }}>
						<h1 style={{ marginLeft: 15 }}>Order Distribution by day</h1>
						<OrderBarChart data={orders.getAllOrders} />
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
				<LineChart data={ChartData1} />
			</Card>
		</div>
	);
};

export default Dashboard;
