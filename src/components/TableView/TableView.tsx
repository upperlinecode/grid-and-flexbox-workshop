import { Task } from "../../tasks";
import PriorityBadge from "../Badges/PriorityBadge";
import StatusBadge from "../Badges/StatusBadge";
import { TableViewRoot, ScrollingTable, NoWrapCell } from "./TableView.styles";

const TableView = (props: { allTasks: Task[] }) => {
  const { allTasks } = props;

  return (
    <TableViewRoot>
      <ScrollingTable>
        <tr>
          <th>Task Name</th>
          <th>Owner</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Budget</th>
          <th>Spent</th>
          <th>Left</th>
        </tr>
        {allTasks.map((task) => (
          <tr>
            <td>{task.taskName}</td>
            <td>{task.owner}</td>
            <td>{task.description}</td>
            <NoWrapCell>
              <PriorityBadge priority={task.priority} />
            </NoWrapCell>
            <NoWrapCell>
              <StatusBadge status={task.status} />
            </NoWrapCell>
            <td>${task.budget.toLocaleString()}</td>
            <td>${task.spent.toLocaleString()}</td>
            <td>${task.remainingSpend.toLocaleString()}</td>
          </tr>
        ))}
      </ScrollingTable>
    </TableViewRoot>
  );
};

export default TableView;
