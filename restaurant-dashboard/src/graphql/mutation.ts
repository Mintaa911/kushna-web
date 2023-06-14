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

export const CREATE_FOOD_VARIABLE = gql`
	mutation CreateFoodVariable($input: FoodVariableInput!) {
		createFoodVariable(input: $input) {
			id
			name
			description
			price
			foodId
		}
	}
`;

export const DELETE_FOOD = gql`
	mutation Mutation($deleteFoodId: Int!) {
		deleteFood(id: $deleteFoodId) {
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
				foodId
			}
			reviews {
				id
				rating
				comment
			}
			createdAt
		}
	}
`;

export const UPDATE_SUBORDER_STATUS = gql`
	mutation Mutation($updateSuborderStatusId: Int!, $status: OrderStatus!) {
		updateSuborderStatus(id: $updateSuborderStatusId, status: $status) {
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
						description
						price
						images
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
						firstName
						lastName
						email
						role
					}
				}
				orderStatus
			}
			orderStatus
		}
	}
`;

export const UPDATED_FOOD = gql`
	mutation UpdateFood($input: UpdateFoodInput!, $foodId: Int!) {
		updateFood(input: $input, foodId: $foodId) {
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
