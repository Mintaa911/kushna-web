import React, { createContext, ReactNode, useEffect, useState } from "react";

const INITIAL_TOKEN = localStorage.getItem("token") || "";

export const AuthContext = createContext<{
	token: string;
	setToken: React.Dispatch<any>;
}>({
	token: INITIAL_TOKEN,
	setToken: () => null,
});

interface LayoutProps {
	children: ReactNode;
}

export const AuthContextProvider = (props: LayoutProps) => {
	const [token, setToken] = useState(INITIAL_TOKEN);
	useEffect(() => {
		localStorage.setItem("token", token);
	}, [token]);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{props.children}
		</AuthContext.Provider>
	);
};
