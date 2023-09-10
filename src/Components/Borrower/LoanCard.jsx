import React from "react";
import "./LoanCard.css";

const LoanCard = ({ loan }) => {
  return (
    <div className="loan-card">
      <div className="loan-card-header">
        <div className="loan-card-title">
          <h2>Loan</h2>
          <p>Loan ID: {loan._id}</p>
        </div>
      </div>
      <div className="loan-card-body">
        <div className="loan-card-details">
          <p>Amount: {loan.amount}</p>
          <p>Monthly Payment: {loan.monthlyPayment}</p>
        </div>
        <div className="loan-card-details">
          <p>Start Date: {new Date(loan.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(loan.endDate).toLocaleDateString()}</p>
          <p
            className={`${
              loan.status === "active" ? "status-active" : "status-inactive"
            }`}
          >
            Status: {loan.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
