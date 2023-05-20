import { Table, Modal } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";
// import { useQuery } from "@apollo/client";

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
		title: "Status",
		dataIndex: "orderStatus",
	},
];

const NewOrderTable = () => {
	const [data, setData] = useState<DataType[]>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});

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

	const showModal = () => {
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
							showModal();
						}, // click row
					};
				}}
				columns={columns}
				rowKey={(record) => record.id}
				dataSource={data}
				pagination={tableParams.pagination}
				// loading={loading}
				onChange={handleTableChange}
			/>
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

export default NewOrderTable;
