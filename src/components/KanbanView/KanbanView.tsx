import { Task, Status, allTasks } from "../../tasks";
import StatusBadge from "../Badges/StatusBadge";
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
      {viableStatus.map((status) => (
        <Column>
          <span>
            Status: <StatusBadge status={status} />
          </span>
          {allTasks
            .filter((task) => task.status === status)
            .map((task: Task) => (
              <Card task={task} full={false} />
            ))}
        </Column>
      ))}
    </KanbanViewRoot>
  );
};

export default KanbanView;
