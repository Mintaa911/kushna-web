import React, { createContext, ReactNode, useEffect, useState } from "react";

const INITIAL_TOKEN = localStorage.getItem("token") || "";
const INITIAL_USER = parseInt(localStorage.getItem("userId") || "0");
const INITIAL_RESTAURANT = parseInt(
	localStorage.getItem("restaurantId") || "0"
);

export const AuthContext = createContext<{
	token: string;
	setToken: React.Dispatch<any>;
	userId: number;
	setUserId: React.Dispatch<any>;
	restaurantId: number;
	setRestaurantId: React.Dispatch<any>;
}>({
	token: INITIAL_TOKEN,
	setToken: () => null,
	userId: INITIAL_USER,
	setUserId: () => null,
	restaurantId: INITIAL_RESTAURANT,
	setRestaurantId: () => null,
});

interface LayoutProps {
	children: ReactNode;
}

export const AuthContextProvider = (props: LayoutProps) => {
	const [token, setToken] = useState(INITIAL_TOKEN);
	const [userId, setUserId] = useState(INITIAL_USER);
	const [restaurantId, setRestaurantId] = useState(INITIAL_RESTAURANT);

	useEffect(() => {
		localStorage.setItem("token", token);
		localStorage.setItem("userId", userId.toString());
		localStorage.setItem("restaurantId", restaurantId.toString());
	}, [token, userId, restaurantId]);

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				userId,
				setUserId,
				restaurantId,
				setRestaurantId,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
