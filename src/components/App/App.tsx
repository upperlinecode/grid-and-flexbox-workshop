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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type Active = "table" | "kanban" | "tiled" | "gantt";

const DEFAULT_ACTIVE: Active = "kanban";

const queryClient = new QueryClient();

const App = () => {
  const [active, setActive] = useState<Active>(DEFAULT_ACTIVE);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

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
                  <KanbanView />
                </>
              ) : (
                "Gantt under construction"
              )}
            </main>
          </AppDiv>
        </KanbanProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
