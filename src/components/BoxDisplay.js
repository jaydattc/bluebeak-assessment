import styled from "styled-components";
const BoxDisplay = styled.span`
  background: ${(props) => props.bg};
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 0 0.5rem;
`;
BoxDisplay.defaultProps = { bg: "rgb(80, 176, 172)" };
export default BoxDisplay;
