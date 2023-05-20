import React from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import User from "./pages/user";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/order";
import Restaurant from "./pages/restaurant";
import CreateRestaurant from "./pages/restaurant/create";
import Login from "./pages/Login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout children={<Dashboard />} label='Dashboard' />,
	},
	{
		path: "/restaurant",
		element: <MainLayout children={<Restaurant />} label='Dashboard' />,
	},
	{
		path: "/restaurant/create",
		element: <MainLayout children={<CreateRestaurant />} label='Dashboard' />,
	},
	{
		path: "/order",
		element: <MainLayout children={<Order />} label='Dashboard' />,
	},
	{
		path: "/user",
		element: <MainLayout children={<User />} label='Dashboard' />,
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
