import React from "react";
import "./Button.css";

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      className={`button ${disabled ? "button--disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
