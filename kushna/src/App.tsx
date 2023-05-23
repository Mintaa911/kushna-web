import React from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import User from "./pages/user";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/order";
import Restaurant from "./pages/restaurant";
import Login from "./pages/Login";
import RequireAuth from "./components/common/RequireAuth";

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
		path: "/restaurant",
		element: (
			<RequireAuth>
				<MainLayout children={<Restaurant />} label='Restaurant' />
			</RequireAuth>
		),
	},

	{
		path: "/order",
		element: (
			<RequireAuth>
				<MainLayout children={<Order />} label='Order' />
			</RequireAuth>
		),
	},
	{
		path: "/user",
		element: (
			<RequireAuth>
				<MainLayout children={<User />} label='User' />
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
