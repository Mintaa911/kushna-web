import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NewOrder from "./pages/NewOrder";
import OrderHistory from "./pages/OrderHistory";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout children={<Dashboard />} label='Dashboard' />,
	},
	{
		path: "/new-order",
		element: <MainLayout children={<NewOrder />} label='Dashboard' />,
	},
	{
		path: "/order-history",
		element: <MainLayout children={<OrderHistory />} label='Dashboard' />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
