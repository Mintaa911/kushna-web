import { gql } from "@apollo/client";

export const CREATE_FOOD = gql`
	mutation Mutation($input: CreateFoodInput!) {
		createFood(input: $input) {
			id
			name
			description
			price
			images
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
					id
					firstName
					lastName
					email
					role
				}
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
