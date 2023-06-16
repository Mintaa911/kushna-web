import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: `http://192.168.70.22:3000/graphql` });

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</ApolloProvider>
	</React.StrictMode>
);
