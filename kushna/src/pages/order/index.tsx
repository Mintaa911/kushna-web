import { Card } from "antd";
import OrderTable from "../../components/order/OrderTable";

const Order = () => {
	return (
		<>
			<h1 style={{ margin: 0, marginBottom: 10 }}>Orders</h1>
			<Card>
				<OrderTable />
			</Card>
		</>
	);
};

export default Order;
