import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? "20px" : "200px")}; /* Adjust dynamically */
  width: calc(100% - ${({ isCollapsed }) => (isCollapsed ? "10px" : "200px")});
  padding: 20px;
  transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
  // overflow-y: auto;
  // position:absolute;
  font-family: "Montserrat", sans-serif;
  
`;


export const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  
font-family: "Montserrat", sans-serif;
`;