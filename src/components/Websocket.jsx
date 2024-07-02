import { Affix, Badge } from "antd";
import "./Websocket.css";
import { FaRocketchat } from "react-icons/fa";
import { BsSendArrowUp } from "react-icons/bs";
import React from "react";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Websocket = () => {
  const { messagesList, chat, setChat, sendPrivateMessage, messagesEndRef } =
    useContext(SocketContext);

  return (
    <Affix className="affix-chat">
      {messagesList.length > 0 ? (
        <div className="persistent-chat">
          <h3 className="title-chat">Chat with Admin</h3>
          <div className="list-messages">
            {messagesList.map((items, index) => (
              <div
                className={`line-list-messages ${items.typeUser}`}
                key={index}
              >
                {items.msg}
              </div>
            ))}
            <p className="end-ref" ref={messagesEndRef} />
          </div>
          <form className="form-chat" onSubmit={sendPrivateMessage}>
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
      ) : (
        <Badge count={messagesList.length}>
          <FaRocketchat className="icon-chat"></FaRocketchat>
        </Badge>
      )}
    </Affix>
  );
};

export default Websocket;
