import styled from "styled-components";
import { Status, Priority } from "../../tasks";

export const StatusBadgeDiv = styled.span<{ status: Status }>`
  color: darkslategrey;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 15px;
  background-color: ${({ status }) => {
    switch (status) {
      case "Not Started":
        return "rgb(250, 215, 158)";
      case "In Progress":
        return "rgb(132, 156, 194)";
      case "Completed":
        return "rgb(198, 250, 208)";
      default:
        return "rgb(220, 220, 220)";
    }
  }};
`;
// | "Not Started"
// | "In Progress"
// | "Awaiting Confirmation / Approval"
// | "Abandoned"
// | "Completed";

export const PriorityBadgeDiv = styled.span<{ priority: Priority }>`
  color: darkslategrey;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 15px;
  background-color: ${({ priority }) => {
    if (priority === "Low") {
      return "rgb(207, 223, 255)";
    } else if (priority === "Medium") {
      return "rgb(198, 250, 208)";
    } else if (priority === "High") {
      return "rgb(250, 215, 158)";
    } else {
      return "rgb(250, 199, 211)";
    }
  }};
`;
