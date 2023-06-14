import { Table, Modal } from "antd";
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
		title: "Name",
		dataIndex: "firstName",
		sorter: true,
		// render: (name) => `${name.firstName} ${name.lastName}`,
		// width: "30%",
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});

	const { loading, data: dataQuery } = useQuery(GET_USERS);
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

	const showModal = (record: UserDataType) => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div data-testid='table'>
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
				dataSource={data}
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
				<p>user detail</p>
			</Modal>
		</div>
	);
};

export default CustomerTable;
