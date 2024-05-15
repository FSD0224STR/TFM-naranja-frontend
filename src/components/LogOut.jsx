import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default LogOut;
