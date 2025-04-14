import styled from "styled-components";

export const AppBarWrap = styled.div`
  font-size: 14px;
  color: #6b7280;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #f9fafb;
  border-radius: 5px;
  margin-left: 40px;
  margin-top: 20px;
  font-family: "Montserrat", sans-serif;

  .ant-breadcrumb a { 
  
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .ant-breadcrumb-separator {
    color: #9ca3af;
  }
`;
