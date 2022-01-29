import styled from "styled-components";

export const TableViewRoot = styled.div``;

export const ScrollingTable = styled.table`
  border-spacing: 0;
  th {
    padding: 8px;
    border: 1px solid lightslategrey;
  }

  td {
    border: 1px solid slategrey;
    background-color: aliceblue;
    margin: 0px;
    padding: 8px;
    color: darkslategrey;
    font-weight: 100;
  }
`;

export const NoWrapCell = styled.td`
  white-space: nowrap;
`;
