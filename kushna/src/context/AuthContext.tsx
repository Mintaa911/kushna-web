import React, { createContext, ReactNode, useEffect, useState } from "react";

const INITIAL_STATE = JSON.parse(localStorage.getItem("token") || "{}");

export const AuthContext = createContext<{
	token: string;
	setToken: React.Dispatch<any>;
}>({
	token: INITIAL_STATE,
	setToken: () => null,
});

interface LayoutProps {
	children: ReactNode;
}

export const AuthContextProvider = (props: LayoutProps) => {
	const [token, setToken] = useState(INITIAL_STATE);
	useEffect(() => {
		localStorage.setItem("token", JSON.stringify(token));
	}, [token]);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{props.children}
		</AuthContext.Provider>
	);
};
