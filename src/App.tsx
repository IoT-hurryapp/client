import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUserQuery } from "./services/queries/user";
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Home from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Locations from "./pages/location";
import Location from "./pages/location";
import Footer from "./components/Footer";
function App() {
  const user = getUserQuery();
  if (user.isLoading) {
    return <Loader />;
  }
  const isLoggedIn = !!user.data;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Toaster />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Locations /> : <Home />} />
        <Route
          path="/locations"
          element={!isLoggedIn ? <Navigate to={"/"} /> : <Locations />}
        />
        <Route path="/auth">
          <Route
            path="login"
            element={isLoggedIn ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="signup"
            element={isLoggedIn ? <Navigate to={"/"} /> : <Register />}
          />
        </Route>
        <Route
          path="/location/:id"
          element={!isLoggedIn ? <Navigate to={"/"} /> : <Location />}
        />
      </Routes>
    </>
  );
}

export default App;
