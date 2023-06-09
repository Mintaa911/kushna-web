import React from "react";
import { Card, Rate } from "antd";
import { useLocation } from "react-router-dom";

const FoodDetailPage = () => {
	const { state } = useLocation();
	const averageRating =
		state.reviews.length > 0
			? state.reviews
					.map((review: any) => review?.rating)
					.reduce((prev: number, next: number) => prev + next)
			: 0;

	return (
		<div>
			<Card title='Food Detail' style={{}}>
				<img
					src={state.images[0]}
					alt='Food'
					style={{ width: "400px", height: "400px" }}
				/>

				<p>Name: {state.name}</p>
				<p>Price: ${state.price}</p>

				<p>
					Variables:{" "}
					{state.variables.length > 0
						? state.variables.map((variable: any) => {
								return <span key={variable.id}>{variable.name}</span>;
						  })
						: ""}
				</p>
				<p>Description: {state.description}</p>
				<div style={{ marginTop: 16 }}>
					<h3>Average Rating</h3>
					<Rate disabled allowHalf defaultValue={averageRating} />
					<span style={{ marginLeft: 8 }}>
						{averageRating.toFixed(1) > 0
							? averageRating.toFixed(1) / state.reviews.length
							: 0}
					</span>
				</div>
				<div style={{ marginTop: 16 }}>
					<h3>Reviews</h3>
					{state.reviews.length > 0
						? state.reviews.map((review: any) => {
								return (
									<div key={review.id}>
										<h4>
											{review.reviewer.firstName} {review.reviewer.lastName}
										</h4>
										<p>{review.comment}</p>
										<Rate disabled defaultValue={review.rating} />
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
