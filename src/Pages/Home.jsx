import React, { useState, useEffect } from "react";
import Loading from "../Components/Shared/Loading";
import { useLoans, useBorrowers } from "../Hooks/useSearchResults";
import LineChart from "../Components/Charts/LineChart";
import LoanDistributionLineChart from "../Components/Charts/LoanDistributionLineChart";
import SmallDataCard from "../Components/Home/SmallDataCard";
import LargeLineCard from "../Components/Home/LargeLineCard";
import "../Components/Charts/Chart.css";
import "./Home.css";
const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Home = () => {
  const [finalYearWiseLendingAmount, setfinalYearWiseLendingAmount] = useState(
    []
  );
  const [finalYearWiseInterestAmount, setfinalYearWiseInterestAmount] =
    useState([]);

  const [finalNumberofloansyearwise, setfinalNumberofloansyearwise] = useState(
    []
  );

  const {
    data: allloandata,
    isLoading: allloansloading,
    error: allloanserror,
    totalActiveLendingAmount,
    totalActiveMonthlyInterest,
    AvgMonthlyRate,
    setYearlyData: setLoanYearlyData,
    selectedYear,
    YearWiseLendingAmount,
    YearWiseInterestAmount,
    totalactiveloans,
    totalloans,
    Numberofloansyearwise,
  } = useLoans();

  const {
    data: allborrowersdata,
    isLoading: allborrowersloading,
    error: allborrowerserror,
    totalBorrowers,
  } = useBorrowers();

  const Carddata = [
    [
      {
        id: "Total Borrowers",
        label: "Total Borrowers",
        value: totalBorrowers,
      },
    ],
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

  useEffect(() => {
    function formatdata(Label, data) {
      const tempdata = [];
      for (let i = 0; i < data.length; i++) {
        tempdata.push({
          x: Months[i],
          y: data[i],
        });
      }
      const finaldata = [
        {
          id: Label,
          data: tempdata,
        },
      ];
      return finaldata;
    }

    function formatNumberofLoansdata(Label, data) {
      const tempdata = [];
      for (data in Numberofloansyearwise) {
        tempdata.push({
          x: data,
          y: Numberofloansyearwise[data],
        });
      }
      const finaldata = [
        {
          id: Label,
          data: tempdata,
        },
      ];
      return finaldata;
    }

    setfinalNumberofloansyearwise(
      formatNumberofLoansdata("Number of Loans", Numberofloansyearwise)
    );

    setfinalYearWiseLendingAmount(
      formatdata("Total Lendings", YearWiseLendingAmount)
    );

    setfinalYearWiseInterestAmount(
      formatdata("Total Interest", YearWiseInterestAmount)
    );
  }, [YearWiseLendingAmount, YearWiseInterestAmount, Numberofloansyearwise]);

  if (allloansloading || allborrowersloading) return <Loading />;

  return (
    <div className="homepage">
      <div className="homepage-top">
        {Carddata.map((data, index) => {
          return (
            <SmallDataCard
              data={data}
              key={index}
              isloading={allborrowersloading}
            />
          );
        })}
      </div>
      <div className="homepage-main">
        <div className="homepage-main-left">
          <LargeLineCard
            data={finalYearWiseLendingAmount}
            isLoading={allloansloading}
            label="Total Lendings vs Month"
            yaxis="Amount"
            xaxis="Month"
            setYearlyData={setLoanYearlyData}
            selectedYear={selectedYear}
          />
          <LargeLineCard
            data={finalYearWiseInterestAmount}
            isLoading={allloansloading}
            label="Total Interest vs Month"
            yaxis="Interest"
            xaxis="Month"
            setYearlyData={setLoanYearlyData}
            selectedYear={selectedYear}
          />
        </div>
        <div className="homepage-main-right">
          <LoanDistributionLineChart
            data={finalNumberofloansyearwise}
            label="Number of Loans Distributed vs Year"
            yaxis="Number of Loans"
            xaxis="Year"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
