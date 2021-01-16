import React from "react";
import PropTypes from "prop-types";
import Table from "../../Table";
import { formatFractionToPercent } from "../../utils/formatNumbers";
import BoxDisplay from "../BoxDisplay";

const StateSenateTable = ({ data, totalVotes, setCurrentHoverRow }) => {
  const columns = React.useMemo(
    () => [
      {
        id: "senate-state-followers",
        Header: "",
        columns: [
          {
            Header: "STATE",
            accessor: "state",
          },
          {
            Header: "VOTES",
            accessor: "total_votes",
          },
          {
            Header: "PERCENTAGE",
            accessor: "percentageFromTotal",
            headerStyle: { maxWidth: "6em" },
            Cell: ({ value }) => (
              <BoxDisplay bg={`rgba(80, 176, 172, ${value})`}>
                {formatFractionToPercent(value)}
              </BoxDisplay>
            ),
          },
        ],
      },
    ],
    [],
  );

  return (
    <Table
      data={data.map((entry) => ({
        ...entry,
        percentageFromTotal: parseFloat(entry.total_votes) / totalVotes,
      }))}
      columns={columns}
      onRowHover={(data) => setCurrentHoverRow({ senate_state: data })}
    />
  );
};

StateSenateTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.string,
      total_votes: PropTypes.number,
    }),
  ),
};
export default StateSenateTable;
