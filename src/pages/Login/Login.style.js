import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const FormContainer = styled.div`
  width: 40%;
  height: 100%;
  background-color: #ffffff;
  // border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
font-family: "Montserrat", sans-serif;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  justify-content:center;
  text-align: center;
  margin-bottom: 20px;
  
font-family: "Montserrat", sans-serif;
`;

export const InputField = styled.input`
  width: 80%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ddd;
  font-size: 16px;
  outline: none;
 border-radius:20px;
 
font-family: "Montserrat", sans-serif;
  &:focus {
    border-color: #6A1B9A;
  }
`;

export const SubmitButton = styled.button`
  width: 85%;
  padding: 12px;
  background-color: #6A1B9A;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  
font-family: "Montserrat", sans-serif;

  &:hover {
    background-color: #5C1A7F;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
  
font-family: "Montserrat", sans-serif;
`;

export const ImageContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  
font-family: "Montserrat", sans-serif;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  // border-radius: 12px;
`;
