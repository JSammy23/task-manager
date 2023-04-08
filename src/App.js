import {  Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./services/auth";

function App() {

  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
