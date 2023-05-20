import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
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
		title: "Name",
		dataIndex: "name",
		sorter: true,
		// width: "30%",
	},
	{
		title: "Address",
		dataIndex: "address",
		// width: "20%",
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
	const [singleRestaurant, setSingleRestaurant] =
		useState<RestaurantDataType>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 8,
			showSizeChanger: false,
		},
	});
	const { loading, data } = useQuery(GET_RESTAURANTS);

	useEffect(() => {
		if (data) {
			setData(data.restaurants);
		}
	}, [data]);

	// 	fetch(
	// 		`https://randomuser.me/api?${qs.stringify(
	// 			getRandomuserParams(tableParams)
	// 		)}`
	// 	)
	// 		.then((res) => res.json())
	// 		.then(({ results }) => {
	// 			setData(results);
	// 			setLoading(false);
	// 			setTableParams({
	// 				...tableParams,
	// 				pagination: {
	// 					...tableParams.pagination,
	// 					total: 200,
	// 					// 200 is mock data, you should read it from server
	// 					// total: data.totalCount,
	// 				},
	// 			});
	// 		});
	// };

	// useEffect(() => {
	// 	fetchData();
	// }, [JSON.stringify(tableParams)]);

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

	const showModal = (item: RestaurantDataType) => {
		setSingleRestaurant(item);
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Table
				onRow={(record, rowIndex) => {
					return {
						onClick: (event) => {
							showModal(record);
						}, // click row
					};
				}}
				columns={columns}
				rowKey={(record) => record.id}
				dataSource={myData}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
			/>
			<Modal
				title='Restaurant Detail'
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<p>{singleRestaurant?.name}</p>
				<p>{singleRestaurant?.address}</p>
				<p>{singleRestaurant?.description}</p>
			</Modal>
		</>
	);
}
