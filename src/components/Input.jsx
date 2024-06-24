import React from "react";
import "./Input.css";

const Input = ({
  value,
  onChange,
  placeholder,
  leadingIcon,
  trailingIcon,
  characterCounter,
  helperText,
  errorText,
  disabled,
}) => {
  const [focused, setFocused] = React.useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div
      className={`input-container ${
        disabled ? "input-container--disabled" : ""
      }`}
    >
      {leadingIcon && <span className='input-leading-icon'>{leadingIcon}</span>}
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${focused ? "input--focused" : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      {trailingIcon && (
        <span className='input-trailing-icon'>{trailingIcon}</span>
      )}
      {characterCounter && (
        <span className='input-character-counter'>
          {value.length} / {characterCounter}
        </span>
      )}
      {helperText && <span className='input-helper-text'>{helperText}</span>}
      {errorText && <span className='input-error-text'>{errorText}</span>}
    </div>
  );
};

export default Input;
