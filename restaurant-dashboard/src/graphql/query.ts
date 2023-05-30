import { gql } from "@apollo/client";

export const GET_Foods_From_Restaurant = gql`
	query FoodFromRestaurant($restaurantId: Int!) {
		foodFromRestaurant(restaurantId: $restaurantId) {
			id
			name
			restaurantId
			description
			images
			price
			status
			variables {
				id
				name
				description
				price
			}
			reviews {
				id
				rating
				comment
				reviewer {
					firstName
					lastName
				}
			}
		}
	}
`;

export const GET_ORDER_HISTORY = gql`
	query GetAllOrders {
		getAllOrders {
			id
			createdAt
			customer {
				id
				user {
					firstName
					lastName
				}
			}
			deliveryType
			paymentStatus
			deliveryPerson {
				id
			}
			totalPrice
			destination {
				id
				latitude
				longitude
			}
			headQuarter {
				id
				name
				location {
					id
					latitude
					longitude
				}
			}
			subOrders {
				id
			}
			currentLocation {
				id
				latitude
				longitude
			}
			transactionNumber
			orderStatus
		}
	}
`;

export const GET_MANAGER = gql`
	query Query($managerId: Int!) {
		manager(id: $managerId) {
			id
			restaurant {
				id
			}
			user {
				firstName
				lastName
			}
		}
	}
`;
