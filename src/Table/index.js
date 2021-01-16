import React from "react";
import { useResizeColumns, useSortBy, useTable } from "react-table";
import "./index.css";

const Table = ({ columns, data, onRowHover, onRowMouseLeave }) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    useResizeColumns,
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    ...column.getSortByToggleProps(),
                  })}
                  style={
                    column.headerStyle
                      ? {
                          position: "relative",
                          cursor: "pointer",
                          ...column.headerStyle,
                        }
                      : { position: "relative", cursor: "pointer" }
                  }
                  role="button"
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onMouseOver={
                  onRowHover ? () => onRowHover(row.original) : undefined
                }
                onMouseLeave={
                  onRowMouseLeave
                    ? () => onRowMouseLeave(row.original)
                    : undefined
                }
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        className: cell.column.className,
                        style: cell.column.style,
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
