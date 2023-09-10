import React from "react";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <p>Let's get you back on track.</p>
        <button className="back-btn" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
