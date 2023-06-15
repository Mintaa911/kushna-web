import { Table, TablePaginationConfig, Button } from "antd";
import Column from "antd/es/table/Column";
import React, { useState } from "react";
import { FilterValue, SorterResult } from "antd/es/table/interface";

interface DataType {
	id: number;
	code: string;
	discount: number;
	numberOfTimesUsed: number;
	isActive: boolean;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

const CouponTable = (data: any) => {
	const [coupons, setCoupons] = useState(mapData(data.data));
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
			setCoupons([]);
		}
	};

	return (
		<div>
			<h1>Coupons</h1>
			<Table
				rowKey={(record) => record.code}
				dataSource={coupons}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
			>
				<Column title='Coupon Code' dataIndex='code' key='code' />
				<Column title='Discount' dataIndex='discount' key='discount' />
				<Column
					title='Coupon Used'
					dataIndex='numberOfTimesUsed'
					key='numberOfTimesUsed'
				/>
				<Column
					title='Status'
					dataIndex='isActive'
					key='isActive'
					render={(value: any) => {
						const btn = value ? (
							<Button
								disabled
								style={{ backgroundColor: "#4cbb17", color: "white" }}
							>
								Active
							</Button>
						) : (
							<Button
								disabled
								style={{ backgroundColor: "gray", color: "white" }}
							>
								Not Active
							</Button>
						);
						return btn;
					}}
				/>
			</Table>
		</div>
	);
};

export default CouponTable;

const mapData = (data: any) => {
	return data.map((coupon: any) => {
		return coupon;
	});
};
