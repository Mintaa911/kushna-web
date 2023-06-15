import RestaurantCard from "../components/profile/RestaurantCard";
import AdminCard from "../components/profile/AdminCard";
import CouponTable from "../components/profile/CouponTable";

const ProfilePage = () => {
	return (
		<div>
			<AdminCard />
			<RestaurantCard />
		</div>
	);
};

export default ProfilePage;
