export type Foods = {
	id: string;
	name: string;
	description: string;
	images: Array<string>;
	price: Float32Array;
	status: string;
	variables: {
		id: string;
		name: string;
		description: string;
		price: Float32Array;
	};
};
