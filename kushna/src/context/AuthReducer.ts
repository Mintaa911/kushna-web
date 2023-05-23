//
type ACTION_TYPE = { type: string; payload: any };

const AuthReducer = ({
	state,
	action,
}: {
	state: any;
	action: ACTION_TYPE;
}) => {
	switch (action.type) {
		case "LOGIN": {
			return {
				currentUser: action.payload,
			};
		}
		case "LOGOUT": {
			return {
				currentUser: null,
			};
		}
		default:
			return state;
	}
};

export default AuthReducer;
