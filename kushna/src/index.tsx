import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import User from "./pages/user";
import Dashboard from "./pages/Dashboard";
import Order from "./pages/order";
import Restaurant from "./pages/restaurant";
import CreateRestaurant from "./pages/restaurant/create";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App children={<Dashboard />} label='Dashboard' />,
	},
	{
		path: "/restaurant",
		element: <App children={<Restaurant />} label='Restaurant' />,
	},
	{
		path: "/restaurant/create",
		element: <App children={<CreateRestaurant />} label='Create Restaurant' />,
	},
	{
		path: "/order",
		element: <App children={<Order />} label='Order' />,
	},
	{
		path: "/user",
		element: <App children={<User />} label='User' />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
