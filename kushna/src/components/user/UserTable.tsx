import { Table, Modal } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import qs from "qs";

interface DataType {
	name: {
		first: string;
		last: string;
	};
	gender: string;
	email: string;
	login: {
		uuid: string;
	};
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

const columns: ColumnsType<DataType> = [
	{
		title: "Name",
		dataIndex: "name",
		sorter: true,
		render: (name) => `${name.first} ${name.last}`,
		// width: "30%",
	},
	{
		title: "Gender",
		dataIndex: "gender",
		filters: [
			{ text: "Male", value: "male" },
			{ text: "Female", value: "female" },
		],
		onFilter: (value, record) => record.gender.includes(value as string),
		// width: "20%",
	},
	{
		title: "Email",
		dataIndex: "email",
	},
];

const getRandomuserParams = (params: TableParams) => ({
	results: params.pagination?.pageSize,
	page: params.pagination?.current,
	...params,
});
const CustomerTable = () => {
	const [data, setData] = useState<DataType[]>();
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});

	const fetchData = () => {
		setLoading(true);
		fetch(
			`https://randomuser.me/api?${qs.stringify(
				getRandomuserParams(tableParams)
			)}`
		)
			.then((res) => res.json())
			.then(({ results }) => {
				setData(results);
				setLoading(false);
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination,
						total: 200,
						// 200 is mock data, you should read it from server
						// total: data.totalCount,
					},
				});
			});
	};

	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

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
				rowKey={(record) => record.login.uuid}
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
		</>
	);
};

export default CustomerTable;
