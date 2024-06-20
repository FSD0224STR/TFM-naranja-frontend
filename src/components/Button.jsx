import React from "react";
import "./Button.css";

const Button = ({ children, onClick, disabled, color }) => {
  return (
    <button
      className={`button ${color} ${disabled ? "button--disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
