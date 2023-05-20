import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout children={<Dashboard />} label='Dashboard' />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
