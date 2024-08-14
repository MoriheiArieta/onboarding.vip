import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, checkAuthStatus, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    let pollInterval;

    const checkAuth = async () => {
      console.log("Polling for auth status...");
      await checkAuthStatus();
    };

    if (isLoading) {
      pollInterval = setInterval(checkAuth, 2000); // Check every 2 seconds
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isLoading, checkAuthStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authentication successful, redirecting...");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    if (!email) {
      setMessage("Email is required");
      setIsLoading(false);
      return;
    }
    try {
      const response = await login(email);
      setMessage(response.message);
      // Start polling for authentication status
      setTimeout(() => {
        setIsLoading(false);
        setMessage("Login timeout. Please try again.");
      }, 120000); // Stop polling after 2 minutes
    } catch (err) {
      setMessage("Login failed. Please try again.");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-3 text-center">Login</h1>
      <div className="flex flex-col border-2 border-[#058689] w-fit rounded-xl p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="email" className="text-xl mr-4 text-gray-500">
            Email:
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 rounded-xl"
            disabled={isLoading}
          />
        </div>
        <button
          className="p-2 bg-[#058689] text-white rounded-xl"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Waiting for verification..." : "Submit"}
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
      {isLoading && (
        <p className="mt-4 text-center">
          Please check your email and click the magic link to complete login.
          This window will close automatically upon successful login.
        </p>
      )}
    </div>
  );
};

export default Login;
