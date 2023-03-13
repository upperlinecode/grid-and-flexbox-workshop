import styled from "styled-components";

export const ColumnHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const ColumnRoot = styled.div`
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
