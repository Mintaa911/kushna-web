import { Table, Modal } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDER_HISTORY } from "../../graphql/query";
import { AuthContext } from "../../context/AuthContext";
import Column from "antd/es/table/Column";

interface DataType {
	orderId: number;
	name: string;
	foodId: number;
	description: string;
	price: Float32Array;
	status: string;
	variable: Array<Object>;
	image: Array<string>;
	quantity: number;
	createdAt: string;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

const OrderHistoryTable = () => {
	const [orderHistory, setOrderHistory] = useState<DataType[]>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});
	const { restaurantId } = useContext(AuthContext);
	const { loading, data: dataQuery } = useQuery(GET_ORDER_HISTORY);

	useEffect(() => {
		if (dataQuery) {
			const mapped = mapOrderByRestaurant(dataQuery.getAllOrders, restaurantId);

			setOrderHistory(mapOrderForTable(mapped));
		}
	}, [dataQuery, restaurantId]);

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
			setOrderHistory([]);
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Table
				// onRow={(record, rowIndex) => {
				// 	return {
				// 		onClick: (event) => {
				// 			showModal();
				// 		}, // click row
				// 	};
				// }}
				rowKey={(record) => record.orderId}
				dataSource={orderHistory}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
			>
				<Column title='Food' dataIndex='name' key='name' />
				<Column title='Order Id' dataIndex='orderId' key='orderId' />
				<Column title='Price' dataIndex='price' key='price' />
				<Column title='Quantity' dataIndex='quantity' key='quantity' />
				<Column title='Status' dataIndex='status' key='status' />
				<Column
					title='Order Time'
					dataIndex='createdAt'
					key='createdAt'
					render={(value: any) => {
						const date = new Date(value).toDateString();
						return <span>{date}</span>;
					}}
				/>
			</Table>
			<Modal
				title='Order Detail'
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<p>detail</p>
			</Modal>
		</>
	);
};

export default OrderHistoryTable;
const mapOrderByRestaurant = (orders: any, restaurantId: number) => {
	const mapped = orders.map((order: any) => {
		const res = order.subOrders.map((subOrder: any) => {
			const result = subOrder.orderedFoods.filter((orderedFood: any) => {
				return orderedFood.food.restaurant.id === restaurantId;
			});
			console.log(subOrder.orderStatus);
			return subOrder.orderStatus === "PREPARED" && result.length !== 0
				? { ...subOrder, orderedFoods: result }
				: [];
		});

		return res.length !== 0 ? res : [];
	});

	return mapped.flat(2);
};

type TableParamType = {
	orderId: number;
	name: string;
	foodId: number;
	description: string;
	price: Float32Array;
	status: string;
	variable: Array<Object>;
	image: Array<string>;
	quantity: number;
	createdAt: string;
};

type OrderFood = {
	id: number;
	quantity: number;
	variables: Array<Object>;
	food: Food;
};

type Food = {
	id: number;
	name: string;
	description: string;
	price: Float32Array;
	images: Array<string>;
	status: string;
	variables: Array<Object>;
	reviews: Array<Object>;
	createdAt: string;
};

type SubOrder = {
	deliveredAt: string;
	deliveryGuy: Object;
	id: number;
	orderStatus: string;
	orderedFoods: Array<OrderFood>;
};

const mapOrderForTable = (subOrder: Array<SubOrder>) => {
	const tableParams = [];
	for (let i = 0; i < subOrder.length; i++) {
		for (let j = 0; j < subOrder[i].orderedFoods.length; j++) {
			const obj = {} as TableParamType;
			const element = subOrder[i].orderedFoods[j] as OrderFood;
			obj.orderId = subOrder[i].id;
			obj.foodId = element.food.id;
			obj.name = element.food.name;
			obj.description = element.food.description;
			obj.price = element.food.price;
			obj.image = element.food.images;
			obj.variable = element.variables;
			obj.status = subOrder[i].orderStatus;
			obj.quantity = element.quantity;
			obj.createdAt = element.food.createdAt;
			tableParams.push(obj);
		}
	}

	return tableParams;
};
