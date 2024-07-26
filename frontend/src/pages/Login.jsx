import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await login(email);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
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
          />
        </div>
        <button
          className="p-2 bg-[#058689] text-white rounded-xl"
          onClick={handleLogin}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
