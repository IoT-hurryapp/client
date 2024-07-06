import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import useLocalStorage from "./hooks/useLocalStorage";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import { Toaster } from "./shadcn-components/ui/toaster";
import Locations from "./pages/Locations";
import Location from "./pages/Location";
import { getUserQuery } from "./services/queries/user";
import { Loader } from "lucide-react";
function App() {
  const { setItem, getItem, delItem } = useLocalStorage();
  const user = getUserQuery();
  useEffect(() => {
    const theme = getItem("theme");
    if (
      theme === "dark" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  if (user.isLoading) {
    return <Loader />;
  }
  const isLoggedIn = !!user.data;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
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
          element={isLoggedIn ? <Navigate to={"/"} /> : <Location />}
        />
      </Routes>
    </>
  );
}

export default App;
