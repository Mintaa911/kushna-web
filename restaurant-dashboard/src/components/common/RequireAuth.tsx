import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RequireAuth = ({ children }: { children: ReactNode }) => {
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!token || Object.keys(token).length === 0) {
			navigate("/login");
		}
	});

	return <>{children}</>;
};

export default RequireAuth;
