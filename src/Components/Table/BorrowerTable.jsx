import React from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { Link } from "react-router-dom";
import "./LoanTable.css";

function BorrowerTable({ title, data }) {
  const BorrowerData = React.useMemo(
    () =>
      data?.map((borrower) => ({
        BorrowerId: borrower._id,
        name: borrower.name,
        phone: borrower.phoneno,
        TotalLoans: borrower.loans.reduce((acc, loan) => {
          if (loan.status === "active") {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0),
        TotalAmount: borrower.loans.reduce((acc, loan) => {
          if (loan.status === "active") {
            return acc + loan.amount;
          } else {
            return acc;
          }
        }, 0),
        MonthlyInterest: borrower.loans.reduce((acc, loan) => {
          if (loan.status === "active") {
            return acc + loan.monthlyPayment;
          } else {
            return acc;
          }
        }, 0),
      })),
    [data]
  );

  // Define filter components
  const TextFilter = ({ column: { filterValue, setFilter } }) => (
    <input
      type="text"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search..."
    />
  );
  const NumberFilter = ({ column: { filterValue, setFilter } }) => (
    <input
      type="number"
      value={filterValue || ""}
      onChange={(e) => setFilter(parseInt(e.target.value, 10))}
      placeholder="Filter..."
    />
  );

  const SelectFilter = ({ column: { filterValue, setFilter } }) => (
    <select
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
  // Define columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Borrower Id",
        accessor: "BorrowerId",
        Filter: TextFilter,
        sortType: "basic",
        Cell: ({ row }) => (
          <Link to={`/borrowers/${row.original.BorrowerId}`}>
            {row.original.BorrowerId}
          </Link>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Filter: TextFilter,
        sortType: "basic",
      },
      {
        Header: "Active Loans",
        accessor: "TotalLoans",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Total Amount",
        accessor: "TotalAmount",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Monthly Interest",
        accessor: "MonthlyInterest",
        Filter: NumberFilter,
        sortType: "basic",
      },
    ],
    []
  );

  // Use table hook
  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: BorrowerData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  // Render table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                // onClick={() => console.log(row.original.loanId)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            min={1}
            max={pageOptions.length}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default BorrowerTable;
