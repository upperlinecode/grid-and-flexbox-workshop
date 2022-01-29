import { allTasks, Task } from "../../tasks";
import { TileViewRoot } from "./TileView.styles";
import Card from "../Card/Card";

function TileView(props: { allTasks: Task[] }) {
  return (
    <TileViewRoot>
      {allTasks.map((taskData) => (
        <Card task={taskData} />
      ))}
    </TileViewRoot>
  );
}

export default TileView;
