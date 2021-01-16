import React from "react";
import PropTypes from "prop-types";
import Table from "../../Table";
import Progress from "../Progress";
import { formatFractionToPercent } from "../../utils/formatNumbers";
const Container = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row-reverse",
      fontFamily: '"Fira Mono", Consolas, Monaco, monospace',
    }}
  >
    {children}
  </div>
);

const TwitterFollowersTable = ({ data, setCurrentHoverRow }) => {
  const maxFollowerSize = React.useMemo(
    () =>
      data.reduce(
        (acc, entry) =>
          parseInt(entry.followers) > acc ? parseInt(entry.followers) : acc,
        0,
      ),
    [data],
  );
  const columns = React.useMemo(
    () => [
      {
        id: "twitter-followers-senate",
        Header: "",
        columns: [
          {
            Header: "ACCOUNT",
            accessor: "account",
            Cell: ({ value }) => (
              <a
                href={`https://twitter.com/${value}`}
                target="_blank"
                rel="noreferrer"
              >
                @{value}
              </a>
            ),
          },
          {
            Header: "FOLLOWERS",
            accessor: "followers",
            Cell: ({ value }) => (
              <Container>
                <Progress
                  progress={(parseInt(value) / maxFollowerSize) * 100}
                />
                {parseInt(value).toLocaleString("en-US", {
                  useGrouping: true,
                })}
              </Container>
            ),
          },
          {
            Header: "EXCLUSIVE FOLLOWERS",
            accessor: "exclusive_followers_pct",
            headerStyle: { maxWidth: "6em" },
            Cell: ({ value }) => (
              <Container>
                <Progress
                  bg="#f55e84"
                  progress={formatFractionToPercent(value).slice(0, -1)}
                />{" "}
                {formatFractionToPercent(value)}
              </Container>
            ),
          },
        ],
      },
    ],
    [maxFollowerSize],
  );

  return (
    <Table
      data={data}
      columns={columns}
      onRowHover={(data) => setCurrentHoverRow({ twitter_followers: data })}
    />
  );
};

TwitterFollowersTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      account: PropTypes.string,
      followers: PropTypes.number,
      exclusive_followers_pct: PropTypes.number,
    }),
  ),
};
export default TwitterFollowersTable;
