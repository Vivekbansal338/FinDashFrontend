import React, { useEffect, useState } from "react";
import { useBorrowerById } from "../Hooks/useSearchResults";
import SmallDataCard from "../Components/Home/SmallDataCard";
import UserCard from "../Components/Borrower/UserCard";
import LoanTable from "../Components/Table/LoanTable";
import Loading from "../Components/Shared/Loading";
import AddLoanForm from "../Components/Forms/AddLoanForm";
import "./DetailBorrower.css";

const DetailBorrower = () => {
  const [showaddloanform, setshowaddloanform] = useState(false);
  const { data: borrower, isLoading, isError } = useBorrowerById();
  const [Carddata, setCarddata] = useState([[{}]]);

  useEffect(() => {
    function tranformdata(data) {
      let totalloans = 0;
      let totalactiveloans = 0;
      let totalActiveLendingAmount = 0;
      let totalActiveMonthlyInterest = 0;
      let totalpayments = 0;

      for (let i = 0; i < data.loans.length; i++) {
        totalloans += 1;
        if (data.loans[i].status === "active") {
          totalactiveloans += 1;
          totalActiveLendingAmount += data.loans[i].amount;
          totalActiveMonthlyInterest += data.loans[i].monthlyPayment;
        }
        totalpayments += data.loans[i].paymentHistory.length;
      }

      const finaldata = [
        [
          {
            id: "Active Lending Amount",
            label: "Active Lending Amount",
            value: totalActiveLendingAmount,
          },
        ],
        [
          {
            id: "Active Monthly Interest",
            label: "Active Monthly Interest",
            value: totalActiveMonthlyInterest,
          },
        ],
        [
          {
            id: "Active Loans",
            label: "Active Loans",
            value: totalactiveloans,
          },
        ],
        [
          {
            id: "Total Loans",
            label: "Total Loans",
            value: totalloans,
          },
        ],
        [
          {
            id: "Total Payments",
            label: "Total Payments",
            value: totalpayments,
          },
        ],
      ];

      return finaldata;
    }
    if (!borrower) return;
    setCarddata(tranformdata(borrower));
  }, [borrower]);

  const handleshowaddloan = () => {
    setshowaddloanform((prev) => !prev);
  };

  if (isLoading) return <Loading />;
  return (
    <div className="detailborrowerpage">
      <div className="detailborrowerpage-top">
        <UserCard user={borrower} />
      </div>
      <div className="detailborrowerpage-second">
        {Carddata.map((data, index) => {
          return (
            <SmallDataCard data={data} key={index} isloading={isLoading} />
          );
        })}
      </div>
      <div className="detailborrowerpage-third">
        <button className="addnewloanbutton" onClick={handleshowaddloan}>
          {showaddloanform ? "Cancel" : "Add New Loan"}
        </button>
        <div>
          {showaddloanform && (
            <AddLoanForm
              borrower={borrower}
              setshowaddloanform={setshowaddloanform}
            />
          )}
        </div>
      </div>
      <div className="detailborrowerpage-main">
        <h1>Loans</h1>
        <div className="detailborrowerpagemain-table">
          <LoanTable title="Loan" data={borrower.loans} />
        </div>
      </div>
    </div>
  );
};

export default DetailBorrower;
