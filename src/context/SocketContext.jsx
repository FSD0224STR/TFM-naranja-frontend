import { Affix } from "antd";
import "../components/Websocket.css";
import { FaRocketchat } from "react-icons/fa";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export const SocketContextProvider = ({ children }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [chat, setChat] = useState("");
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("message", (msg) => {
      setMessagesList((prevMessages) => [...prevMessages, msg]);
    });

    socket.current.on("userConnect", (data) => {
      setMessagesList((prevMessages) => [...prevMessages, data.msg]);
    });

    socket.current.on("userAdmin", (data) => {
      setMessagesList((prevMessages) => [...prevMessages, data.msg]);
    });

    socket.current.on("userDisconnect", (data) => {
      setMessagesList((prevMessages) => [...prevMessages, data.msg]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.current.emit("message", chat);
    setChat("");
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
    sendMessage,
    messagesEndRef,
  };

  return (
    <SocketContext.Provider value={SocketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};
