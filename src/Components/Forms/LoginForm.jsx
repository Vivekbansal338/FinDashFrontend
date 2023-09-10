import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/AuthSlice.js";
import { toast } from "react-toastify";
import "./LoginForm.css";

const LoginForm = ({ setNewUser }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginformvalid, setloginformvalid] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setloginformvalid(true);
    } else {
      setloginformvalid(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter all fields");
      return;
    }

    try {
      const data = await dispatch(login(email, password));
      if (data.message === "success") {
        toast.success("Login successful");
      }
      if (data.message === "fail") {
        throw new Error("Login failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleNewUser = () => {
    setNewUser(true);
  };

  return (
    <div className="login-form">
      {/* <h2>Login</h2> */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-container-login">
        <button
          onClick={handleLogin}
          style={{ backgroundColor: "var(--success-color)", color: "white" }}
          disabled={!loginformvalid}
        >
          Login
        </button>
        <button
          onClick={handleNewUser}
          style={{ backgroundColor: "var(--purple-color)", color: "white" }}
        >
          New User?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
