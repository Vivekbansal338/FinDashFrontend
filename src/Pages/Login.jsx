import React, { useState } from "react";
import LoginForm from "../Components/Forms/LoginForm.jsx";
import SignupForm from "../Components/Forms/SignupForm.jsx";
import logo from "../assets/logo.jpg";
import "./Login.css";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <div className="loginpage">
      <div className="loginpagetop">
        <h1>FinDash</h1>
        <img src={logo} alt="login-logo" className="login-logo" />

        {newUser ? (
          <SignupForm setNewUser={setNewUser} />
        ) : (
          <LoginForm setNewUser={setNewUser} />
        )}
      </div>
    </div>
  );
};

export default Login;
