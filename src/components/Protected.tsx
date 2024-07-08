import { useAppState } from "../utils/mobx/state";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export const Protected = observer(function ({
	children,
	fallback = "Loading...",
	error,
}: {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	error?: React.ReactNode;
}) {
	const app = useAppState();
	useEffect(() => {
		if (app.auth.user || app.auth.fetching) return;
		(async () => {
			try {
				let { data: user } = await axios.get(
					import.meta.env.VITE_API_URL + "/user"
				);
				app.auth.setUser(user);
				app.auth.loading = false;
			} catch (err) {
				app.auth.loading = false;
				console.log(err);
			}
		})();
	}, []);
	if (app.auth.loading) return fallback;
	if (app.auth.user == null) return error || fallback;
	return children;
});
