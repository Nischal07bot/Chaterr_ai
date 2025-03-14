import React from "react";
import "./index.css";
<index className="css"></index>
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/user.context";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter> {/* ✅ Only one BrowserRouter */}
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
