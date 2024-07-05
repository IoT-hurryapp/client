import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import useLocalStorage from "./hooks/useLocalStorage";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import { Toaster } from "./shadcn-components/ui/toaster";
function App() {
  const { setItem, getItem, delItem } = useLocalStorage();
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
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
