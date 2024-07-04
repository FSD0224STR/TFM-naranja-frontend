import { Affix, Badge } from "antd";
import "./Websocket.css";
import { FaRocketchat } from "react-icons/fa";
import { BsSendArrowUp } from "react-icons/bs";
import React from "react";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const Websocket = () => {
  const {
    messagesList,
    setMessagesList,
    chat,
    setChat,
    sendPrivateMessage,
    messagesEndRef,
    isUserConnect,
    adminJoinRandomRoom,
  } = useContext(SocketContext);

  const handleActiveAdmin = () => {
    adminJoinRandomRoom();
    setMessagesList("");
  };

  return (
    <Affix className="affix-chat">
      {/* Se abre el chat cuando están en linea el usuario y el admin, mientras no hay conexion entre los dos tenemos un icono*/}
      {messagesList.length > 0 ? (
        <div className="persistent-chat">
          <h3 className="title-chat">Chat</h3>
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
          {isUserConnect ? (
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
          ) : (
            <button className="btn-delete-room" onClick={handleActiveAdmin}>
              Delete Room
            </button>
          )}
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
