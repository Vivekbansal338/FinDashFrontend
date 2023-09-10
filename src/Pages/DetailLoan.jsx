import React, { useEffect, useState } from "react";
import { useLoanById } from "../Hooks/useSearchResults";
import UserCard from "../Components/Borrower/UserCard";
import LoanCard from "../Components/Borrower/LoanCard";
import SmallDataCard from "../Components/Home/SmallDataCard";
import AddPaymentForm from "../Components/Forms/AddPaymentForm";
import PaymentHistoryTable from "../Components/Table/PaymentHistoryTable";
import Loading from "../Components/Shared/Loading";
import "./DetailLoan.css";

const DetailLoan = () => {
  const { data: Loandata, isLoading, isError } = useLoanById();
  const [showaddform, setshowaddform] = useState(false);
  const [Carddata, setCarddata] = useState([[{}]]);

  const handleshowaddform = () => {
    setshowaddform((prev) => !prev);
  };

  useEffect(() => {
    function tranformdata(data) {
      let loanamount = data.amount;
      let loanmonthlyinterest = data.monthlyPayment;
      let totalinterest = 0;
      let totalinterestpaid = 0;
      let totalinterestforgiven = 0;
      let totalpaymentsdone = 0;

      for (let i = 0; i < data.paymentHistory.length; i++) {
        totalinterest += data.paymentHistory[i].amounttopay;
        totalinterestpaid += data.paymentHistory[i].amountpaid;
        totalinterestforgiven += data.paymentHistory[i].amountforgiven;
        totalpaymentsdone += 1;
      }

      const finaldata = [
        [
          {
            id: "Loan Amount",
            label: "Loan Amount",
            value: loanamount,
          },
        ],
        [
          {
            id: "Monthly Interest",
            label: "Monthly Interest",
            value: loanmonthlyinterest,
          },
        ],
        [
          {
            id: "Total Interest",
            label: "Total Interest",
            value: totalinterest,
          },
        ],
        [
          {
            id: "Total Interest Paid",
            label: "Total Interest Paid",
            value: totalinterestpaid,
          },
        ],
        [
          {
            id: "Total Interest Forgiven",
            label: "Total Interest Forgiven",
            value: totalinterestforgiven,
          },
        ],
        [
          {
            id: "Total Payments Done",
            label: "Total Payments Done",
            value: totalpaymentsdone,
          },
        ],
      ];

      return finaldata;
    }

    if (!Loandata) return;
    const finaldata = tranformdata(Loandata);
    setCarddata(finaldata);
  }, [Loandata]);

  if (isLoading) return <Loading />;
  return (
    <div className="detailloanpage">
      <div className="detailloanpage-third">
        {Carddata.map((data, index) => {
          return (
            <SmallDataCard data={data} key={index} isloading={isLoading} />
          );
        })}
      </div>
      <div className="detailloanpage-top">
        <button className="collectpaymentbutton" onClick={handleshowaddform}>
          {showaddform ? "Cancel" : "Collect Payment"}
        </button>
        <div>{showaddform && <AddPaymentForm loan={Loandata} />}</div>
      </div>
      <div className="detailloanpage-second">
        <UserCard user={Loandata.borrower} noteditable={true} />
        <LoanCard loan={Loandata} />
      </div>

      <div className="detailloanpage-main">
        <h1>Payment History</h1>
        <div className="detailloanpagemain-table">
          <PaymentHistoryTable
            title="Payment History"
            data={Loandata.paymentHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailLoan;
