import {  Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import React, { useState } from "react";

function App() {

  const [authenticated, setAuthenticated] = useState(false)

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  }

  const handleLogout = () => {
    setAuthenticated(false);
  }

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {authenticated ? (
            <Route path="/" element={<DashboardPage />} />
          ) : (
            <Route
              path="/"
              element={
                <Navigate
                  to="/login"
                  replace
                  state={{ from: window.location.pathname }}
                />
              }
            />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
