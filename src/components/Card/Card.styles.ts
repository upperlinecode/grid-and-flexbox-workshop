import styled from "styled-components";

export const CardRoot = styled.div`
  background-color: aliceblue;
  width: 250px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  border: solid 1px #aaa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h4 {
    margin-top: 0px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    word-spacing: 1px;
  }
`;

export const FieldTitle = styled.h5`
  font-size: 11px;
  font-weight: 100;
  color: lightslategray;
  margin-bottom: -10px;
`;

export const FieldBody = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #333;
`;

export const BudgetGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  background-color: slategray;
  grid-gap: 1px;

  * {
    background-color: aliceblue;
    padding: 4px;
    margin: 0px;
  }
`;
