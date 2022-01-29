import { Task } from "../../tasks";
import { TableViewRoot } from "./TableView.styles";

const TableView = (props: { allTasks: Task[] }) => {
  const { allTasks } = props;

  return (
    <TableViewRoot>
      <div className="table">
        <div className="row">
          <div className="headerCell">Task Name</div>
          <div className="headerCell">Owner</div>
          <div className="headerCell">Description</div>
          <div className="headerCell">Priority</div>
          <div className="headerCell">Status</div>
          <div className="headerCell">Budget</div>
          <div className="headerCell">Spent</div>
          <div className="headerCell">Left</div>
        </div>
        {allTasks.map((task) => (
          <div className="row">
            <div className="cell">{task.taskName}</div>
            <div className="cell">{task.owner}</div>
            <div className="cell">{task.description}</div>
            <div className="cell">{task.priority}</div>
            <div className="cell">{task.status}</div>
            <div className="cell">${task.budget.toLocaleString()}</div>
            <div className="cell">${task.spent.toLocaleString()}</div>
            <div className="cell">${task.remainingSpend.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </TableViewRoot>
  );
};

export default TableView;
