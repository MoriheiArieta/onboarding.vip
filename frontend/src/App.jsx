// src/App.jsx

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Dashboard, Login } from "./pages";
import Layout from "./Layout.jsx";
import AuthWrapper from "./components/AuthWrapper";
import AuthenticatedWrapper from "./components/AuthenticatedWrapper";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <AuthenticatedWrapper>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <AuthWrapper>
                  <Dashboard />
                </AuthWrapper>
              }
            />
            {/* Add other protected routes here in the same way */}

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AuthenticatedWrapper>
      </Layout>
    </AuthProvider>
  );
};

export default App;
