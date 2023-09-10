import React, { useState, useEffect } from "react";
import { signup } from "../../Redux/AuthSlice.js";
import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCheckUsername, useCheckEmail } from "../../Hooks/AuthHooks.js";
import "./SignupForm.css";

const SignupForm = ({ setNewUser }) => {
  const [username, setUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [emailvaild, setEmailValid] = useState(false);
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordvalid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [signupformvalid, setSignupformvalid] = useState(false);

  const {
    mutate: mutateUsername,
    isLoading: isCheckingUsername,
    data: checkUsernameData,
  } = useCheckUsername();

  const {
    mutate: mutateEmail,
    isLoading: isCheckingEmail,
    data: checkEmailData,
  } = useCheckEmail();

  useEffect(() => {
    if (checkUsernameData) {
      setUsernameAvailable(checkUsernameData.data === "Username available");
    } else {
      setUsernameAvailable(false);
    }
  }, [checkUsernameData]);

  useEffect(() => {
    if (checkEmailData) {
      setEmailAvailable(checkEmailData.data === "Email available");
    } else {
      setEmailAvailable(false);
    }
  }, [checkEmailData]);

  useEffect(() => {
    function validateEmail(email) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return emailRegex.test(email);
    }

    if (signupPassword.length > 6) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }

    if (passwordvalid && confirmPassword === signupPassword) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }

    if (validateEmail(signupEmail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [signupPassword, confirmPassword, passwordvalid, signupEmail]);

  useEffect(() => {
    if (
      usernameAvailable &&
      emailAvailable &&
      passwordvalid &&
      confirmPasswordValid &&
      emailvaild
    ) {
      setSignupformvalid(true);
    } else {
      setSignupformvalid(false);
    }
  }, [
    usernameAvailable,
    emailAvailable,
    passwordvalid,
    confirmPasswordValid,
    emailvaild,
  ]);

  const handleUsernameBlur = () => {
    if (username) {
      mutateUsername({ username });
    }
  };

  const handleEmailBlur = () => {
    if (signupEmail) {
      mutateEmail({ email: signupEmail });
    }
  };

  const handleSignup = async () => {
    setNewUser(false);

    if (signupPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const newUser = {
      username,
      email: signupEmail,
      password: signupPassword,
      confirmpassword: confirmPassword,
    };

    try {
      const data = await signup(newUser);
      console.log(data);

      if (data.message === "success") {
        toast.success("User created");
      } else if (data.message === "fail") {
        throw new Error("Signup failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCancel = () => {
    setNewUser(false);
  };

  return (
    <div className="signup-form">
      {/* <h2>Sign Up</h2> */}

      <div className="input-with-icon">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleUsernameBlur}
        />
        {isCheckingUsername && <FaSpinner className="icon" />}
        {usernameAvailable && <FaCheck className="icon" />}
        {!usernameAvailable && username.length > 0 && (
          <FaTimes className="icon" />
        )}
      </div>

      <div className="input-with-icon">
        <input
          type="email"
          placeholder="Email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          onBlur={handleEmailBlur}
        />
        {isCheckingEmail && <FaSpinner className="icon" />}
        {emailvaild && emailAvailable && <FaCheck className="icon" />}
        {((!emailAvailable && signupEmail.length > 0) ||
          (!emailvaild && signupEmail.length > 0)) && (
          <FaTimes className="icon" />
        )}
      </div>

      <div className="input-with-icon">
        <input
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        {passwordvalid && <FaCheck className="icon" />}
        {!passwordvalid && signupPassword.length > 0 && (
          <FaTimes className="icon" />
        )}
      </div>

      <div className="input-with-icon">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordValid && <FaCheck className="icon" />}
        {!confirmPasswordValid && confirmPassword.length > 0 && (
          <FaTimes className="icon" />
        )}
      </div>

      <div className="input-with-icon">
        <input type="password" placeholder="Admin Key" disabled />
      </div>

      <div className="button-container-signup">
        <button
          onClick={handleSignup}
          disabled={!signupformvalid}
          style={{ backgroundColor: "var(--success-color)", color: "white" }}
        >
          Add User
        </button>
        <button
          onClick={handleCancel}
          style={{ backgroundColor: "var(--danger-color)", color: "white" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
