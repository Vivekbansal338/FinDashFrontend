import React from "react";
import { useNavigate } from "react-router-dom";
import "./BorrowerCard.css";

const BorrowerCard = ({ borrower }) => {
  const navigate = useNavigate();

  function handleclick() {
    navigate(`${borrower._id}`);
  }

  return (
    <div className="card" onClick={handleclick}>
      <div className="card-header">
        <h2>{borrower.name}</h2>
        <p>{borrower.email}</p>
      </div>
      <div className="card-body">
        <div className="card-row">
          <div className="card-label">Phone:</div>
          <div className="card-value">{borrower.phoneno}</div>
        </div>
        <div className="card-row">
          <div className="card-label">Address:</div>
          <div className="card-value">{borrower.address}</div>
        </div>
        <div className="card-row">
          <div className="card-label">Description:</div>
          <div className="card-value">{borrower.description}</div>
        </div>
        <div className="card-row">
          <div className="card-label">Loans:</div>
          <div className="card-value">{borrower.loans.length}</div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerCard;
