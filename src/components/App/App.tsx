import Nav from "../Nav/Nav";
import { useState } from "react";
import TableView from "../TableView/TableView";
import TileView from "../TileView/TileView";
import KanbanView from "../KanbanView/KanbanView";
import { AppDiv } from "./App.styles";
import { allTasks } from "../../tasks";
import { AuthProvider } from "../../context/authContext";
import UserHeader from "../UserHeader/UserHeader";
import { KanbanProvider } from "../../context/kanbanContext";
import { GlobalStyle } from "../../utils/GlobalStyle";

export type Active = "table" | "kanban" | "tiled" | "gantt";

const App = () => {
  const [active, setActive] = useState<Active>("table");

  return (
    <AuthProvider>
      <KanbanProvider>
        <GlobalStyle />

        <AppDiv>
          <Nav setActive={setActive} />
          <main>
            {active === "table" ? (
              <TableView allTasks={allTasks} />
            ) : active === "tiled" ? (
              <TileView allTasks={allTasks} />
            ) : active === "kanban" ? (
              <>
                <UserHeader />
                <KanbanView allTasks={allTasks} />
              </>
            ) : (
              "Gantt under construction"
            )}
          </main>
        </AppDiv>
      </KanbanProvider>
    </AuthProvider>
  );
};

export default App;
