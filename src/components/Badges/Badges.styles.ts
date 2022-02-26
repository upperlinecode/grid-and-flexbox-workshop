import styled from "styled-components";
import { Status, Priority } from "../../tasks";

const statusColorMappings: { [key: string]: string } = {
  "Not Started": "rgb(250, 215, 158)",
  "In Progress": "rgb(132, 156, 194)",
  Completed: "rgb(198, 250, 208)",
};

export const StatusBadgeRoot = styled.span<{ status: Status }>`
  color: darkslategrey;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 15px;
  background-color: ${({ status }) =>
    statusColorMappings[status] || "rgb(220, 220, 220)"};
`;

const priorityColorMappings: { [key: string]: string } = {
  Low: "rgb(207, 223, 255)",
  Medium: "rgb(198, 250, 208)",
  High: "rgb(250, 215, 158)",
};

export const PriorityBadgeRoot = styled.span<{ priority: Priority }>`
  color: darkslategrey;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 15px;
  background-color: ${({ priority }) =>
    priorityColorMappings[priority] || "rgb(250, 199, 211)"};
`;
