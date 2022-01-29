import styled from "styled-components";

export const TableViewRoot = styled.div`
  .row {
    display: flex;
  }

  .cell,
  .headerCell {
    flex-grow: 1;
    background-color: aliceblue;
    border: 1px solid slategray;
    padding: 8px;
    font-weight: 100;
  }

  .headerCell {
    background-color: #ccc;
    font-weight: 100;
  }
`;

export const NoWrapCell = styled.td``;
