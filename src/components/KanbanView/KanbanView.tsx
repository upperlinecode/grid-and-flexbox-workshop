import { useState } from "react";
import { useKanban } from "../../context/kanbanContext";
import { Task, Status, allTasks } from "../../tasks";
import StatusBadge from "../Badges/StatusBadge";
import Card from "../Card/Card";
import CreateCardModal from "../CreateCardModal/CreateCardModal";
import CreateColumnModal from "../CreateColumnModal/CreateColumnModal";
import Button from "../Button/Button.styles";
import DirectionalButton from "../DirectionalButton/DirectionalButton";
import { KanbanViewRoot, Column, ColumnHeader, CreateRow } from "./KanbanView.styles";
import { useAuth } from "../../context/authContext";
import useBoard from "../../react-query/useBoards";
import { useColumns, useColumnUpdate } from "../../react-query/useColumns";
import KanbanColumn from "../KanbanColumn/KanbanColumn";
import { useCardUpdate } from "../../react-query/useCards";
import { UpdateCardBody } from "../../utils/apiTypes";

const KanbanView = () => {
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
  const [createCardColumnId, setCreateCardColumnId] = useState<number | null>(null);

  const { isLoggedIn } = useAuth();
  // Context
  const { kanbanState, deleteCard, deleteColumn, moveCard, moveColumn } = useKanban();
  // react-query
  const { data, isFetched } = useBoard();
  const { data: columnData, isFetched: isColumnFetched } = useColumns(data?.id);
  const columnUpdateMutation = useColumnUpdate();
  // const cardQuery = useCards(columnQuery.data?.[0]?.id);

  if (!isFetched || !isColumnFetched) {
    return null;
  }

  // Context
  // const columns = kanbanState?.columns || [];
  // react-query
  const columns = columnData || [];

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
        boardId={data?.id}
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
                  columnUpdateMutation.mutate({
                    id: column.id,
                    data: {
                      previousColumnId: previousPreviousColumnId,
                      nextColumnId: previousColumnId,
                    },
                  });
                }
              : undefined;
          const handleMoveRight =
            typeof nextColumnId === "number"
              ? () => {
                  columnUpdateMutation.mutate({
                    id: column.id,
                    data: {
                      previousColumnId: nextColumnId,
                      nextColumnId: nextNextColumnId,
                    },
                  });
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

      {/* <KanbanViewRoot>
        {columns.map((column, columnIndex) => {
          const previousColumn = columns[columnIndex - 1];
          const previousPreviousColumn = columns[columnIndex - 2];
          const nextColumn = columns[columnIndex + 1];
          const nextNextColumn = columns[columnIndex + 2];

          return (
            <Column key={column.id}>
              <ColumnHeader>
                {column.title}

                {isLoggedIn && (
                  <Button kind="delete" onClick={() => deleteColumn(column.id)}>
                    Delete
                  </Button>
                )}
              </ColumnHeader>

              {isLoggedIn && (
                <Button kind="add" onClick={() => setCreateCardColumnId(column.id)}>
                  Add Card
                </Button>
              )}

              {isLoggedIn && columnIndex !== 0 && (
                <DirectionalButton
                  direction="left"
                  kind="column"
                  onClick={() => {
                    moveColumn(column.id, previousPreviousColumn?.id || null, previousColumn.id);
                  }}
                />
              )}
              {isLoggedIn && columnIndex !== columns.length - 1 && (
                <DirectionalButton
                  direction="right"
                  kind="column"
                  onClick={() => {
                    moveColumn(column.id, nextColumn.id, nextNextColumn?.id || null);
                  }}
                />
              )}

              {column.cards.map((card, cardIndex) => {
                const previousCard = column.cards[cardIndex - 1];
                const previousPreviousCard = column.cards[cardIndex - 2];
                const nextCard = column.cards[cardIndex + 1];
                const nextNextCard = column.cards[cardIndex + 2];

                return (
                  <Card
                    key={card.id}
                    task={{ id: card.id, taskName: card.title, description: card.description }}
                    handleDelete={isLoggedIn ? () => deleteCard(column.id, card.id) : undefined}
                    handleLeft={
                      isLoggedIn && previousColumn
                        ? () =>
                            moveCard(
                              card.id,
                              previousColumn.id,
                              previousColumn.cards[previousColumn.cards.length - 1]?.id ?? null,
                              null
                            )
                        : undefined
                    }
                    handleRight={
                      isLoggedIn && nextColumn
                        ? () =>
                            moveCard(
                              card.id,
                              nextColumn.id,
                              nextColumn.cards[nextColumn.cards.length - 1]?.id ?? null,
                              null
                            )
                        : undefined
                    }
                    handleUp={
                      isLoggedIn && previousCard
                        ? () =>
                            moveCard(
                              card.id,
                              card.columnId,
                              previousPreviousCard?.id ?? null,
                              previousCard.id
                            )
                        : undefined
                    }
                    handleDown={
                      isLoggedIn && nextCard
                        ? () => {
                            moveCard(card.id, card.columnId, nextCard.id, nextNextCard?.id ?? null);
                          }
                        : undefined
                    }
                    full={false}
                  />
                );
              })}
            </Column>
          );
        })}
      </KanbanViewRoot> */}
    </>
  );
};

export default KanbanView;
