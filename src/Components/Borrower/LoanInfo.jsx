import React from "react";
import "./LoanInfo.css"; // Import your CSS file

const LoanInfo = ({ loan }) => {
  return (
    <div className="loan-info">
      <h3>Loan Details</h3>
      <p>Amount: ${loan.amount}</p>
      <p>Monthly Payment: ${loan.monthlyPayment}</p>
      <p>Start Date: {new Date(loan.startDate).toLocaleDateString()}</p>
    </div>
  );
};

export default LoanInfo;
