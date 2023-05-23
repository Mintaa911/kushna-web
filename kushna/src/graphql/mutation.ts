import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation Mutation($input: LoginInput!) {
		login(input: $input) {
			id
			role
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

export const Create_User = gql`
	mutation CreateUser($input: UserRegisterInput!) {
		createUser(input: $input) {
			id
			firstName
			lastName
			email
			role
		}
	}
`;
