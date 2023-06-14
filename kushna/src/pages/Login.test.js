import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";

window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			matches: false,
			addListener: function () {},
			removeListener: function () {},
		};
	};

const LOGIN_USER = gql`
	mutation Mutation($input: LoginInput!) {
		login(input: $input) {
			id
			role
			token
		}
	}
`;

const mocks = [
	{
		request: {
			query: LOGIN_USER,
			variables: {
				input: { email: "maruf@admin", password: "123456" },
			},
		},
		result: {
			data: {
				login: {
					id: 1,
					role: "Admin",
					token:
						"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjg2NzU0Njc3LCJleHAiOjE2ODczNTk0Nzd9.uKIg5y-wlEufRg9JvuzhvbvD-I-BNeTLnYrth_xOn9A",
					__typename: "LoginResponse",
				},
			},
		},
	},
];

describe("Login test", () => {
	test("should render login form inputs", () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			</MockedProvider>
		);

		const email = screen.getByPlaceholderText("email");
		const password = screen.getByPlaceholderText("password");
		const button = screen.getByRole("button", { name: "Sign in" });

		expect(email).toBeInTheDocument();
		expect(password).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test("should change login form inputs", () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<BrowserRouter>
					<Login />
				</BrowserRouter>
			</MockedProvider>
		);

		const email = screen.getByPlaceholderText("email");
		const password = screen.getByPlaceholderText("password");

		fireEvent.change(email, { target: { value: "maruf@admin.com" } });
		fireEvent.change(password, { target: { value: "123456" } });

		expect(email.value).toBe("maruf@admin.com");
		expect(password.value).toBe("123456");
	});
});
