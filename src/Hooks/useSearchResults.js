import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  testapi,
  getBorrowers,
  getBorrowerById,
  getLoans,
  updateBorrowerById,
  getLoanById,
  createBorrower,
  createPaymentHistory,
  createLoan,
} from "../Utils/TestApi";

export function useSearchResults() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit");
  const searchquery = params.searchquery;
  const { data, isLoading, error } = useQuery({
    queryKey: ["testapi", searchquery],
    queryFn: () => testapi({ searchquery, limit }),
  });

  return { data, isLoading, error };
}

export function useBorrowers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["borrowers"],
    queryFn: getBorrowers,
  });

  const [totalBorrowers, setTotalBorrowers] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalBorrowers(data.length);
    }
  }, [data]);

  return { data, isLoading, error, totalBorrowers };
}

export function useBorrowerById() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["borrower", id],
    queryFn: () => getBorrowerById(id),
  });

  return { data, isLoading, error };
}

export function useLoans() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["loans"],
    queryFn: getLoans,
  });

  const [totalActiveLendingAmount, setTotalActiveLendingAmount] = useState(0);
  const [totalActiveMonthlyInterest, settotalActiveMonthlyInterest] =
    useState(0);
  const [totalactiveloans, setTotalActiveLoans] = useState(0);
  const [totalloans, setTotalLoans] = useState(0);
  const [Numberofloansyearwise, setNumberofloansyearwise] = useState({});

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [YearWiseLendingAmount, setYearWiseLendingAmount] = useState([]);
  const [YearWiseInterestAmount, setYearWiseInterestAmount] = useState([]);

  let AvgMonthlyRate = (
    (totalActiveMonthlyInterest / totalActiveLendingAmount) *
    100
  ).toFixed(2);

  if (totalActiveLendingAmount === 0) {
    AvgMonthlyRate = 0;
  }

  useEffect(() => {
    if (data) {
      const currentDate = new Date();
      let totalAmount = 0;
      let monthlyAmount = 0;
      let totalActiveLoans = 0;
      let Numberofloansyearwise = {};

      data.forEach((loan) => {
        if (loan.endDate) {
          const endDate = new Date(loan.endDate);
          if (endDate > currentDate) {
            totalAmount += loan.amount;
            monthlyAmount += loan.monthlyPayment;
          }
        } else {
          totalAmount += loan.amount;
          monthlyAmount += loan.monthlyPayment;
        }

        if (loan.status === "active") {
          totalActiveLoans++;
        }

        const startDate = new Date(loan.startDate);
        const startYear = startDate.getFullYear();
        if (startYear in Numberofloansyearwise) {
          Numberofloansyearwise[startYear] += 1;
        }
        if (!(startYear in Numberofloansyearwise)) {
          Numberofloansyearwise[startYear] = 1;
        }
      });
      setTotalLoans(data.length);
      setTotalActiveLoans(totalActiveLoans);
      setTotalActiveLendingAmount(totalAmount);
      settotalActiveMonthlyInterest(monthlyAmount);
      setNumberofloansyearwise(Numberofloansyearwise);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const currentDate = new Date();
      let yearWiseData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let yearWiseInterestData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data.forEach((loan) => {
        const nextYearDate = new Date();
        nextYearDate.setFullYear(currentDate.getFullYear() + 1);
        let endDate;
        if (loan.endDate) {
          endDate = new Date(loan.endDate);
        } else {
          endDate = nextYearDate;
        }
        const endYear = endDate.getFullYear();
        const startDate = new Date(loan.startDate);
        const startYear = startDate.getFullYear();

        if (startYear < selectedYear * 1) {
          if (endYear > selectedYear * 1) {
            for (let i = 0; i < 12; i++) {
              yearWiseData[i] += loan.amount;
              yearWiseInterestData[i] += loan.monthlyPayment;
            }
          }
          if (endYear === selectedYear * 1) {
            for (let i = 0; i <= endDate.getMonth(); i++) {
              yearWiseData[i] += loan.amount;
              yearWiseInterestData[i] += loan.monthlyPayment;
            }
          }
        }
        if (startYear === selectedYear * 1) {
          if (endYear > selectedYear * 1) {
            for (let i = startDate.getMonth(); i < 12; i++) {
              yearWiseData[i] += loan.amount;
              yearWiseInterestData[i] += loan.monthlyPayment;
            }
          }
          if (endYear === selectedYear * 1) {
            for (let i = startDate.getMonth(); i <= endDate.getMonth(); i++) {
              yearWiseData[i] += loan.amount;
              yearWiseInterestData[i] += loan.monthlyPayment;
            }
          }
        }
      });
      setYearWiseLendingAmount(yearWiseData);
      setYearWiseInterestAmount(yearWiseInterestData);
    }
  }, [data, selectedYear]);

  const setYearlyData = (input) => {
    setSelectedYear(input);
  };

  return {
    data,
    isLoading,
    error,
    totalActiveLendingAmount,
    totalActiveMonthlyInterest,
    AvgMonthlyRate,
    setYearlyData,
    YearWiseLendingAmount,
    YearWiseInterestAmount,
    selectedYear,
    totalactiveloans,
    totalloans,
    Numberofloansyearwise,
  };
}

export function useLoanById() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["loan", id],
    queryFn: () => getLoanById(id),
  });

  return { data, isLoading, error };
}

export function useUpdateBorrowerById() {
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params.id;
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (borrower) => updateBorrowerById(id, borrower),
    onSuccess: () => {
      queryClient.invalidateQueries("borrowers");
      toast.success("Borrower updated successfully");
    },
    onError: () => {
      toast.error("Error updating borrower");
    },
  });

  return { mutate, isLoading, error };
}

export function useCreateBorrower() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (borrower) => createBorrower(borrower),
    onSuccess: () => {
      queryClient.invalidateQueries("borrowers");
      toast.success("Borrower created successfully");
    },
    onError: () => {
      toast.error("Error creating borrower");
    },
  });

  return { mutate, isLoading, error };
}

export function useCreatePaymentHistory() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: (payment) => createPaymentHistory(payment),
    onSuccess: () => {
      queryClient.invalidateQueries("loans");
      toast.success("Payment added successfully");
    },
    onError: () => {
      toast.error("Error adding payment");
    },
  });

  return { mutate, isLoading, error };
}

export function useCreateLoan() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: (loan) => createLoan(loan),
    onSuccess: () => {
      queryClient.invalidateQueries("loans");
      toast.success("Loan created successfully");
    },
    onError: () => {
      toast.error("Error creating loan");
    },
  });

  return { mutate, isLoading, error, data };
}
