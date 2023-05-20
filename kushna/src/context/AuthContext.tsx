import { createContext, ReactNode } from "react";
// import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	currentUser: null,
};

export const AuthContext = createContext(INITIAL_STATE);

interface LayoutProps {
	children: ReactNode;
}

export const AuthContextProvider = (props: LayoutProps) => {
	// const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	// useEffect(() => {
	// localStorage.setItem("user", JSON.stringify(state.currentUser));
	// }, [state.currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser: null }}>
			{props.children}
		</AuthContext.Provider>
	);
};
