import NavMenu from "../NavMenu/NavMenu";
import { useState } from "react";
import TableView from "../TableView/TableView";
import TileView from "../TileView/TileView";
import KanbanView from "../KanbanView/KanbanView";
import { AppDiv } from "./App.styles";
import { allTasks } from "../../tasks";

export type Active = "table" | "kanban" | "tiled" | "gantt";

const App = () => {
  const [active, setActive] = useState<Active>("table");
  console.log(allTasks);

  return (
    <AppDiv>
      <NavMenu setActive={setActive} />
      <main>
        {active === "table" ? (
          <TableView allTasks={allTasks} />
        ) : active === "tiled" ? (
          <TileView allTasks={allTasks} />
        ) : active === "kanban" ? (
          <KanbanView allTasks={allTasks} />
        ) : (
          "Gantt under construction"
        )}
      </main>
    </AppDiv>
  );
};

export default App;
