import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAdmin } from "../apiService/userApi";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const getVerifyAdmin = async (email) => {
    const response = await verifyAdmin(email);

    if (response.error) {
      console.error("No puedo verificar el administrador");
    } else {
      return response.data;
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isAdmin, getVerifyAdmin, setIsAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
