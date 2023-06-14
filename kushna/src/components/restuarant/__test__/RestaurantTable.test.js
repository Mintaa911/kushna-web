import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import RestaurantTable from "../RestaurantTable";
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

const GET_RESTAURANTS = gql`
	query Restaurants {
		restaurants {
			id
			name
			address
			phone
			email
			openingHour
			closingHour
			description
			restaurantType
			banner
			status
		}
	}
`;

const restaurants = [
	{
		__typename: "Restaurant",
		id: 1,
		name: "Restaurant Pizzeria Italian",
		address: "5 kilo",
		phone: "0911223344",
		email: "pizzeria@restaurant.com",
		openingHour: "2023-06-03T05:00:00.000Z",
		closingHour: "2023-06-03T19:00:00.000Z",
		description: "Italian food restaurant",
		restaurantType: "HOTEL",
		banner: [
			"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
			"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
			"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
		],
		status: "OPEN",
	},
	{
		__typename: "Restaurant",
		id: 2,
		name: "Mesi",
		address: "6 kilo",
		phone: "0922334455",
		email: "mesi@restaurant.com",
		openingHour: "2023-06-03T08:00:00.000Z",
		closingHour: "2023-06-03T17:00:00.000Z",
		description: "Home made foods ",
		restaurantType: "HOME",
		banner: [
			"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
		],
		status: "OPEN",
	},
	{
		__typename: "Restaurant",
		id: 3,
		name: "Etag Kurs Bet",
		address: "4 kilo",
		phone: "0933445566",
		email: "etag@restaurant.com",
		openingHour: "2023-06-03T05:00:00.000Z",
		closingHour: "2023-06-03T12:00:00.000Z",
		description: "Small breakfast house",
		restaurantType: "HOTEL",
		banner: [
			"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fetag.jpg?alt=media&token=e1ef0a47-66c8-4c68-a631-9b2339280fc7",
		],
		status: "OPEN",
	},
	{
		__typename: "Restaurant",
		id: 4,
		name: "Ertib Bet",
		address: "5 kilo",
		phone: "0933445566",
		email: "ertib@restaurant.com",
		openingHour: "2023-06-11T07:00:00.000Z",
		closingHour: "2023-06-11T17:00:00.000Z",
		description: "Sliced potato with bread ",
		restaurantType: "HOTEL",
		banner: [
			"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fertb_bet.jpg?alt=media&token=22234d95-53ee-4a4c-abab-729d06c27782",
		],
		status: "OPEN",
	},
];

const mocks = [
	{
		request: {
			query: GET_RESTAURANTS,
		},
		result: {
			data: { restaurants: restaurants },
		},
	},
];

it("should render restaurant table", async () => {
	render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<RestaurantTable />
		</MockedProvider>
	);
	expect(await screen.findByTestId(/table/i)).toBeInTheDocument();

	const restaurants = await screen.findAllByText(/mesi/i);

	expect(restaurants.length).toBeGreaterThan(0);
});
