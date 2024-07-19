import "../components/Websocket.css";
import { FaRocketchat } from "react-icons/fa";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/LogContext";

export const SocketContext = React.createContext();

export const SocketContextProvider = ({ children }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [chat, setChat] = useState("");
  const [room, setRoom] = useState(null);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const { isAdmin, userData } = useAuth();
  const [isUserConnect, setIsUserConnect] = useState(true);
  const firstname = userData.firstname;

  // Eventos en espera a ser llamados desde el backend para actualizar el listado de mensajes con los nuevos que llegan
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND;
    socket.current = io(backendUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    socket.current.on("privateMessage", (msg, typeUser) => {
      setMessagesList((prevMessages) => [...prevMessages, { msg, typeUser }]);
    });

    socket.current.on("userConnect", (data) => {
      setIsUserConnect(true);
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { msg: data.msg, typeUser: "User" },
      ]);
    });

    socket.current.on("adminConnect", (data) => {
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { msg: data.msg, typeUser: "Admin" },
      ]);
    });

    socket.current.on("roomJoined", (room) => {
      setRoom(room);
      setIsUserConnect(true);
    });

    socket.current.on("adminRoomJoined", (room) => {
      setRoom(room);
      setIsUserConnect(true);
    });

    socket.current.on("userDisconnect", (data) => {
      if (isAdmin) {
        setIsUserConnect(true);
      } else {
        setIsUserConnect(false);
      }
      setMessagesList((prevMessages) => [...prevMessages, data]);
    });

    socket.current.on("adminJoinRoom", (room) => {
      setIsUserConnect(true);
      socket.current.emit("adminJoinRoom", room, firstname);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Funcion para que el usuario se una a sala privada de socket
  const joinPrivateRoom = () => {
    setIsUserConnect(true);
    socket.current.emit("joinPrivateRoom");
  };

  // Funcion para emitir un mensaje para que un administrador se una a una sala al azar o se quede en espera para cuando se conecte un user
  const adminJoinRandomRoom = (firstname) => {
    setIsUserConnect(true);
    socket.current.emit("adminJoinRandomRoom", firstname);
  };

  const userDisconnect = () => {
    let typeUser;
    if (isAdmin) {
      typeUser = "Admin";
      setIsUserConnect(true);
    } else {
      typeUser = "User";
      setIsUserConnect(false);
    }
    socket.current.emit("userDisconnect", { room, typeUser, firstname });
  };

  const sendPrivateMessage = (e) => {
    e.preventDefault();
    if (room) {
      // Comprobamos quien emite el mensaje para tratamiento posterior en el chat y poder estilar diferente
      const typeUser = isAdmin ? "Admin" : "User";
      socket.current.emit("privateMessage", { room, msg: chat, typeUser });
      setChat("");
    }
  };

  // Con cada mensaje escrito el texto automaticamente baja hasta el final para ver el ultimo mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  const SocketContextValue = {
    socket,
    messagesList,
    setMessagesList,
    chat,
    setChat,
    messagesEndRef,
    joinPrivateRoom,
    sendPrivateMessage,
    adminJoinRandomRoom,
    userDisconnect,
    isUserConnect,
    setIsUserConnect,
  };

  return (
    <SocketContext.Provider value={SocketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};
