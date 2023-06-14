import { useQuery } from "@apollo/client";
import { Table, TablePaginationConfig, Button } from "antd";
import Column from "antd/es/table/Column";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { GET_RESTAURANTS_WITH_COUPON } from "../../graphql/query";

interface DataType {
	id: number;
	name: string;
	couponCode: string;
	discount: number;
	numberOfTimesUsed: number;
}

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue | null>;
}

export default function CouponTable() {
	const [coupon, setCoupon] = useState<Array<DataType>>([]);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
			showSizeChanger: false,
		},
	});

	const { data, loading } = useQuery(GET_RESTAURANTS_WITH_COUPON);

	useEffect(() => {
		if (data) {
			const res = mapToCoupon(data.restaurants);
			setCoupon(res);
		}
	}, [data]);

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
			setCoupon([]);
		}
	};
	return (
		<Table
			rowKey={(record) => record.id}
			dataSource={coupon}
			pagination={tableParams.pagination}
			loading={loading}
			onChange={handleTableChange}
		>
			<Column title='Restaurant' dataIndex='name' key='name' />
			<Column title='Coupon Code' dataIndex='couponCode' key='couponCode' />
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
	);
}

const mapToCoupon = (data: any) => {
	return data
		.map((restaurant: any) => {
			const coupon = restaurant.cupons.filter((coupon: any) => coupon.isActive);

			return coupon.length > 0
				? {
						id: restaurant.id,
						name: restaurant.name,
						couponCode: coupon[0].code,
						discount: coupon[0].discount,
						isActive: true,
						numberOfTimesUsed: coupon[0].numberOfTimesUsed,
				  }
				: undefined;
		})
		.filter((coupon: any) => coupon);
};
