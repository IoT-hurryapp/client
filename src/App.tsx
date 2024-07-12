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
import PublicLocation from "./pages/location/public";
import NotFound from "./components/NotFound";
function App() {
  const user = getUserQuery();
  if (user.isLoading) {
    return <Loader />;
  }
  const isLoggedIn = !!user.data;

  return (
    <ThemeProvider defaultTheme="light">
      <Header
        username={user.data?.username || ""}
        notifications={user.data?.notifications || []}
      />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/locations"
          element={isLoggedIn ? <Locations /> : <Navigate to="/login" />}
        />
        <Route path="/locations/public" element={<PublicLocations />} />
        <Route path="/locations/public/:id" element={<PublicLocation />} />
        <Route
          path="/locations/:id"
          element={isLoggedIn ? <Location /> : <Navigate to="/login" />}
        />
        <Route path="/">
          <Route
            path="login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/locations" />}
          />
          <Route
            path="register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/locations" />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
