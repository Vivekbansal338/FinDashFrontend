import React from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { Link } from "react-router-dom";
import "./LoanTable.css";

function PaymentHistoryTable({ title, data }) {
  const PaymentData = React.useMemo(
    () =>
      data?.map((Payment) => ({
        PaymentId: Payment._id,
        Amount: Payment.amounttopay,
        AmountPaid: Payment.amountpaid,
        AmountForgiven: Payment.amountforgiven,
        status: Payment.status,
        dueDate: new Date(Payment.duedate).toLocaleDateString(),
        paidDate: new Date(Payment.paiddate).toLocaleDateString(),
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
      <option value="paid">Paid</option>
      <option value="half-Paid">Half Paid</option>
      <option value="unpaid">Unpaid</option>
    </select>
  );

  // Define columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Payment Id",
        accessor: "PaymentId",
        Filter: TextFilter,
        sortType: "basic",
        Cell: ({ row }) => (
          <Link to={`/loans/${row.original.PaymentId}`}>
            {row.original.PaymentId}
          </Link>
        ),
      },
      {
        Header: "Amount",
        accessor: "Amount",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Amount Paid",
        accessor: "AmountPaid",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Amount Forgiven",
        accessor: "AmountForgiven",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Paid Date",
        accessor: "paidDate",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Status",
        accessor: "status",
        Filter: SelectFilter,
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
      data: PaymentData,
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

export default PaymentHistoryTable;
