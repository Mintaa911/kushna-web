import { ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RequireAuth = ({ children }: { children: ReactNode }) => {
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();

	if (!token) {
		navigate("/login");
	}

	return <>{children}</>;
};

export default RequireAuth;
