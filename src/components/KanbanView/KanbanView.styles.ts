import styled from "styled-components";

export const KanbanViewRoot = styled.div`
  padding: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const CreateRow = styled.div`
  padding: 0 20px;
`;

export const ColumnHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const Column = styled.div`
  background: #eef4fb;
  /* border: 1px solid lightslategray; */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 250px;
  padding: 20px;
  position: relative;
`;
