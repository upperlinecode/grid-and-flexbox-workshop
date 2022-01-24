import { Task } from "../../tasks";
import PriorityBadge from "../Badges/PriorityBadge";
import StatusBadge from "../Badges/StatusBadge";
import { TableViewDiv, ScrollingTable } from "./TableView.styles";

const TableView = (props: { allTasks: Task[] }) => {
  const { allTasks } = props;

  return (
    <TableViewDiv>
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
            <td>
              <PriorityBadge priority={task.priority} />
            </td>
            <td>
              <StatusBadge status={task.status} />
            </td>
            <td>${task.budget.toLocaleString()}</td>
            <td>${task.spent.toLocaleString()}</td>
            <td>${task.remainingSpend.toLocaleString()}</td>
          </tr>
        ))}
      </ScrollingTable>
    </TableViewDiv>
  );
};

export default TableView;
