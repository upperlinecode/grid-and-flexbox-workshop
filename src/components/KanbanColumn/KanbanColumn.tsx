import React from "react";
import { Column } from "../../utils/apiTypes";
import { ColumnHeader, ColumnRoot } from "./KanbanColumn.styles";
import Card from "../Card/Card";
import Button from "../Button/Button.styles";
import DirectionalButton from "../DirectionalButton/DirectionalButton";
import { useAuth } from "../../context/authContext";
import { useColumnDelete } from "../../react-query/useColumns";
import { useCardDelete, useCards, useCardUpdate } from "../../react-query/useCards";

interface Props {
  column: Column;
  previousColumnId: number | null;
  nextColumnId: number | null;
  handleMoveLeft?: () => void;
  handleMoveRight?: () => void;
  handleCreateCard: () => void;
}

export default function KanbanColumn({
  column,
  previousColumnId,
  nextColumnId,
  handleMoveLeft,
  handleMoveRight,
  handleCreateCard,
}: Props) {
  const { isLoggedIn } = useAuth();
  const { data } = useCards(column.id);
  const { data: previousCardData } = useCards(previousColumnId ?? undefined);
  const { data: nextCardData } = useCards(nextColumnId ?? undefined);
  const deleteColumnMutation = useColumnDelete();
  const deleteCardMutation = useCardDelete();
  const updateCardMutation = useCardUpdate();

  const handleColumnDelete = () => deleteColumnMutation.mutate(column.id);

  return (
    <ColumnRoot>
      <ColumnHeader>
        {column.title}

        {isLoggedIn && (
          <Button kind="delete" onClick={handleColumnDelete}>
            Delete
          </Button>
        )}
      </ColumnHeader>

      {isLoggedIn && (
        <Button kind="add" onClick={handleCreateCard}>
          Add Card
        </Button>
      )}

      {isLoggedIn && handleMoveLeft && (
        <DirectionalButton direction="left" kind="column" onClick={handleMoveLeft} />
      )}

      {isLoggedIn && handleMoveRight && (
        <DirectionalButton direction="right" kind="column" onClick={handleMoveRight} />
      )}

      {data &&
        data.map((card, cardIndex) => {
          const previousCardId = data[cardIndex - 1]?.id || null;
          const previousPreviousCardId = data[cardIndex - 2]?.id || null;
          const nextCardId = data[cardIndex + 1]?.id || null;
          const nextNextCardId = data[cardIndex + 2]?.id || null;
          const handleCardDelete = () => {
            console.log("TODO");
            deleteCardMutation.mutate(card.id);
          };
          const handleCardUp =
            typeof previousCardId === "number"
              ? () => {
                  console.log("TODO");
                  updateCardMutation.mutate({
                    id: card.id,
                    data: {
                      columnId: card.columnId,
                      previousCardId: previousPreviousCardId,
                      nextCardId: previousCardId,
                    },
                    currentColumnId: card.columnId,
                  });
                }
              : undefined;
          const handleCardDown =
            typeof nextCardId === "number"
              ? () => {
                  console.log("TODO");
                  updateCardMutation.mutate({
                    id: card.id,
                    data: {
                      columnId: card.columnId,
                      previousCardId: nextCardId,
                      nextCardId: nextNextCardId,
                    },
                    currentColumnId: card.columnId,
                  });
                }
              : undefined;
          const handleCardLeft =
            previousColumnId && previousCardData
              ? () => {
                  console.log("TODO");
                  updateCardMutation.mutate({
                    id: card.id,
                    data: {
                      columnId: previousColumnId,
                      previousCardId: previousCardData[previousCardData.length - 1]?.id ?? null,
                      nextCardId: null,
                    },
                    currentColumnId: card.columnId,
                  });
                }
              : undefined;
          const handleCardRight =
            nextColumnId && nextCardData
              ? () => {
                  console.log("TODO");
                  updateCardMutation.mutate({
                    id: card.id,
                    data: {
                      columnId: nextColumnId,
                      previousCardId: nextCardData[nextCardData.length - 1]?.id ?? null,
                      nextCardId: null,
                    },
                    currentColumnId: card.columnId,
                  });
                }
              : undefined;

          return (
            <Card
              key={card.id}
              task={{ id: card.id, taskName: card.title, description: card.description }}
              handleDelete={isLoggedIn ? handleCardDelete : undefined}
              handleLeft={isLoggedIn ? handleCardLeft : undefined}
              handleRight={isLoggedIn ? handleCardRight : undefined}
              handleUp={isLoggedIn ? handleCardUp : undefined}
              handleDown={isLoggedIn ? handleCardDown : undefined}
              full={false}
            />
          );
        })}
    </ColumnRoot>
  );
}
