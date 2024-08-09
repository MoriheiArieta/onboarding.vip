import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyMagicLink = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This component will now only handle errors
    // Successful verification will be redirected by the server
    navigate("/dashboard");
  }, [navigate]);

  return <div>Verifying your login...</div>;
};

export default VerifyMagicLink;
