import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { register } from "../apiService/userApi";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import Button from "./Button";
//import Captcha from "./Captcha";
import "./Register.css";
import Breadcrumb from "./BreadCrumb";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  // const [isHuman, setIsHuman] = useState(false);
  const navigate = useNavigate();
  // const [componentDisabled, setComponentDisabled] = useState(true);

  const validateEmail = (email) => {
    // ^[a-zA-Z0-9._%+-]+ --> Valida la parte local del correo electrónico antes del @.
    // @[a-zA-Z0-9.-]+    --> Valida el dominio del correo electrónico después del @.
    // \.[a-zA-Z]{2,}$    --> Valida la parte del TLD (dominio de nivel superior).
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleSubmit = () => {
    if (!isEmailValid) {
      message.error("Please enter a valid email address.");
      return;
    }
    handleRegister(name, lastName, email, password);
    message.success("Registration successful!");
  };

  const handleRegister = async (email, password, firstname, lastname) => {
    const response = await register(email, password, firstname, lastname);
    // if (!isHuman) {
    //   console.error("Por favor, complete el CAPTCHA");
    //   return;
    // }
    if (response.error) {
      console.error("Error al registrar usuario:", response.error);
    } else {
      const token = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  /*const handleCaptchaChange = (value) => {
    setIsHuman(value);
  };*/

  return (
    <>
      <Breadcrumb title="register" />
      <div className="container">
        <Form
          name="form__container"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          // disabled={componentDisabled}
          // style={{
          //   maxWidth: 600,
          // }}
        >
          <h1>Create a user account</h1>
          <br />
          <Form.Item label="">
            <Input
              value={name}
              placeholder="First Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="">
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label=""
            validateStatus={!isEmailValid ? "error" : ""}
            help={!isEmailValid ? "Please enter a valid email address." : ""}
          >
            <Input
              placeholder="Email"
              value={email}
              type="email"
              onChange={handleEmailChange}
            />
          </Form.Item>

          <Form.Item label="">
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {/* <Form.Item label="">
            <Captcha onChange={handleCaptchaChange} />
          </Form.Item> */}

          <Form.Item label="">
            <Button color="primary" id="Register_btn" onClick={handleSubmit}>
              Register now!
            </Button>
          </Form.Item>

          <p>
            Do you already have an account ID?{" "}
            <Link to="/login" className="forget-password">
              Login
            </Link>{" "}
          </p>
          <br />
        </Form>
      </div>
    </>
  );
};

export default Register;
