import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: whitesmoke;
  min-width: 6rem;
  min-height: 1rem;
  margin-left: 0.25rem;
`;
const ProgressBar = styled.span`
  display: block;
  background-color: ${(props) => props.bg};
  width: ${(props) => props.progress}%;
  min-height: 1rem;
`;
ProgressBar.defaultProps = {
  bg: "rgba(88, 194, 204)",
  progress: 0,
};
const Progress = ({ progress, bg }) => (
  <Container>
    <ProgressBar progress={progress} bg={bg} />
  </Container>
);

export default Progress;
