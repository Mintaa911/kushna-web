import React from "react";
import { Card, Rate } from "antd";
import { useLocation } from "react-router-dom";

const FoodDetailPage = () => {
	const { state } = useLocation();
	console.log(state);
	const averageRating =
		state.reviews.length > 0
			? state.reviews
					.map((review: any) => review?.rating)
					.reduce((prev: number, next: number) => prev + next)
			: 0;

	return (
		<div>
			<Card title='Food Detail' style={{ width: "80%", margin: "auto" }}>
				<img
					src={state.images[0]}
					alt='Food'
					style={{ width: "50%", height: "auto" }}
				/>

				<p>Name: {state.name}</p>
				{/* <p>Type: Italian</p> */}
				<p>Price: ${state.price}</p>
				<p>Ingredients: Cheese, Tomato, Pepperoni</p>
				<p>Description: {state.description}</p>
				<div style={{ marginTop: 16 }}>
					<h3>Average Rating</h3>
					<Rate disabled allowHalf defaultValue={averageRating} />
					<span style={{ marginLeft: 8 }}>{averageRating.toFixed(1)}</span>
				</div>
				<div style={{ marginTop: 16 }}>
					<h3>Reviews</h3>
					{state.reviews.length > 0
						? state.reviews.map((review: any) => {
								return (
									<div key={review.id}>
										<p>
											{review.reviewer.firstName} {review.reviewer.lastName}
										</p>
										<p>{state.review.description}</p>
										<Rate disabled defaultValue={state.review.rating} />
									</div>
								);
						  })
						: "No Reviews"}
				</div>
			</Card>
		</div>
	);
};

export default FoodDetailPage;
