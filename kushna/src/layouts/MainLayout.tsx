import React, { ReactNode } from "react";
import {
	DashboardOutlined,
	DesktopOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import useBreakpoint from "../hooks/UseBreakpoint";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuProps["items"] = [
	getItem(<Link to={"/"}>Dashboard</Link>, "dashboard", <DashboardOutlined />),
	getItem(<Link to={"order"}>Order</Link>, "order", <DesktopOutlined />),
	getItem(
		<Link to={"/restaurant"}>Restaurant</Link>,
		"restaurant",
		<PieChartOutlined />
	),
	getItem(<Link to={"/customer"}>Customer</Link>, "customer", <UserOutlined />),
	getItem(
		<Link to={"/delivery-person"}>Delivery Person</Link>,
		"delivery person",
		<TeamOutlined />
	),
];

type LayoutProps = {
	children: ReactNode;
	label: string;
};

const MainLayout = ({ children, label }: LayoutProps) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const breakpoint = useBreakpoint();
	console.log(breakpoint);

	return (
		<div>
			<Sider
				breakpoint='lg'
				collapsedWidth='50'
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
					background: colorBgContainer,
					margin: 0,
				}}
			>
				<div
					style={{
						paddingLeft: 28,
					}}
				>
					<h1>Kushna</h1>
				</div>
				<Menu items={items} mode='inline' />
			</Sider>
			<Layout
				style={{
					marginLeft: breakpoint > 1000 ? 200 : 50,
					minHeight: "100vh",
				}}
			>
				<Header
					style={{
						padding: 0,
						paddingLeft: 20,
						alignContent: "center",
						background: colorBgContainer,
						height: 40,
					}}
				></Header>
				<Content style={{ margin: "2px 0px 0px 0px", overflow: "initial" }}>
					{children}
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</Layout>
		</div>
	);
};

export default MainLayout;
