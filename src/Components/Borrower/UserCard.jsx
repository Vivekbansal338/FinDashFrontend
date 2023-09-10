import React, { useState } from "react";
import EditUserForm from "../Forms/EditUserForm";
import "./UserCard.css";

const UserCard = ({ user, noteditable }) => {
  const tempformValues = {
    name: user.name,
    email: user.email,
    phoneno: user.phoneno,
    address: user.address,
  };
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState(tempformValues);
  const { name, email, phoneno, address, image, _id } = user;

  const onEdit = (e) => {
    e.preventDefault();
    setShowForm((prev) => !prev);
    setFormValues(tempformValues);
  };

  return (
    <>
      {!showForm && (
        <div className="user-card">
          <div className="user-card-header">
            <div className="user-card-image">
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt={name}
              />
            </div>
            <div className="user-card-title">
              <h2>{name}</h2>
              <p>ID: {_id}</p>
            </div>
          </div>
          <div className="user-card-body">
            <div className="user-card-details">
              <p>Email: {email}</p>
              <p>Phone: {phoneno}</p>
              <p>Address: {address}</p>
            </div>
            <div className="user-card-actions">
              {!noteditable && (
                <button className="edit-button" onClick={onEdit}>
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <EditUserForm
          formValues={formValues}
          setShowForm={setShowForm}
          setFormValues={setFormValues}
          onEdit={onEdit}
        />
      )}
    </>
  );
};

export default UserCard;
