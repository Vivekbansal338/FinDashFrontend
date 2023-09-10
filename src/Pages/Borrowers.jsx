import React, { useState } from "react";
import { useBorrowers } from "../Hooks/useSearchResults";
import PageWrapper from "../Components/UI/PageWrapper";
import BorrowerTable from "../Components/Table/BorrowerTable";
import Loading from "../Components/Shared/Loading";
import AddBorrowerForm from "../Components/Forms/AddBorrowerForm";
import "./Borrowers.css";

const Borrowers = () => {
  const [showaddform, setshowaddform] = useState(false);
  const { data: borrowers, isLoading, isError } = useBorrowers();

  const handleshowaddform = () => {
    setshowaddform((prev) => !prev);
  };

  if (isLoading) return <Loading />;
  return (
    <PageWrapper>
      <div className="borrowerpage">
        <div className="borrowerpage-top"></div>
        <div className="borrowerpage-second">
          <button className="addborrowerbutton" onClick={handleshowaddform}>
            {!showaddform ? "Add New Borrower" : "Cancel"}
          </button>
          <div>{showaddform && <AddBorrowerForm />}</div>
        </div>

        <div className="borrowerpage-main">
          <h1>Borrowers</h1>
          <div className="borrowerpagemain-table">
            <BorrowerTable title="Borrowers" data={borrowers} />;
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Borrowers;
