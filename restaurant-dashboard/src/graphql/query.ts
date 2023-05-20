import { gql } from "@apollo/client";

export const GET_Foods = gql`
	query Foods {
		foods {
			id
			name
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
