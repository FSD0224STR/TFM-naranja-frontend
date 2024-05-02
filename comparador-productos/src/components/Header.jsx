import React from "react";
import "./Header.css";

const {Header} = Layout;

const Header () => {
    return (<div className="header" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      items={items}
      style={{
        flex: 1,
        minWidth: 0,
      }}
    />)
}

export default {Header}