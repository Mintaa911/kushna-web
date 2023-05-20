export interface RestaurantDataType {
	id: number;
	name: string;
	address: string;
	phone: string;
	email: string;
	openingHour: string;
	closingHour: string;
	description: string;
	restaurantType: string;
	banner: [];
	status: string;
}

export interface UserDataType {
	id: string;
	name: {
		first: string;
		last: string;
	};
	gender: string;
	email: string;
	role: string;
}
