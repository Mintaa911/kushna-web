import { useEffect, useState } from "react";

export default function useBreakpoint() {
	const [breakpoint, setBreakpoint] = useState(window.innerWidth);
	const resize = () => {
		setBreakpoint(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	return breakpoint;
}
