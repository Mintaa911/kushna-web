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

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RequireAuth>
				<MainLayout children={<Dashboard />} label='Dashboard' />
			</RequireAuth>
		),
	},
	{
		path: "/new-order",
		element: (
			<RequireAuth>
				<MainLayout children={<NewOrder />} label='Dashboard' />
			</RequireAuth>
		),
	},
	{
		path: "/order-history",
		element: (
			<RequireAuth>
				<MainLayout children={<OrderHistory />} label='Dashboard' />
			</RequireAuth>
		),
	},
	{
		path: "/food-detail",
		element: (
			<RequireAuth>
				<MainLayout children={<FoodDetailPage />} label='Dashboard' />
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
