import React from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { Link } from "react-router-dom";
import "./LoanTable.css";

function LoanTable({ title, data }) {
  const loanData = React.useMemo(
    () =>
      data?.map((borrower) => ({
        loanId: borrower._id,
        amount: borrower.amount,
        interest: borrower.monthlyPayment,
        status: borrower.status,
        startDate: new Date(borrower.startDate).toLocaleDateString(),
      })),
    [data]
  );
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

  const columns = React.useMemo(
    () => [
      {
        Header: "Loan Id",
        accessor: "loanId",
        Filter: TextFilter,
        sortType: "basic",
        Cell: ({ row }) => (
          <Link to={`/loans/${row.original.loanId}`}>
            {row.original.loanId}
          </Link>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Interest",
        accessor: "interest",
        Filter: NumberFilter,
        sortType: "basic",
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Filter: TextFilter,
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
      data: loanData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

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

export default LoanTable;
