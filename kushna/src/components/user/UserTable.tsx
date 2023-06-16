import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { UserDataType } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/query";

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<UserDataType> = [
	{
		title: "Id",
		dataIndex: "id",
		sorter: true,
	},
	{
		title: "Name",
		dataIndex: "firstName",
		sorter: true,
		render: (name, record) => `${record.firstName} ${record.lastName}`,
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Role",
		dataIndex: "role",
	},
];

const CustomerTable = () => {
	const [data, setData] = useState<UserDataType[]>();
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});

	const { loading, data: dataQuery } = useQuery(GET_USERS, {
		pollInterval: 5000,
	});
	useEffect(() => {
		if (dataQuery) {
			setData(dataQuery.users);
		}
	}, [dataQuery]);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<UserDataType> | SorterResult<UserDataType>[]
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

export default CustomerTable;
