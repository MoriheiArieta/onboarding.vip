import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VerifyMagicLink = () => {
  const { checkAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Verifying your login...");

  useEffect(() => {
    const verifyToken = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");

      if (token) {
        try {
          const response = await fetch(
            `https://glenn.onboarding.vip/verify?token=${token}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();

          if (response.ok) {
            await checkAuthStatus();
            setMessage("Verification successful. Redirecting to dashboard...");
            setTimeout(() => navigate("/dashboard"), 2000);
          } else {
            setMessage(
              data.message || "Verification failed. Please try again."
            );
            setTimeout(() => navigate("/login"), 2000);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          setMessage("An error occurred. Please try again.");
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        setMessage("No token provided. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    verifyToken();
  }, [location, navigate, checkAuthStatus]);

  return <div>{message}</div>;
};

export default VerifyMagicLink;
