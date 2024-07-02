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
  const { isAdmin } = useAuth();

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("privateMessage", (msg, typeUser) => {
      setMessagesList((prevMessages) => [...prevMessages, { msg, typeUser }]);
    });

    socket.current.on("userConnect", (data) => {
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
    });

    socket.current.on("adminRoomJoined", (room) => {
      setRoom(room);
    });

    socket.current.on("userDisconnect", (data) => {
      setMessagesList((prevMessages) => [...prevMessages, data]);
    });

    socket.current.on("adminJoinRoom", (room) => {
      socket.current.emit("adminJoinRoom", room);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const joinPrivateRoom = () => {
    socket.current.emit("joinPrivateRoom");
  };

  const adminJoinRandomRoom = () => {
    socket.current.emit("adminJoinRandomRoom");
  };

  const userDisconnect = () => {
    const typeUser = isAdmin ? "Admin" : "User";
    socket.current.emit("userDisconnect", { room, typeUser });
  };

  const sendPrivateMessage = (e) => {
    e.preventDefault();
    if (room) {
      const typeUser = isAdmin ? "Admin" : "User";
      socket.current.emit("privateMessage", { room, msg: chat, typeUser });
      setChat("");
    }
  };

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
  };

  return (
    <SocketContext.Provider value={SocketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};
