import styled from "styled-components";
import { Status, Priority } from "../../tasks";

/*
Recommended color mapping:
"Not Started" - rgb(250, 215, 158)
"In Progress" - rgb(132, 156, 194)
"Completed" - rgb(198, 250, 208)
Anything else - rgb(220, 220, 220)
*/

export const StatusBadgeRoot = styled.span<{ status: Status }>`
  color: darkslategrey;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 15px;
  background-color: #ccc;
`;

/*
Recommended color mapping:
"Low" - rgb(207, 223, 255)
"Medium" - rgb(198, 250, 208)
"High" - rgb(250, 215, 158)
"Critical" - rgb(250, 199, 211)
*/

export const PriorityBadgeRoot = styled.span`
  color: darkslategrey;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 15px;
  background-color: #ccc;
`;
