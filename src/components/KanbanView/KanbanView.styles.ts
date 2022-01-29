import styled from "styled-components";

export const KanbanViewRoot = styled.div`
  padding: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const Column = styled.div`
  background: #eef4fb;
  padding: 20px;
  border-radius: 10px;
  /* border: 1px solid lightslategray; */
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
