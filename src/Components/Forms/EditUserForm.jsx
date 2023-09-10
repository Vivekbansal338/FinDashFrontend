import React from "react";
import { useUpdateBorrowerById } from "../../Hooks/useSearchResults";
import "./MainForm.css";

const EditUserForm = ({ formValues, setShowForm, setFormValues, onEdit }) => {
  const { mutate, isLoading: issetting } = useUpdateBorrowerById();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    mutate({ ...formValues });
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNo">Phone No</label>
        <input
          type="number"
          id="phoneno"
          name="phoneno"
          value={formValues.phoneno}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formValues.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group-buttons">
        <button type="submit" className="formsubmitbutton">
          Submit
        </button>
        <button type="button" className="formresetbutton" onClick={onEdit}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
