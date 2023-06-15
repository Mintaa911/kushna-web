import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NewOrder from "./pages/NewOrder";
import OrderHistory from "./pages/OrderHistory";
import RequireAuth from "./components/common/RequireAuth";
import Login from "./pages/Login";
import FoodDetailPage from "./pages/food-detail";
import Profile from "./pages/profile";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RequireAuth>
				<MainLayout children={<Dashboard />} />
			</RequireAuth>
		),
	},
	{
		path: "/new-order",
		element: (
			<RequireAuth>
				<MainLayout children={<NewOrder />} />
			</RequireAuth>
		),
	},
	{
		path: "/order-history",
		element: (
			<RequireAuth>
				<MainLayout children={<OrderHistory />} />
			</RequireAuth>
		),
	},
	{
		path: "/food-detail",
		element: (
			<RequireAuth>
				<MainLayout children={<FoodDetailPage />} />
			</RequireAuth>
		),
	},
	{
		path: "/profile",
		element: (
			<RequireAuth>
				<MainLayout children={<Profile />} />
			</RequireAuth>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
