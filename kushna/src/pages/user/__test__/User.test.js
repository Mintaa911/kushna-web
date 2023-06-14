import "@testing-library/jest-dom";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import User from "../index";
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

const GET_USERS = gql`
	query Users {
		users {
			id
			firstName
			lastName
			email
			role
		}
	}
`;

const users = [
	{
		__typename: "User",
		id: 1,
		firstName: "Maruf",
		lastName: "Ahmed",
		email: "maruf@admin.com",
		role: "Admin",
	},
	{
		__typename: "User",
		id: 3,
		firstName: "Maruf",
		lastName: "Ahmed",
		email: "maruf@headquarter.com",
		role: "HeadQuarterEmoloyee",
	},
	{
		__typename: "User",
		id: 4,
		firstName: "Maruf",
		lastName: "Ahmed",
		email: "maruf@delivery.com",
		role: "DeliveryPerson",
	},
	{
		__typename: "User",
		id: 2,
		firstName: "Maruf",
		lastName: "Ahmed",
		email: "maruf@customer.com",
		role: "Customer",
	},
	{
		__typename: "User",
		id: 5,
		firstName: "Mosoloni",
		lastName: "Grazani",
		email: "mosoloni@manager.com",
		role: "RestaurantAdmin",
	},
	{
		__typename: "User",
		id: 6,
		firstName: "Meseret",
		lastName: "Abebe",
		email: "mesi@manager.com",
		role: "RestaurantAdmin",
	},
	{
		__typename: "User",
		id: 7,
		firstName: "Yonatan",
		lastName: "Melaku",
		email: "yoni@manager.com",
		role: "RestaurantAdmin",
	},
	{
		__typename: "User",
		id: 8,
		firstName: "kidus",
		lastName: "zegeye",
		email: "se.kidus.yohannes@gmail.com",
		role: "Customer",
	},
	{
		__typename: "User",
		id: 9,
		firstName: "Alem",
		lastName: "Abebe",
		email: "alem@manager.com",
		role: "RestaurantAdmin",
	},
];

const mocks = [
	{
		request: {
			query: GET_USERS,
		},
		result: {
			data: { users: users },
		},
	},
];

it("should render user modal", async () => {
	render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<User />
		</MockedProvider>
	);

	const button = screen.getByRole("button", { name: /create user/i });

	fireEvent.click(button);

	expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
});
