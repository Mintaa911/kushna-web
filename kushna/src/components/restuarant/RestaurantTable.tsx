import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { RestaurantDataType } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "../../graphql/query";

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<RestaurantDataType> = [
	{
		title: "Id",
		dataIndex: "id",
	},
	{
		title: "Name",
		dataIndex: "name",
	},
	{
		title: "Address",
		dataIndex: "address",
	},
	{
		title: "Phone",
		dataIndex: "phone",
	},
	{
		title: "Restaurant Type",
		dataIndex: "restaurantType",
	},
	{
		title: "Status",
		dataIndex: "status",
	},
];

export default function RestaurantTable() {
	const [myData, setData] = useState<RestaurantDataType[]>();
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 8,
			showSizeChanger: false,
		},
	});
	const { loading, data } = useQuery(GET_RESTAURANTS, {
		pollInterval: 5000,
	});
	useEffect(() => {
		if (data) {
			setData(data.restaurants);
		}
	}, [data]);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter:
			| SorterResult<RestaurantDataType>
			| SorterResult<RestaurantDataType>[]
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
				dataSource={myData}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
			/>
		</div>
	);
}
