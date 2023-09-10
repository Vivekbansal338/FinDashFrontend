import React from "react";
import "./Error.css";

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <span className="error-message">{message}</span>
    </div>
  );
};

export default Error;
