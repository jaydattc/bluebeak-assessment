import styled from "styled-components";

const CircularDisplay = styled.span`
  background: ${(props) => props.bg};
  display: inline-block;
  border-radius: 1em;
  line-height: 2em;
  text-align: center;
  width: 2em;
`;
CircularDisplay.defaultProps = { bg: "green" };
export default CircularDisplay;
