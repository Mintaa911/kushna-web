export type Foods = {
	id: number;
	name: string;
	description: string;
	images: Array<string>;
	price: number;
	status: string;
	variables: {
		id: string;
		name: string;
		description: string;
		price: number;
	};
	reviews: [Review];
};

type Review = {
	id: string;
	rating: number;
	comment: string;
};

type Manager = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
};

type Restaurant = {
	id: number;
	closingHour: string;
	coupons: Object;
	description: Object;
	email: string;
	name: string;
	openingHour: string;
	phone: string;
	restaurantType: string;
	status: string;
	banner: Array<string>;
};
