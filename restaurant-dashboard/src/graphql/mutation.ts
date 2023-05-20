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
