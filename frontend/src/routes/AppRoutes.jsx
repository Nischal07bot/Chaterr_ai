import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ Removed BrowserRouter
import Login from "../Screens/login.jsx";
import Register from "../Screens/register.jsx";
import Home from "../Screens/home.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<div>Logout</div>} />
    </Routes>
  );
};

export default AppRoutes;
