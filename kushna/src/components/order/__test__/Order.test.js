import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import OrderTable from "../OrderTable";
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

const GET_ORDERS = gql`
	query GetAllOrders {
		getAllOrders {
			id
			createdAt
			customer {
				id
				user {
					id
					firstName
					lastName
					email
					role
				}
			}
			deliveryType
			paymentStatus
			totalPrice
			subOrders {
				id
				orderedFoods {
					id
					food {
						id
						name
						price
						images
						description
						status
						variables {
							id
							name
							description
							price
							foodId
						}
						reviews {
							id
							rating
							comment
						}
						createdAt
						restaurant {
							id
							name
							address
							phone
							email
							description
							openingHour
							closingHour
							restaurantType
							status
							reviews {
								id
								rating
								comment
							}
							banner
						}
					}
					quantity
					variables {
						id
						variable {
							id
							name
							description
							price
							foodId
						}
						quantity
					}
				}
				deliveryGuy {
					id
					user {
						id
					}
				}
				orderStatus
				deliveredAt
			}
			transactionNumber
			orderStatus
			booked
			bookedTime
		}
	}
`;

const orders = [
	{
		__typename: "Order",
		id: "5a7e0780-1fe8-46eb-8ff7-e9d166236e58",
		createdAt: "2023-06-04T07:24:53.344Z",
		customer: {
			__typename: "Customer",
			id: 1,
			user: {
				__typename: "User",
				id: 2,
				firstName: "Maruf",
				lastName: "Ahmed",
				email: "maruf@customer.com",
				role: "Customer",
			},
		},
		deliveryType: "DELIVERY",
		paymentStatus: "PAID",
		totalPrice: 200,
		subOrders: [
			{
				__typename: "OrderDelivery",
				id: 97,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 97,
						food: {
							__typename: "Food",
							id: 7,
							name: "Dinch Besga",
							price: 80,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fdinch_besga.jpg?alt=media&token=1ecb21cc-e4bf-40c3-a4b6-4397e7a16faa",
							],
							description: "Dinch besga cooked at home and delivered",
							status: "NOT_AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 4,
									rating: 4,
									comment: "Best",
								},
								{
									__typename: "Review",
									id: 14,
									rating: 3,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 7,
									rating: 4.3,
									comment: "besttt",
								},
								{
									__typename: "Review",
									id: 18,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 19,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 20,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 21,
									rating: 3,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 22,
									rating: 5,
									comment: "gooodddd",
								},
								{
									__typename: "Review",
									id: 27,
									rating: 2.5,
									comment: "sample comment",
								},
								{
									__typename: "Review",
									id: 28,
									rating: 5,
									comment: "maybe I can invalidate",
								},
								{
									__typename: "Review",
									id: 29,
									rating: 5,
									comment: "my models not modeling",
								},
								{
									__typename: "Review",
									id: 30,
									rating: 5,
									comment: "sample req cayses",
								},
							],
							createdAt: "2023-06-03T20:26:25.760Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 98,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 98,
						food: {
							__typename: "Food",
							id: 4,
							name: "Chicken Cutlet",
							price: 175,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fchikcen_cutlet.png?alt=media&token=2fd701da-3c8e-4cf8-a099-ac506459e27f",
							],
							description: "Chicken cutlet cooked with italian style",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 2,
									rating: 2,
									comment: "Best Food Ever",
								},
								{
									__typename: "Review",
									id: 23,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 24,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 25,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 26,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 36,
									rating: 2.5,
									comment: "this is the best food ever",
								},
								{
									__typename: "Review",
									id: 6,
									rating: 3.9,
									comment: "Nice food",
								},
								{
									__typename: "Review",
									id: 10,
									rating: 2,
									comment: "liked it",
								},
							],
							createdAt: "2023-06-03T20:22:24.432Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 2,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
		],
		transactionNumber: "5a7e0780-1fe8-46eb-8ff7-e9d166236e58",
		orderStatus: "DELIVERED",
		booked: false,
		bookedTime: "2023-06-04T07:11:35.177Z",
	},
	{
		__typename: "Order",
		id: "ab4fe32e-a820-40e5-8923-f6f302799e38",
		createdAt: "2023-06-03T22:39:51.786Z",
		customer: {
			__typename: "Customer",
			id: 1,
			user: {
				__typename: "User",
				id: 2,
				firstName: "Maruf",
				lastName: "Ahmed",
				email: "maruf@customer.com",
				role: "Customer",
			},
		},
		deliveryType: "DELIVERY",
		paymentStatus: "PAID",
		totalPrice: 200,
		subOrders: [
			{
				__typename: "OrderDelivery",
				id: 82,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 82,
						food: {
							__typename: "Food",
							id: 10,
							name: "Dinch Be Gomen",
							price: 60,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fetag_dinch_be_gomen.jpg?alt=media&token=e27c0185-9ade-496d-b675-2368ead559df",
							],
							description: "dinch be gomen with one full enjera",
							status: "AVAILABLE",
							variables: [],
							reviews: [],
							createdAt: "2023-06-03T21:04:28.205Z",
							restaurant: {
								__typename: "Restaurant",
								id: 3,
								name: "Etag Kurs Bet",
								address: "4 kilo",
								phone: "0933445566",
								email: "etag@restaurant.com",
								description: "Small breakfast house",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T12:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 4,
										rating: 4,
										comment: "Best",
									},
									{
										__typename: "Review",
										id: 8,
										rating: 4,
										comment: "Top food",
									},
									{
										__typename: "Review",
										id: 13,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 14,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 9,
										rating: 4,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 15,
										rating: 2,
										comment: "amazing",
									},
									{
										__typename: "Review",
										id: 16,
										rating: 3,
										comment: "best",
									},
									{
										__typename: "Review",
										id: 7,
										rating: 4.3,
										comment: "besttt",
									},
									{
										__typename: "Review",
										id: 31,
										rating: 1,
										comment: "pasta sucks",
									},
									{
										__typename: "Review",
										id: 32,
										rating: 5,
										comment: "fychfu",
									},
									{
										__typename: "Review",
										id: 39,
										rating: 5,
										comment: "Best food ever",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fetag.jpg?alt=media&token=e1ef0a47-66c8-4c68-a631-9b2339280fc7",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 80,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 80,
						food: {
							__typename: "Food",
							id: 13,
							name: "Shiro",
							price: 60,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fetag_shiro.jpg?alt=media&token=7db78f00-f541-47a6-9f98-6eaaebbb30c2",
							],
							description:
								"The most famous food in ethiopia! Shiro is prepared with quality",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 13,
									rating: 3,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 9,
									rating: 4,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 39,
									rating: 5,
									comment: "Best food ever",
								},
							],
							createdAt: "2023-06-03T21:08:03.869Z",
							restaurant: {
								__typename: "Restaurant",
								id: 3,
								name: "Etag Kurs Bet",
								address: "4 kilo",
								phone: "0933445566",
								email: "etag@restaurant.com",
								description: "Small breakfast house",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T12:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 4,
										rating: 4,
										comment: "Best",
									},
									{
										__typename: "Review",
										id: 8,
										rating: 4,
										comment: "Top food",
									},
									{
										__typename: "Review",
										id: 13,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 14,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 9,
										rating: 4,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 15,
										rating: 2,
										comment: "amazing",
									},
									{
										__typename: "Review",
										id: 16,
										rating: 3,
										comment: "best",
									},
									{
										__typename: "Review",
										id: 7,
										rating: 4.3,
										comment: "besttt",
									},
									{
										__typename: "Review",
										id: 31,
										rating: 1,
										comment: "pasta sucks",
									},
									{
										__typename: "Review",
										id: 32,
										rating: 5,
										comment: "fychfu",
									},
									{
										__typename: "Review",
										id: 39,
										rating: 5,
										comment: "Best food ever",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fetag.jpg?alt=media&token=e1ef0a47-66c8-4c68-a631-9b2339280fc7",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 83,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 83,
						food: {
							__typename: "Food",
							id: 6,
							name: "Vegetable Pizza",
							price: 150,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fvegetable_pizza.png?alt=media&token=393a4198-c5b2-49ea-bd6f-4c72561dcb12",
							],
							description: "Vegetable pizza baked with italian style",
							status: "AVAILABLE",
							variables: [],
							reviews: [],
							createdAt: "2023-06-03T20:24:41.378Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 85,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 85,
						food: {
							__typename: "Food",
							id: 8,
							name: "Gas Light Dulet",
							price: 140,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fgas_light.jpg?alt=media&token=eee0bbc0-3434-4fe8-bd35-05f664e677d4",
							],
							description: "Dulet prepared like gas light tibs",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 17,
									rating: 2,
									comment: "cool",
								},
							],
							createdAt: "2023-06-03T20:27:08.959Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 86,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 86,
						food: {
							__typename: "Food",
							id: 12,
							name: "Pasta Benkulal",
							price: 70,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fetag_pasta_benkulal.jpg?alt=media&token=d2b14506-2108-4321-bc7e-f39024f39924",
							],
							description: "Pasta and Egg cooked together",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 8,
									rating: 4,
									comment: "Top food",
								},
								{
									__typename: "Review",
									id: 15,
									rating: 2,
									comment: "amazing",
								},
								{
									__typename: "Review",
									id: 31,
									rating: 1,
									comment: "pasta sucks",
								},
								{
									__typename: "Review",
									id: 32,
									rating: 5,
									comment: "fychfu",
								},
							],
							createdAt: "2023-06-03T21:06:48.792Z",
							restaurant: {
								__typename: "Restaurant",
								id: 3,
								name: "Etag Kurs Bet",
								address: "4 kilo",
								phone: "0933445566",
								email: "etag@restaurant.com",
								description: "Small breakfast house",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T12:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 4,
										rating: 4,
										comment: "Best",
									},
									{
										__typename: "Review",
										id: 8,
										rating: 4,
										comment: "Top food",
									},
									{
										__typename: "Review",
										id: 13,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 14,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 9,
										rating: 4,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 15,
										rating: 2,
										comment: "amazing",
									},
									{
										__typename: "Review",
										id: 16,
										rating: 3,
										comment: "best",
									},
									{
										__typename: "Review",
										id: 7,
										rating: 4.3,
										comment: "besttt",
									},
									{
										__typename: "Review",
										id: 31,
										rating: 1,
										comment: "pasta sucks",
									},
									{
										__typename: "Review",
										id: 32,
										rating: 5,
										comment: "fychfu",
									},
									{
										__typename: "Review",
										id: 39,
										rating: 5,
										comment: "Best food ever",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fetag.jpg?alt=media&token=e1ef0a47-66c8-4c68-a631-9b2339280fc7",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 87,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 87,
						food: {
							__typename: "Food",
							id: 3,
							name: "Habesha Combo",
							price: 297,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fhabesh_combo.png?alt=media&token=c7b7eab2-46f0-46b9-88f1-8d1170235e9f",
							],
							description: "Special combo of the house",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 3,
									rating: 3.1,
									comment: "Amazing food",
								},
								{
									__typename: "Review",
									id: 16,
									rating: 3,
									comment: "best",
								},
							],
							createdAt: "2023-06-03T20:21:15.768Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 88,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 88,
						food: {
							__typename: "Food",
							id: 9,
							name: "Gon Le Gon",
							price: 180,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fgon_le_gon.jpg?alt=media&token=a4b8e467-ec1c-4b39-8325-59701e6f8873",
							],
							description:
								"gon le gon is multiple foods served on a single dish",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 33,
									rating: 5,
									comment: "sucks",
								},
								{
									__typename: "Review",
									id: 34,
									rating: 5,
									comment: "thxhduf",
								},
								{
									__typename: "Review",
									id: 35,
									rating: 5,
									comment: "hey there",
								},
							],
							createdAt: "2023-06-03T20:28:09.441Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 89,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 89,
						food: {
							__typename: "Food",
							id: 2,
							name: "Special Pizza Large",
							price: 250,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fspecial_pizza_large.png?alt=media&token=ceeb4fb7-a59a-41d8-a310-1423a981ae20",
							],
							description: "House special pizza large size",
							status: "NOT_AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 5,
									rating: 2,
									comment: "Wow",
								},
							],
							createdAt: "2023-06-03T20:19:58.566Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 91,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 91,
						food: {
							__typename: "Food",
							id: 11,
							name: "Pasta",
							price: 60,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fetag_pasta.jpg?alt=media&token=122b0312-1a02-4ef5-8608-fe8493b68763",
							],
							description: "normal pasta with enjera",
							status: "AVAILABLE",
							variables: [],
							reviews: [],
							createdAt: "2023-06-03T21:05:55.277Z",
							restaurant: {
								__typename: "Restaurant",
								id: 3,
								name: "Etag Kurs Bet",
								address: "4 kilo",
								phone: "0933445566",
								email: "etag@restaurant.com",
								description: "Small breakfast house",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T12:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 4,
										rating: 4,
										comment: "Best",
									},
									{
										__typename: "Review",
										id: 8,
										rating: 4,
										comment: "Top food",
									},
									{
										__typename: "Review",
										id: 13,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 14,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 9,
										rating: 4,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 15,
										rating: 2,
										comment: "amazing",
									},
									{
										__typename: "Review",
										id: 16,
										rating: 3,
										comment: "best",
									},
									{
										__typename: "Review",
										id: 7,
										rating: 4.3,
										comment: "besttt",
									},
									{
										__typename: "Review",
										id: 31,
										rating: 1,
										comment: "pasta sucks",
									},
									{
										__typename: "Review",
										id: 32,
										rating: 5,
										comment: "fychfu",
									},
									{
										__typename: "Review",
										id: 39,
										rating: 5,
										comment: "Best food ever",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fetag.jpg?alt=media&token=e1ef0a47-66c8-4c68-a631-9b2339280fc7",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 84,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 84,
						food: {
							__typename: "Food",
							id: 7,
							name: "Dinch Besga",
							price: 80,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fdinch_besga.jpg?alt=media&token=1ecb21cc-e4bf-40c3-a4b6-4397e7a16faa",
							],
							description: "Dinch besga cooked at home and delivered",
							status: "NOT_AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 4,
									rating: 4,
									comment: "Best",
								},
								{
									__typename: "Review",
									id: 14,
									rating: 3,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 7,
									rating: 4.3,
									comment: "besttt",
								},
								{
									__typename: "Review",
									id: 18,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 19,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 20,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 21,
									rating: 3,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 22,
									rating: 5,
									comment: "gooodddd",
								},
								{
									__typename: "Review",
									id: 27,
									rating: 2.5,
									comment: "sample comment",
								},
								{
									__typename: "Review",
									id: 28,
									rating: 5,
									comment: "maybe I can invalidate",
								},
								{
									__typename: "Review",
									id: 29,
									rating: 5,
									comment: "my models not modeling",
								},
								{
									__typename: "Review",
									id: 30,
									rating: 5,
									comment: "sample req cayses",
								},
							],
							createdAt: "2023-06-03T20:26:25.760Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "PREPARED",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 79,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 79,
						food: {
							__typename: "Food",
							id: 1,
							name: "Margarritta Pizza Large",
							price: 250,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fmargarritta_pizza_large.png?alt=media&token=037b1b76-6db6-41cf-8ad2-c0ddcbe5c1c2",
							],
							description: "large sized pizza",
							status: "AVAILABLE",
							variables: [
								{
									__typename: "FoodVariable",
									id: 1,
									name: "Ketchup",
									description: "extra to be added",
									price: 20,
									foodId: 1,
								},
							],
							reviews: [
								{
									__typename: "Review",
									id: 1,
									rating: 4,
									comment: "Delicious",
								},
								{
									__typename: "Review",
									id: 12,
									rating: 2,
									comment: "cool food",
								},
								{
									__typename: "Review",
									id: 40,
									rating: 1,
									comment: "Not bad ",
								},
								{
									__typename: "Review",
									id: 37,
									rating: 3,
									comment: "This is the nicest pizza ive had in a long time.",
								},
							],
							createdAt: "2023-06-03T20:18:50.511Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 3,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "PREPARED",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 81,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 81,
						food: {
							__typename: "Food",
							id: 4,
							name: "Chicken Cutlet",
							price: 175,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fchikcen_cutlet.png?alt=media&token=2fd701da-3c8e-4cf8-a099-ac506459e27f",
							],
							description: "Chicken cutlet cooked with italian style",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 2,
									rating: 2,
									comment: "Best Food Ever",
								},
								{
									__typename: "Review",
									id: 23,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 24,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 25,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 26,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 36,
									rating: 2.5,
									comment: "this is the best food ever",
								},
								{
									__typename: "Review",
									id: 6,
									rating: 3.9,
									comment: "Nice food",
								},
								{
									__typename: "Review",
									id: 10,
									rating: 2,
									comment: "liked it",
								},
							],
							createdAt: "2023-06-03T20:22:24.432Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "PREPARED",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 90,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 90,
						food: {
							__typename: "Food",
							id: 5,
							name: "Fasting Firfir",
							price: 113,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Ffasting_firfir.png?alt=media&token=32897c58-0ec1-46d9-be98-89af9b4b8040",
							],
							description: "Fasting firfir served during fasting time",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 11,
									rating: 4,
									comment: "delicious",
								},
							],
							createdAt: "2023-06-03T20:23:24.043Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "PREPARED",
				deliveredAt: null,
			},
		],
		transactionNumber: "ab4fe32e-a820-40e5-8923-f6f302799e38",
		orderStatus: "IN_PROGRESS",
		booked: false,
		bookedTime: "2023-06-03T19:35:32.903Z",
	},
	{
		__typename: "Order",
		id: "070c5a86-9951-4866-a9b6-281ccdb8cdb5",
		createdAt: "2023-06-04T06:52:26.303Z",
		customer: {
			__typename: "Customer",
			id: 1,
			user: {
				__typename: "User",
				id: 2,
				firstName: "Maruf",
				lastName: "Ahmed",
				email: "maruf@customer.com",
				role: "Customer",
			},
		},
		deliveryType: "DELIVERY",
		paymentStatus: "PENDING",
		totalPrice: 200,
		subOrders: [
			{
				__typename: "OrderDelivery",
				id: 95,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 95,
						food: {
							__typename: "Food",
							id: 4,
							name: "Chicken Cutlet",
							price: 175,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fchikcen_cutlet.png?alt=media&token=2fd701da-3c8e-4cf8-a099-ac506459e27f",
							],
							description: "Chicken cutlet cooked with italian style",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 2,
									rating: 2,
									comment: "Best Food Ever",
								},
								{
									__typename: "Review",
									id: 23,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 24,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 25,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 26,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 36,
									rating: 2.5,
									comment: "this is the best food ever",
								},
								{
									__typename: "Review",
									id: 6,
									rating: 3.9,
									comment: "Nice food",
								},
								{
									__typename: "Review",
									id: 10,
									rating: 2,
									comment: "liked it",
								},
							],
							createdAt: "2023-06-03T20:22:24.432Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 3,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
		],
		transactionNumber: null,
		orderStatus: "AT_HEADQUARTERS",
		booked: false,
		bookedTime: "2023-06-04T06:50:52.884Z",
	},
	{
		__typename: "Order",
		id: "d16d84e4-974a-4fb0-8a5b-9af4f920cdcb",
		createdAt: "2023-06-03T23:42:01.665Z",
		customer: {
			__typename: "Customer",
			id: 1,
			user: {
				__typename: "User",
				id: 2,
				firstName: "Maruf",
				lastName: "Ahmed",
				email: "maruf@customer.com",
				role: "Customer",
			},
		},
		deliveryType: "DELIVERY",
		paymentStatus: "PAID",
		totalPrice: 200,
		subOrders: [
			{
				__typename: "OrderDelivery",
				id: 92,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 92,
						food: {
							__typename: "Food",
							id: 8,
							name: "Gas Light Dulet",
							price: 140,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fgas_light.jpg?alt=media&token=eee0bbc0-3434-4fe8-bd35-05f664e677d4",
							],
							description: "Dulet prepared like gas light tibs",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 17,
									rating: 2,
									comment: "cool",
								},
							],
							createdAt: "2023-06-03T20:27:08.959Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 2,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 93,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 93,
						food: {
							__typename: "Food",
							id: 9,
							name: "Gon Le Gon",
							price: 180,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fgon_le_gon.jpg?alt=media&token=a4b8e467-ec1c-4b39-8325-59701e6f8873",
							],
							description:
								"gon le gon is multiple foods served on a single dish",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 33,
									rating: 5,
									comment: "sucks",
								},
								{
									__typename: "Review",
									id: 34,
									rating: 5,
									comment: "thxhduf",
								},
								{
									__typename: "Review",
									id: 35,
									rating: 5,
									comment: "hey there",
								},
							],
							createdAt: "2023-06-03T20:28:09.441Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 2,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 94,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 94,
						food: {
							__typename: "Food",
							id: 7,
							name: "Dinch Besga",
							price: 80,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fdinch_besga.jpg?alt=media&token=1ecb21cc-e4bf-40c3-a4b6-4397e7a16faa",
							],
							description: "Dinch besga cooked at home and delivered",
							status: "NOT_AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 4,
									rating: 4,
									comment: "Best",
								},
								{
									__typename: "Review",
									id: 14,
									rating: 3,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 7,
									rating: 4.3,
									comment: "besttt",
								},
								{
									__typename: "Review",
									id: 18,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 19,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 20,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 21,
									rating: 3,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 22,
									rating: 5,
									comment: "gooodddd",
								},
								{
									__typename: "Review",
									id: 27,
									rating: 2.5,
									comment: "sample comment",
								},
								{
									__typename: "Review",
									id: 28,
									rating: 5,
									comment: "maybe I can invalidate",
								},
								{
									__typename: "Review",
									id: 29,
									rating: 5,
									comment: "my models not modeling",
								},
								{
									__typename: "Review",
									id: 30,
									rating: 5,
									comment: "sample req cayses",
								},
							],
							createdAt: "2023-06-03T20:26:25.760Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
		],
		transactionNumber: "d16d84e4-974a-4fb0-8a5b-9af4f920cdcb",
		orderStatus: "DELIVERED",
		booked: false,
		bookedTime: "2023-06-03T23:39:50.802Z",
	},
	{
		__typename: "Order",
		id: "14b0a834-357f-4303-90a3-9eeaf6662e88",
		createdAt: "2023-06-11T12:31:25.436Z",
		customer: {
			__typename: "Customer",
			id: 1,
			user: {
				__typename: "User",
				id: 2,
				firstName: "Maruf",
				lastName: "Ahmed",
				email: "maruf@customer.com",
				role: "Customer",
			},
		},
		deliveryType: "DELIVERY",
		paymentStatus: "PAID",
		totalPrice: 200,
		subOrders: [
			{
				__typename: "OrderDelivery",
				id: 99,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 99,
						food: {
							__typename: "Food",
							id: 4,
							name: "Chicken Cutlet",
							price: 175,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fchikcen_cutlet.png?alt=media&token=2fd701da-3c8e-4cf8-a099-ac506459e27f",
							],
							description: "Chicken cutlet cooked with italian style",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 2,
									rating: 2,
									comment: "Best Food Ever",
								},
								{
									__typename: "Review",
									id: 23,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 24,
									rating: 5,
									comment: "test come from my comment and comment ",
								},
								{
									__typename: "Review",
									id: 25,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 26,
									rating: 5,
									comment: "tredffzgxgixgixgixx is a great ",
								},
								{
									__typename: "Review",
									id: 36,
									rating: 2.5,
									comment: "this is the best food ever",
								},
								{
									__typename: "Review",
									id: 6,
									rating: 3.9,
									comment: "Nice food",
								},
								{
									__typename: "Review",
									id: 10,
									rating: 2,
									comment: "liked it",
								},
							],
							createdAt: "2023-06-03T20:22:24.432Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 100,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 100,
						food: {
							__typename: "Food",
							id: 1,
							name: "Margarritta Pizza Large",
							price: 250,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fmargarritta_pizza_large.png?alt=media&token=037b1b76-6db6-41cf-8ad2-c0ddcbe5c1c2",
							],
							description: "large sized pizza",
							status: "AVAILABLE",
							variables: [
								{
									__typename: "FoodVariable",
									id: 1,
									name: "Ketchup",
									description: "extra to be added",
									price: 20,
									foodId: 1,
								},
							],
							reviews: [
								{
									__typename: "Review",
									id: 1,
									rating: 4,
									comment: "Delicious",
								},
								{
									__typename: "Review",
									id: 12,
									rating: 2,
									comment: "cool food",
								},
								{
									__typename: "Review",
									id: 40,
									rating: 1,
									comment: "Not bad ",
								},
								{
									__typename: "Review",
									id: 37,
									rating: 3,
									comment: "This is the nicest pizza ive had in a long time.",
								},
							],
							createdAt: "2023-06-03T20:18:50.511Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 1,
						variables: [
							{
								__typename: "FoodOrderVariable",
								id: 1,
								variable: {
									__typename: "FoodVariable",
									id: 1,
									name: "Ketchup",
									description: "extra to be added",
									price: 20,
									foodId: 1,
								},
								quantity: 2,
							},
						],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
		],
		transactionNumber: "14b0a834-357f-4303-90a3-9eeaf6662e88",
		orderStatus: "IN_PROGRESS",
		booked: false,
		bookedTime: "2023-06-11T12:29:04.378Z",
	},
	{
		__typename: "Order",
		id: "4a757d58-3937-42b8-aacd-3873a56849e4",
		createdAt: "2023-06-04T07:19:20.238Z",
		customer: {
			__typename: "Customer",
			id: 1,
			user: {
				__typename: "User",
				id: 2,
				firstName: "Maruf",
				lastName: "Ahmed",
				email: "maruf@customer.com",
				role: "Customer",
			},
		},
		deliveryType: "DELIVERY",
		paymentStatus: "PENDING",
		totalPrice: 200,
		subOrders: [
			{
				__typename: "OrderDelivery",
				id: 96,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 96,
						food: {
							__typename: "Food",
							id: 7,
							name: "Dinch Besga",
							price: 80,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fdinch_besga.jpg?alt=media&token=1ecb21cc-e4bf-40c3-a4b6-4397e7a16faa",
							],
							description: "Dinch besga cooked at home and delivered",
							status: "NOT_AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 4,
									rating: 4,
									comment: "Best",
								},
								{
									__typename: "Review",
									id: 14,
									rating: 3,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 7,
									rating: 4.3,
									comment: "besttt",
								},
								{
									__typename: "Review",
									id: 18,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 19,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 20,
									rating: 1,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 21,
									rating: 3,
									comment: "Pretty trash NGL",
								},
								{
									__typename: "Review",
									id: 22,
									rating: 5,
									comment: "gooodddd",
								},
								{
									__typename: "Review",
									id: 27,
									rating: 2.5,
									comment: "sample comment",
								},
								{
									__typename: "Review",
									id: 28,
									rating: 5,
									comment: "maybe I can invalidate",
								},
								{
									__typename: "Review",
									id: 29,
									rating: 5,
									comment: "my models not modeling",
								},
								{
									__typename: "Review",
									id: 30,
									rating: 5,
									comment: "sample req cayses",
								},
							],
							createdAt: "2023-06-03T20:26:25.760Z",
							restaurant: {
								__typename: "Restaurant",
								id: 2,
								name: "Mesi",
								address: "6 kilo",
								phone: "0922334455",
								email: "mesi@restaurant.com",
								description: "Home made foods ",
								openingHour: "2023-06-03T08:00:00.000Z",
								closingHour: "2023-06-03T17:00:00.000Z",
								restaurantType: "HOME",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 3,
										rating: 3.1,
										comment: "Amazing food",
									},
									{
										__typename: "Review",
										id: 17,
										rating: 2,
										comment: "cool",
									},
									{
										__typename: "Review",
										id: 18,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 19,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 20,
										rating: 1,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 21,
										rating: 3,
										comment: "Pretty trash NGL",
									},
									{
										__typename: "Review",
										id: 22,
										rating: 5,
										comment: "gooodddd",
									},
									{
										__typename: "Review",
										id: 27,
										rating: 2.5,
										comment: "sample comment",
									},
									{
										__typename: "Review",
										id: 28,
										rating: 5,
										comment: "maybe I can invalidate",
									},
									{
										__typename: "Review",
										id: 29,
										rating: 5,
										comment: "my models not modeling",
									},
									{
										__typename: "Review",
										id: 30,
										rating: 5,
										comment: "sample req cayses",
									},
									{
										__typename: "Review",
										id: 33,
										rating: 5,
										comment: "sucks",
									},
									{
										__typename: "Review",
										id: 34,
										rating: 5,
										comment: "thxhduf",
									},
									{
										__typename: "Review",
										id: 35,
										rating: 5,
										comment: "hey there",
									},
									{
										__typename: "Review",
										id: 11,
										rating: 4,
										comment: "delicious",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fmesi_home.jpg?alt=media&token=ccfa84a4-60fa-4b5a-9a3c-c21043f95a61",
								],
							},
						},
						quantity: 1,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
		],
		transactionNumber: null,
		orderStatus: "IN_PROGRESS",
		booked: false,
		bookedTime: "2023-06-04T07:11:35.177Z",
	},
	{
		__typename: "Order",
		id: "7e935aa4-d6f5-4269-a967-3e01ded6218d",
		createdAt: "2023-06-14T06:51:30.780Z",
		customer: {
			__typename: "Customer",
			id: 1,
			user: {
				__typename: "User",
				id: 2,
				firstName: "Maruf",
				lastName: "Ahmed",
				email: "maruf@customer.com",
				role: "Customer",
			},
		},
		deliveryType: "DELIVERY",
		paymentStatus: "PENDING",
		totalPrice: 200,
		subOrders: [
			{
				__typename: "OrderDelivery",
				id: 101,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 101,
						food: {
							__typename: "Food",
							id: 13,
							name: "Shiro",
							price: 60,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fetag_shiro.jpg?alt=media&token=7db78f00-f541-47a6-9f98-6eaaebbb30c2",
							],
							description:
								"The most famous food in ethiopia! Shiro is prepared with quality",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 13,
									rating: 3,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 9,
									rating: 4,
									comment: "nice",
								},
								{
									__typename: "Review",
									id: 39,
									rating: 5,
									comment: "Best food ever",
								},
							],
							createdAt: "2023-06-03T21:08:03.869Z",
							restaurant: {
								__typename: "Restaurant",
								id: 3,
								name: "Etag Kurs Bet",
								address: "4 kilo",
								phone: "0933445566",
								email: "etag@restaurant.com",
								description: "Small breakfast house",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T12:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 4,
										rating: 4,
										comment: "Best",
									},
									{
										__typename: "Review",
										id: 8,
										rating: 4,
										comment: "Top food",
									},
									{
										__typename: "Review",
										id: 13,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 14,
										rating: 3,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 9,
										rating: 4,
										comment: "nice",
									},
									{
										__typename: "Review",
										id: 15,
										rating: 2,
										comment: "amazing",
									},
									{
										__typename: "Review",
										id: 16,
										rating: 3,
										comment: "best",
									},
									{
										__typename: "Review",
										id: 7,
										rating: 4.3,
										comment: "besttt",
									},
									{
										__typename: "Review",
										id: 31,
										rating: 1,
										comment: "pasta sucks",
									},
									{
										__typename: "Review",
										id: 32,
										rating: 5,
										comment: "fychfu",
									},
									{
										__typename: "Review",
										id: 39,
										rating: 5,
										comment: "Best food ever",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fetag.jpg?alt=media&token=e1ef0a47-66c8-4c68-a631-9b2339280fc7",
								],
							},
						},
						quantity: 3,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
			{
				__typename: "OrderDelivery",
				id: 102,
				orderedFoods: [
					{
						__typename: "OrderFood",
						id: 102,
						food: {
							__typename: "Food",
							id: 3,
							name: "Habesha Combo",
							price: 297,
							images: [
								"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/foods%2Fhabesh_combo.png?alt=media&token=c7b7eab2-46f0-46b9-88f1-8d1170235e9f",
							],
							description: "Special combo of the house",
							status: "AVAILABLE",
							variables: [],
							reviews: [
								{
									__typename: "Review",
									id: 3,
									rating: 3.1,
									comment: "Amazing food",
								},
								{
									__typename: "Review",
									id: 16,
									rating: 3,
									comment: "best",
								},
							],
							createdAt: "2023-06-03T20:21:15.768Z",
							restaurant: {
								__typename: "Restaurant",
								id: 1,
								name: "Restaurant Pizzeria Italian",
								address: "5 kilo",
								phone: "0911223344",
								email: "pizzeria@restaurant.com",
								description: "Italian food restaurant",
								openingHour: "2023-06-03T05:00:00.000Z",
								closingHour: "2023-06-03T19:00:00.000Z",
								restaurantType: "HOTEL",
								status: "OPEN",
								reviews: [
									{
										__typename: "Review",
										id: 2,
										rating: 2,
										comment: "Best Food Ever",
									},
									{
										__typename: "Review",
										id: 5,
										rating: 2,
										comment: "Wow",
									},
									{
										__typename: "Review",
										id: 23,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 24,
										rating: 5,
										comment: "test come from my comment and comment ",
									},
									{
										__typename: "Review",
										id: 25,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 26,
										rating: 5,
										comment: "tredffzgxgixgixgixx is a great ",
									},
									{
										__typename: "Review",
										id: 36,
										rating: 2.5,
										comment: "this is the best food ever",
									},
									{
										__typename: "Review",
										id: 1,
										rating: 4,
										comment: "Delicious",
									},
									{
										__typename: "Review",
										id: 12,
										rating: 2,
										comment: "cool food",
									},
									{
										__typename: "Review",
										id: 6,
										rating: 3.9,
										comment: "Nice food",
									},
									{
										__typename: "Review",
										id: 10,
										rating: 2,
										comment: "liked it",
									},
									{
										__typename: "Review",
										id: 40,
										rating: 1,
										comment: "Not bad ",
									},
									{
										__typename: "Review",
										id: 37,
										rating: 3,
										comment: "This is the nicest pizza ive had in a long time.",
									},
								],
								banner: [
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria2.jpg?alt=media&token=1bac8bc1-4728-44da-a011-7e82e58284a7",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria3.jpg?alt=media&token=5b913964-f1bf-4cc8-9cc7-43aa9f81cd90",
									"https://firebasestorage.googleapis.com/v0/b/kushna-delivery.appspot.com/o/banners%2Fpizzeria4.jpg?alt=media&token=4933df4b-e47c-478c-86cf-77f493b8b0dd",
								],
							},
						},
						quantity: 2,
						variables: [],
					},
				],
				deliveryGuy: {
					__typename: "DeliveryUser",
					id: 1,
					user: {
						__typename: "User",
						id: 4,
					},
				},
				orderStatus: "IN_PROGRESS",
				deliveredAt: null,
			},
		],
		transactionNumber: null,
		orderStatus: "IN_PROGRESS",
		booked: false,
		bookedTime: "2023-06-14T06:44:28.180Z",
	},
];

const mocks = [
	{
		request: {
			query: GET_ORDERS,
		},
		result: {
			data: { getAllOrders: orders },
		},
	},
];

it("should renders orders table", async () => {
	render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<OrderTable />
		</MockedProvider>
	);
	expect(await screen.findByTestId(/table/i)).toBeInTheDocument();

	const customers = await screen.findAllByText(/maruf ahmed/i);

	expect(customers.length).toBeGreaterThan(0);
});
