import React, { ReactNode } from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";

type LayoutProps = {
	children: ReactNode;
	label: string;
};
function App({ children, label }: LayoutProps) {
	return (
		<div>
			<MainLayout children={children} label={label} />
		</div>
	);
}

export default App;
