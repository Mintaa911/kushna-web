import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../graphql/query";

interface DataType {
	id: string;
	customer: {
		first: string;
		last: string;
	};
	gender: string;
	email: string;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<DataType> = [
	{
		title: "Customer",
		dataIndex: "customer",
		sorter: true,
		render: (customer) =>
			`${customer.user.firstName} ${customer.user.lastName}`,
		// width: "30%",
	},
	{
		title: "Quantity",
		dataIndex: "subOrders",
		render: (subOrders: any) => {
			const quantity = subOrders.map((subOrder: any) => {
				return subOrder.orderedFoods
					.map((orderedFood: any) => orderedFood.quantity)
					.reduce((prev: number, next: number) => prev + next);
			});

			return quantity.reduce((prev: number, next: number) => prev + next);
		},
	},
	{
		title: "Price",
		dataIndex: "subOrders",
		render: (subOrders: any) => {
			const price = subOrders.map((subOrder: any) => {
				return subOrder.orderedFoods
					.map(
						(orderedFood: any) => orderedFood.quantity * orderedFood.food.price
					)
					.reduce((prev: number, next: number) => prev + next);
			});

			return price.reduce((prev: number, next: number) => prev + next);
		},
	},
	{
		title: "Delivery Type",
		dataIndex: "deliveryType",
	},
	{
		title: "Payment Status",
		dataIndex: "paymentStatus",
	},
	{
		title: "Status",
		dataIndex: "orderStatus",
	},
];

const OrderTable = () => {
	const [data, setData] = useState<DataType[]>();
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});

	const { loading, data: dataQuery } = useQuery(GET_ORDERS, {
		pollInterval: 5000,
	});
	useEffect(() => {
		if (dataQuery) {
			setData(dataQuery.getAllOrders);
		}
	}, [dataQuery]);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<DataType> | SorterResult<DataType>[]
	) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	return (
		<div data-testid='table'>
			<Table
				columns={columns}
				rowKey={(record) => record.id}
				dataSource={data}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
			/>
		</div>
	);
};

export default OrderTable;
