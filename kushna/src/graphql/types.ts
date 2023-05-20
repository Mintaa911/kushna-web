export type RestaurantInput = {
	name: string;
	address: string;
	phone: string;
	email: string;
	openingHour: Date;
	closingHour: Date;
	description: string;
	restaurantType: string;
};

export type LoginInput = {
	email: string;
	password: string;
};
