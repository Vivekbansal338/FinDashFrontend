import React from "react";
import "./BorrowerInfo.css"; // Import your CSS file

const BorrowerInfo = ({ borrower }) => {
  return (
    <div className="borrower-info">
      <h2>{borrower.name}</h2>
      <p>Email: {borrower.email}</p>
      <p>Phone: {borrower.phoneno}</p>
      <p>Address: {borrower.address}</p>
      <p>Description: {borrower.description}</p>
    </div>
  );
};

export default BorrowerInfo;
