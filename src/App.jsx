/*import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}*/

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import { login, register } from "./apiService/userApi";
import Password from "antd/es/input/Password";
export default function App() {
  /*const handleLogin = async (username, password) => {
    const response = await login(username, password);
    if (response.error) {
      console.error("Error al iniciar sesión:", response.error);
    } else {
      console.log("Inicio de sesion exitoso:", response.data);
    }
  };*/
  /*const handleRegister = async (userData) => {
    const response = await register(userData);
    if (response.error) {
      console.error("Error al registrar usuario:", response.error);
    } else {
      console.log("Usuario registrado con exito:", response.data);
    }
  };*/
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </>
  );
}
