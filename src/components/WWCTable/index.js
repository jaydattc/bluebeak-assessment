import React from "react";
import PropTypes from "prop-types";
import Table from "../../Table";
import CircularDisplay from "../CircularDisplay";
import BoxDisplay from "../BoxDisplay";
import {
  formatFractionToPercent,
  formatToTwoDigit,
  formatToOneSF,
} from "../../utils/formatNumbers";

const WWCTable = ({ data, setCurrentHoverRow }) => {
  const knockoutStageProps = React.useMemo(
    () => ({
      className: "no-spacing",
      headerStyle: { maxWidth: "5em" },
      Cell: ({ value }) => (
        <BoxDisplay
          bg={`rgba(80, 176, 172, ${parseFloat(value) < 0.5 ? 0 : value})`}
        >
          {formatFractionToPercent(value)}
        </BoxDisplay>
      ),
    }),
    [],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "TEAM",
        accessor: "team",
      },
      {
        Header: "GROUP",
        accessor: "group",
      },
      {
        Header: "TEAM RATING",
        columns: [
          {
            Header: "SPI",
            accessor: "spi",
            Cell: (row) => parseFloat(row.value).toFixed(1),
          },
          {
            Header: "OFF.",
            accessor: "global_o",
            Cell: (row) => (
              <CircularDisplay
                bg={`rgba(0, 255, 0, ${formatToOneSF(row.value)})`}
              >
                {formatToTwoDigit(row.value)}
              </CircularDisplay>
            ),
          },
          {
            Header: "DIFF.",
            accessor: "global_d",
            Cell: (row) => (
              <CircularDisplay
                bg={`rgba(255, 0, 0, ${formatToOneSF(row.value)})`}
              >
                {formatToTwoDigit(row.value)}
              </CircularDisplay>
            ),
          },
        ],
      },
      {
        Header: "KNOCKOUT STAGE CHANCES",
        columns: [
          {
            Header: "MAKE ROUND OF 16",
            accessor: "make_round_of_16",
            ...knockoutStageProps,
          },
          {
            Header: "MAKE QTR-FINALS",
            accessor: "make_quarters",
            ...knockoutStageProps,
          },
          {
            Header: "MAKE SEMIFINALIST",
            accessor: "make_semis",
            ...knockoutStageProps,
          },
          {
            Header: "WIN WORLD CUP",
            accessor: "win_league",
            ...knockoutStageProps,
          },
        ],
      },
    ],
    [knockoutStageProps],
  );

  return (
    <Table
      data={data}
      columns={columns}
      onRowHover={(data) => setCurrentHoverRow({ wwc_forecasts: data })}
    />
  );
};

WWCTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      team: PropTypes.string,
      group: PropTypes.string,
      spi: PropTypes.number,
      global_o: PropTypes.number,
      global_d: PropTypes.number,
      make_round_of_16: PropTypes.number,
      make_quarters: PropTypes.number,
      make_semis: PropTypes.number,
      win_league: PropTypes.number,
    }),
  ),
};
export default WWCTable;
