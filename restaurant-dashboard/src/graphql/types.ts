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
