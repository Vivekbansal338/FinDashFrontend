import React from "react";
import { useLoans } from "../Hooks/useSearchResults";
import LoanTable from "../Components/Table/LoanTable";
import Loading from "../Components/Shared/Loading";
import SmallDataCard from "../Components/Home/SmallDataCard";
import "./Loans.css";

const Loans = () => {
  const {
    data: allloandata,
    isLoading,
    error: allloanserror,
    totalActiveLendingAmount,
    totalActiveMonthlyInterest,
    AvgMonthlyRate,
    totalactiveloans,
    totalloans,
  } = useLoans();
  const Carddata = [
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
        id: "Avg Monthly Rate",
        label: "Avg Monthly Rate",
        value: AvgMonthlyRate,
      },
    ],
    [
      {
        id: "Total Active Loans",
        label: "Total Active Loans",
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
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="loanpage">
      <div className="loanpage-top">
        {Carddata.map((data, index) => {
          return (
            <SmallDataCard data={data} key={index} isloading={isLoading} />
          );
        })}
      </div>
      <div className="loanpage-main">
        <h1>Loans</h1>
        <div className="loanpagemain-table">
          <LoanTable title="Loans" data={allloandata} />;
        </div>
      </div>
    </div>
  );
};

export default Loans;
