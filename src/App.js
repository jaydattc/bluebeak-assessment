import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import "./App.css";
import StateSenateTable from "./components/StateSenateTable";
import TwitterFollowersTable from "./components/TwitterFollowersTable";
import WWCTable from "./components/WWCTable";
import { fetchAndProcessData } from "./utils/fetchAndProcessData.js";
import { Sparklines, SparklinesBars, SparklinesLine } from "react-sparklines";
import { formatFractionToPercent } from "./utils/formatNumbers";

const Header = styled.h1`
  margin-top: calc(56px + 3em - 8px);
  width: 100%;
  font-size: 24px;
  text-align: center;
  border-bottom: 1px solid black;
`;
const SparkLinesList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  align-items: flex-end;
  max-width: 300px;
`;
const Inline = styled.span`
  display: inline;
  font-weight: bold;
  color: ${(props) => props.color};
`;
Inline.defaultProps = {
  color: "black",
};
const Text = styled.p`
  padding: 0;
  margin: 0;
  min-height: 4rem;
  margin-top: 2rem;
  vertical-align: text-bottom;
`;

function App() {
  const [data, setData] = useState({
    wwc_forecasts: [],
    twitter_followers: [],
    senate_state: [],
  });
  const [currentHoverRow, _setCurrentHoverRow] = useState({
    wwc_forecasts: null,
    twitter_followers: null,
    senate_state: null,
  });
  const setCurrentHoverRow = useCallback(
    (data) => _setCurrentHoverRow({ ...currentHoverRow, ...data }),
    [_setCurrentHoverRow, currentHoverRow],
  );
  useEffect(() => {
    fetchAndProcessData()
      .then((processedData) => {
        setData({
          wwc_forecasts: processedData[0],
          twitter_followers: processedData[1],
          senate_state: processedData[2],
        });
        _setCurrentHoverRow({
          wwc_forecasts: processedData[0][0],
          twitter_followers: processedData[1][0],
          senate_state: processedData[2][0],
        });
      })
      .catch(console.log); //error while fetching or processing data
  }, [_setCurrentHoverRow]);

  const chancesOfWinningWorldCupList = useMemo(
    () => data.wwc_forecasts.map((x) => parseFloat(x.win_league)),
    [data],
  );
  const twitterFollowers = useMemo(
    () => data.twitter_followers.map((x) => parseFloat(x.followers)),
    [data],
  );
  const votesPercentage = useMemo(
    () => data.senate_state.map((x) => parseFloat(x.total_votes)),
    [data],
  );
  const totalVotes = useMemo(
    () =>
      data.senate_state.reduce(
        (acc, entry) => parseInt(entry.total_votes) + acc,
        0,
      ),
    [data],
  );
  const randomChanged = useMemo(
    () =>
      Array(20)
        .fill(null)
        .map(() => Math.random()),
    [],
  );

  return (
    <div className="App">
      <WWCTable
        setCurrentHoverRow={setCurrentHoverRow}
        data={data.wwc_forecasts}
      />
      <TwitterFollowersTable
        setCurrentHoverRow={setCurrentHoverRow}
        data={data.twitter_followers}
      />
      <StateSenateTable
        setCurrentHoverRow={setCurrentHoverRow}
        totalVotes={totalVotes}
        data={data.senate_state}
      />
      <div style={{ maxWidth: "300px" }}>
        <Header>What it means</Header>{" "}
        <SparkLinesList>
          <Sparklines data={chancesOfWinningWorldCupList}>
            <SparklinesBars />
          </Sparklines>
          <Text>
            <Inline>{currentHoverRow.wwc_forecasts?.team}</Inline> has a{" "}
            <Inline color="red">
              {formatFractionToPercent(
                currentHoverRow.wwc_forecasts?.win_league,
              )}
            </Inline>{" "}
            chance of winning the World Cup.
          </Text>
          <Sparklines data={twitterFollowers}>
            <SparklinesBars />
          </Sparklines>
          <Text>
            <Inline>{currentHoverRow.twitter_followers?.account}</Inline> has{" "}
            <Inline color="red">
              {parseInt(
                currentHoverRow.twitter_followers?.followers,
              ).toLocaleString("en-US", {
                useGrouping: true,
              })}
            </Inline>{" "}
            followers on twitter.
          </Text>
          <Sparklines data={votesPercentage}>
            <SparklinesBars />
          </Sparklines>
          <Text>
            <Inline>{currentHoverRow.senate_state?.state}</Inline> received{" "}
            <Inline color="red">
              {formatFractionToPercent(
                parseInt(currentHoverRow.senate_state?.total_votes) /
                  totalVotes,
              )}
            </Inline>{" "}
            of total votes.
          </Text>
        </SparkLinesList>
        <Header>How it's changed</Header>
        <Sparklines data={randomChanged}>
          <SparklinesLine style={{ fill: "none" }} />
        </Sparklines>
      </div>
    </div>
  );
}

export default App;
