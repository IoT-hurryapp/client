import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUserQuery } from "./services/queries/user";
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Locations from "./pages/locations";
import Location from "./pages/location";
import Footer from "./components/Footer";
import PublicLocations from "./pages/locations/public";
function App() {
	const user = getUserQuery();
	if (user.isLoading) {
		return <Loader />;
	}
	const isLoggedIn = !!user.data;
	return (
		<ThemeProvider defaultTheme="light">
			<Header username={user.data?.username || ""} notifications={user.data?.notifications || []} />
			<Toaster />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/locations" element={<Locations />} />
					<Route
						path="/locations/public"
						element={<PublicLocations />}
					/>
					<Route path="/locations/:id" element={<Location />} />
					<Route path="/">
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Route>
				</Routes>
			</Suspense>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
