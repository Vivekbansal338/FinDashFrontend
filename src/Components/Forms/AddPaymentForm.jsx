import React, { useState } from "react";
import { useCreatePaymentHistory } from "../../Hooks/useSearchResults";
import "./MainForm.css";

const AddPaymentForm = ({ loan }) => {
  const [formdata, setformdata] = useState({});
  const { mutate, isLoading, isError } = useCreatePaymentHistory();

  const handlechange = (e) => {
    setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleaddpayment = (e) => {
    e.preventDefault();
    mutate({ ...formdata, loan: loan._id, borrower: loan.borrower._id });
  };

  return (
    <form className="form" onSubmit={handleaddpayment}>
      <div className="form-group">
        <label htmlFor="due-date">Due Date:</label>
        <input
          type="date"
          id="due-date"
          name="duedate"
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="due-date">Date Paid On</label>
        <input
          type="date"
          id="paid-date"
          name="paiddate"
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount-to-pay">Amount to Pay:</label>
        <input
          type="number"
          id="amount-to-pay"
          name="amounttopay"
          onChange={handlechange}
          min={0}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount-paid">Amount Paid:</label>
        <input
          type="number"
          id="amount-paid"
          name="amountpaid"
          onChange={handlechange}
          min={0}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount-forgiven">Amount Forgiven:</label>
        <input
          type="number"
          id="amount-forgiven"
          name="amountforgiven"
          onChange={handlechange}
          min={0}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" onChange={handlechange} required>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="half-paid">Half-Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="form-group-buttons">
        <button type="submit" className="formsubmitbutton">
          Submit
        </button>

        <button type="reset" className="formresetbutton">
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddPaymentForm;
