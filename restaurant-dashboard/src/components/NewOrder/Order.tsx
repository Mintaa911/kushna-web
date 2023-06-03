import { useMutation, useQuery } from "@apollo/client";
import { Table, Button, message } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import Column from "antd/es/table/Column";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UPDATE_SUBORDER_STATUS } from "../../graphql/mutation";
import { GET_ORDER_HISTORY } from "../../graphql/query";
// import { useQuery } from "@apollo/client";

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

const NewOrderTable = () => {
	const navigate = useNavigate();
	const [newOrder, setNewOrder] = useState<DataType[]>();
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});

	const { restaurantId } = useContext(AuthContext);
	const { loading, data: dataQuery } = useQuery(GET_ORDER_HISTORY);
	const [updateSuborderStatus] = useMutation(UPDATE_SUBORDER_STATUS);

	useEffect(() => {
		if (dataQuery) {
			const mapped = mapOrderByRestaurant(dataQuery.getAllOrders, restaurantId);
			setNewOrder(mapOrderForTable(mapped));
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
			setNewOrder([]);
		}
	};

	const handleStatusChange = (subOrderId: number, status: string) => {
		updateSuborderStatus({
			variables: {
				updateSuborderStatusId: subOrderId,
				status: status,
			},
		})
			.then(() => {
				message.success("Status successfully updated!");
				navigate(0);
			})
			.catch((error: any) => {
				message.error(error.message);
			});
	};

	return (
		<>
			<Table
				// onRow={(record, rowIndex) => {
				// 	return {
				// 		onClick: (event) => {
				// 		}, // click row
				// 	};
				// }}
				rowKey={(record) => record.orderId}
				dataSource={newOrder}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
			>
				<Column title='Food' dataIndex='name' key='name' />
				<Column title='Price' dataIndex='price' key='price' />
				<Column title='Quantity' dataIndex='quantity' key='quantity' />
				<Column title='Status' dataIndex='status' key='status' />
				<Column
					title='Action'
					dataIndex='orderId'
					key='orderId'
					render={(value: any, record: any) => {
						let text =
							record?.status === "IN_PROGRESS"
								? "Change to Preparing"
								: "Change to Finished";
						let status =
							record?.status === "IN_PROGRESS" ? "PREPARING" : "PREPARED";
						return (
							<Button
								key={value}
								onClick={async (e) => {
									e.stopPropagation();
									handleStatusChange(value as number, status);
								}}
							>
								{text}
							</Button>
						);
					}}
				/>
			</Table>
		</>
	);
};

export default NewOrderTable;

const mapOrderByRestaurant = (orders: any, restaurantId: number) => {
	const mapped = orders.map((order: any) => {
		const res = order.subOrders.map((subOrder: any) => {
			const result = subOrder.orderedFoods.filter((orderedFood: any) => {
				return orderedFood.food.restaurant.id === restaurantId;
			});
			return subOrder.orderStatus === "IN_PROGRESS" ||
				(subOrder.orderStatus === "PREPARING" && result.length !== 0)
				? { ...subOrder, orderedFoods: result }
				: [];
		});

		return res.length !== 0 ? res : [];
	});

	return mapped.flat(2);
};

type OrderFood = {
	id: number;
	quantity: number;
	variables: Array<Object>;
	food: Food;
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
	action: ReactNode;
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
