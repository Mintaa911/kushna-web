import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Result
				status='500'
				title='500'
				subTitle='Oops! Something went wrong.'
				extra={
					<Button
						onClick={() => {
							navigate(0);
						}}
					>
						Reload
					</Button>
				}
			/>
		</div>
	);
};

export default ErrorPage;
