import { gql } from "@apollo/client";

export const CREATE_FOOD = gql`
	mutation Mutation($input: CreateFoodInput!) {
		createFood(input: $input) {
			id
			name
			description
			images
			price
			restaurantId
			status
			variables {
				id
				name
				description
				price
			}
			createdAt
		}
	}
`;

export const LOGIN_USER = gql`
	mutation Mutation($input: LoginInput!) {
		login(input: $input) {
			id
			role
			token
		}
	}
`;

export const CREATE_COUPON = gql`
	mutation CreateCoupon($input: CouponInput!) {
		createCoupon(input: $input) {
			numberOfTimesUsed
			isActive
			code
			discount
		}
	}
`;
