import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apiService/userApi";
import { message } from "antd";

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
      message.error("No puedo verificar el usuario");
    } else {
      setUserData(() => response.data);
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
    setIsAdmin(false);
    navigate("/login");
  };

  const getTokenData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return decodeToken(token);
    }
    return null;
  };

  const decodeToken = (token) => {
    try {
      // Divide el token en sus tres partes (header, payload, signature) y decodifica la parte del payload de Base64 a un objeto JSON.
      // Usa 'atob' para decodificar la cadena Base64 y convierte el resultado a JSON.
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      message.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const data = getTokenData();
    if (data) {
      getDataUser(data.email).then(() => {
        setIsAdmin(userData.isAdmin);
      });
    }
  }, []);

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
export { AuthContext };
