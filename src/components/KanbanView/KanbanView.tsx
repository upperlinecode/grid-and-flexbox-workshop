import { useState } from "react";
import CreateCardModal from "../CreateCardModal/CreateCardModal";
import CreateColumnModal from "../CreateColumnModal/CreateColumnModal";
import Button from "../Button/Button.styles";
import { KanbanViewRoot, CreateRow } from "./KanbanView.styles";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { Column } from "../../utils/apiTypes";
import { DEFAULT_BOARD_ID } from "../../utils/api";

const KanbanView = () => {
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
  const [createCardColumnId, setCreateCardColumnId] = useState<number | null>(null);

  const isLoggedIn = false; // TODO: REPLACE WITH AUTH CONTEXT
  const columns: Column[] = []; // TODO GET COLUMN DATA

  return (
    <>
      {isLoggedIn && (
        <CreateRow>
          <Button kind="add" onClick={() => setIsCreateColumnOpen(true)}>
            Add Column
          </Button>
        </CreateRow>
      )}

      <CreateColumnModal
        isOpen={isCreateColumnOpen}
        handleClose={() => setIsCreateColumnOpen(false)}
        boardId={DEFAULT_BOARD_ID}
      />

      <CreateCardModal
        isOpen={createCardColumnId !== null}
        handleClose={() => setCreateCardColumnId(null)}
        columnId={createCardColumnId}
      />

      <KanbanViewRoot>
        {columns.map((column, columnIndex) => {
          const previousColumnId = columns[columnIndex - 1]?.id || null;
          const previousPreviousColumnId = columns[columnIndex - 2]?.id || null;
          const nextColumnId = columns[columnIndex + 1]?.id || null;
          const nextNextColumnId = columns[columnIndex + 2]?.id || null;

          const handleMoveLeft =
            typeof previousColumnId === "number"
              ? () => {
                  console.log("TODO: MOVE COLUMN LEFT");
                  // columnUpdateMutation.mutate({
                  //   id: column.id,
                  //   data: {
                  //     previousColumnId: previousPreviousColumnId,
                  //     nextColumnId: previousColumnId,
                  //   },
                  // });
                }
              : undefined;
          const handleMoveRight =
            typeof nextColumnId === "number"
              ? () => {
                  console.log("TODO: MOVE COLUMN RIGHT");
                  // columnUpdateMutation.mutate({
                  //   id: column.id,
                  //   data: {
                  //     previousColumnId: nextColumnId,
                  //     nextColumnId: nextNextColumnId,
                  //   },
                  // });
                }
              : undefined;

          return (
            <KanbanColumn
              column={column}
              previousColumnId={previousColumnId}
              nextColumnId={nextColumnId}
              handleMoveLeft={handleMoveLeft}
              handleMoveRight={handleMoveRight}
              handleCreateCard={() => setCreateCardColumnId(column.id)}
            />
          );
        })}
      </KanbanViewRoot>
    </>
  );
};

export default KanbanView;
