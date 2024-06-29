import { Affix } from "antd";
import "./Websocket.css";
import { FaRocketchat } from "react-icons/fa";
import { BsSendArrowUp } from "react-icons/bs";
import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Websocket = () => {
  const { messagesList, chat, setChat, sendMessage, messagesEndRef } =
    useContext(SocketContext);

  return (
    <Affix className="affix-chat">
      <div className="persistent-chat">
        <h3 className="title-chat">Chat with Admin</h3>
        <div className="list-messages">
          {messagesList.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
          <p className="end-ref" ref={messagesEndRef} />
        </div>
        {/* <p className="status-messages"></p> */}
        <form className="form-chat" onSubmit={sendMessage}>
          <input
            className="input-chat"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button className="button-chat">
            <BsSendArrowUp />
          </button>
        </form>
      </div>
    </Affix>
  );
};

export default Websocket;
