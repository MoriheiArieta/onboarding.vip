import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const api = axios.create({
    baseURL: "https://glenn.onboarding.vip",
    withCredentials: true,
  });

  const checkAuthStatus = async () => {
    try {
      console.log("Checking auth status...");
      const response = await api.get("/check-auth");
      console.log("Auth status response:", response.data);
      setIsAuthenticated(response.data.isAuthenticated);
      return response.data.isAuthenticated;
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email) => {
    try {
      const response = await api.post("/login", { email });
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
