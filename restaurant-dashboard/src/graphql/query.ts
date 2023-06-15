import { gql } from "@apollo/client";

export const GET_Foods_From_Restaurant = gql`
	query FoodFromRestaurant($restaurantId: Int!) {
		foodFromRestaurant(restaurantId: $restaurantId) {
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
				reviewer {
					id
					firstName
					lastName
					email
					role
				}
				comment
			}
			createdAt
		}
	}
`;

export const GET_ORDER_HISTORY = gql`
	query Query {
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
				email
			}
		}
	}
`;

export const GET_RESTAURANT_WITH_DETAIL = gql`
	query Restaurant($restaurantId: Int!) {
		restaurant(id: $restaurantId) {
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
			cupons {
				numberOfTimesUsed
				isActive
				code
				discount
			}
			foods {
				id
			}
		}
	}
`;
