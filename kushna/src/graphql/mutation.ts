import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation Mutation($input: LoginInput!) {
		login(input: $input) {
			id
			role
			expiresAt
			token
		}
	}
`;

export const CREATE_RESTAURANT = gql`
	mutation Mutation($input: RestaurantInput!) {
		createRestaurant(input: $input) {
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
			banner
		}
	}
`;
