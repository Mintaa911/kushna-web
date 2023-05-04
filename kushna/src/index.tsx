import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Customer from "./pages/customer";
import Dashboard from "./pages/Dashboard";
import DeliveryPerson from "./pages/delivery-person";
import Order from "./pages/order";
import Restaurant from "./pages/restaurant";

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
		path: "/order",
		element: <App children={<Order />} label='Order' />,
	},
	{
		path: "/customer",
		element: <App children={<Customer />} label='Customer' />,
	},
	{
		path: "/delivery-person",
		element: <App children={<DeliveryPerson />} label='Delivery Person' />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
