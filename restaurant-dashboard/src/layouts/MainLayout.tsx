import React, { ReactNode, useContext } from "react";
import {
	DashboardOutlined,
	DesktopOutlined,
	PieChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, MenuProps, Avatar, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useBreakpoint from "../hooks/UseBreakpoint";
import { useQuery } from "@apollo/client";
import { GET_MANAGER } from "../graphql/query";
import { AuthContext } from "../context/AuthContext";
import ErrorPage from "../components/common/Error";

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
	getItem(<Link to={"/"}>Menus</Link>, "menus", <DashboardOutlined />),
	getItem(
		<Link to={"/new-order"}>New Order</Link>,
		"newOrder",
		<DesktopOutlined />
	),
	getItem(
		<Link to={"/order-history"}>Order History</Link>,
		"orderHistory",
		<PieChartOutlined />
	),
];

type LayoutProps = {
	children: ReactNode;
	label?: string | null;
};

const RequireAuth = (props: LayoutProps) => {
	// return <Navigate to='/login' />;
	return <>{props.children}</>;
};

const MainLayout = ({ children, label }: LayoutProps) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const breakpoint = useBreakpoint();
	const navigate = useNavigate();
	const { userId, setRestaurantId, setToken, setUserId } =
		useContext(AuthContext);

	const { loading, data, error } = useQuery(GET_MANAGER, {
		variables: { managerId: userId },
	});

	if (loading) {
		return <Skeleton active />;
	}
	if (data) {
		setRestaurantId(data.manager.restaurant.id);
	}
	if (error) {
		return <ErrorPage />;
	}

	return (
		<RequireAuth>
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
						<h1>Restaurant</h1>
					</div>
					<Menu items={items} mode='inline' />
					<div style={{ marginTop: 20, paddingLeft: 28 }}>
						<Button
							style={{}}
							onClick={() => {
								setToken("");
								setUserId("");
								setRestaurantId("");
								localStorage.setItem("token", "");
								localStorage.setItem("userId", "");
								localStorage.setItem("restaurantId", "");

								navigate("/login");
							}}
						>
							Logout
						</Button>
					</div>
				</Sider>
				<Layout
					style={{
						marginLeft: breakpoint > 1000 ? 200 : 50,
						minHeight: "100vh",
						marginTop: 0,
					}}
				>
					<Header
						style={{
							background: colorBgContainer,
							// height: "fit-content",
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "normal",
							padding: "5px 20px 5px 0px",
						}}
					>
						<Avatar
							style={{ verticalAlign: "middle" }}
							size={{ xs: 12, sm: 16, md: 20, lg: 32, xl: 40, xxl: 50 }}
						>
							{data.manager.user.firstName[0]}
						</Avatar>
					</Header>
					<Content
						style={{
							paddingLeft: 20,
							paddingRight: 20,
							marginTop: 10,
							overflow: "initial",
						}}
					>
						{children}
					</Content>
				</Layout>
			</div>
		</RequireAuth>
	);
};

export default MainLayout;
