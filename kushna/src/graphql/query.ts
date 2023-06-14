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

export const GET_FOODS = gql`
	query Foods {
		foods {
			id
			name
			reviews {
				id
				rating
			}
		}
	}
`;

export const GET_RESTAURANTS_WITH_COUPON = gql`
	query Restaurants {
		restaurants {
			id
			name
			cupons {
				numberOfTimesUsed
				isActive
				code
				discount
			}
		}
	}
`;
