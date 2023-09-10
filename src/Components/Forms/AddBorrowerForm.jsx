import React, { useState } from "react";
import { useCreateBorrower } from "../../Hooks/useSearchResults";
import Loading from "../Shared/Loading";
import "./MainForm.css";

const AddBorrowerForm = ({ loan }) => {
  const [formdata, setformdata] = useState({});
  const { mutate, isLoading } = useCreateBorrower();

  const handlechange = (e) => {
    setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlecreateborrower = (e) => {
    e.preventDefault();
    mutate({ ...formdata });
  };

  if (isLoading) return <Loading />;

  return (
    <form className="form" onSubmit={handlecreateborrower}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneno">Phone No</label>
        <input
          type="number"
          id="phoneno"
          name="phoneno"
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={handlechange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handlechange}
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

export default AddBorrowerForm;
