import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
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

export const GET_ORDERS = gql`
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

export const GET_USERS = gql`
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
