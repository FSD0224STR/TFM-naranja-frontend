import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apiService/userApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("token") ? true : false;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getDataUser = async (email) => {
    const response = await getUser(email);

    if (response.error) {
      console.error("No puedo verificar el usuario");
    } else {
      return response.data;
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isAdmin,
        getDataUser,
        setIsAdmin,
        userData,
        setUserData,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
