import React, { useState } from "react";
import { useCreateLoan } from "../../Hooks/useSearchResults";
import Loading from "../Shared/Loading";
import "./MainForm.css";

const AddLoanForm = ({ borrower, setshowaddloanform }) => {
  const [formdata, setformdata] = useState({
    amount: 0,
    monthlyPayment: 0,
    startDate: "",
    endDate: "",
    borrower: borrower._id,
  });
  const { mutate, isLoading, isError } = useCreateLoan();

  const handlechange = (e) => {
    setformdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      borrower: borrower._id,
    }));
  };

  const handlecreateborrower = (e) => {
    e.preventDefault();
    // console.log(formdata);
    mutate({ ...formdata });
    setshowaddloanform(false);
    setformdata({
      amount: 0,
      monthlyPayment: 0,
      startDate: "",
      endDate: "",
      borrower: borrower._id,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <form className="form" onSubmit={handlecreateborrower}>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={handlechange}
          value={formdata.amount}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="monthlyPayment">Monthly Interest</label>
        <input
          type="number"
          id="monthlyPayment"
          name="monthlyPayment"
          value={formdata.monthlyPayment}
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          onChange={handlechange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="borrower">Borrower Id</label>
        <input
          type="text"
          id="borrower"
          name="borrower"
          onChange={handlechange}
          defaultValue={borrower._id}
          disabled
          required
        />
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

export default AddLoanForm;
