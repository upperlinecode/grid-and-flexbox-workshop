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

const KanbanView = (props: { allTasks: Task[] }) => {
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
  const [createCardColumnId, setCreateCardColumnId] = useState<number | null>(null);
  const { kanbanState, deleteCard, deleteColumn, moveCard, moveColumn } = useKanban();
  const { isLoggedIn } = useAuth();
  const columns = kanbanState?.columns || [];
  // Let's assume Status isn't user-defined, but rather platform universal
  // We'll make columns for "Not Started", "In Progress", "Awaiting Approval", and "Completed";
  // We'll skip over "Abandoned" as it's not likely to be useful to display here.
  const viableStatus: Status[] = ["Not Started", "In Progress", "Awaiting Approval", "Completed"];

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
      />

      <CreateCardModal
        isOpen={createCardColumnId !== null}
        handleClose={() => setCreateCardColumnId(null)}
        columnId={createCardColumnId}
      />

      <KanbanViewRoot>
        {columns.map((column, columnIndex) => {
          const previousColumn = columns[columnIndex - 1];
          const previousPreviousColumn = columns[columnIndex - 2];
          const nextColumn = columns[columnIndex + 1];
          const nextNextColumn = columns[columnIndex + 2];

          return (
            <Column key={column.id}>
              <ColumnHeader>
                {/* Status: <StatusBadge status={column.title} /> */}
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
                    task={{ taskName: card.title, description: card.description } as any}
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
        {/* {viableStatus.map((status) => (
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
        ))} */}
      </KanbanViewRoot>
    </>
  );
};

export default KanbanView;
