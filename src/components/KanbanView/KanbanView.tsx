import { Task, Status, allTasks } from "../../tasks";
import Card from "../Card/Card";
import { KanbanViewRoot, Column } from "./KanbanView.styles";

const KanbanView = (props: { allTasks: Task[] }) => {
  // Let's assume Status isn't user-defined, but rather platform universal
  // We'll make columns for "Not Started", "In Progress", "Awaiting Approval", and "Completed";
  // We'll skip over "Abandoned" as it's not likely to be useful to display here.
  const viableStatus: Status[] = [
    "Not Started",
    "In Progress",
    "Awaiting Approval",
    "Completed",
  ];

  return (
    <KanbanViewRoot>
      <Column>Column 1</Column>
      <Column>Column 2</Column>
      <Column>Column 3</Column>
      <Column>Column 4</Column>
    </KanbanViewRoot>
  );
};

export default KanbanView;
