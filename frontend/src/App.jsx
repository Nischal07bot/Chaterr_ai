import React from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { UserProvider } from "./context/user.context";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Screens/dashboard.jsx";
import "remixicon/fonts/remixicon.css";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter> {/* ✅ Only one BrowserRouter */}
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
