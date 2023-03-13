import React from "react";
import { Card as CardType, Column } from "../../utils/apiTypes";
import { ColumnHeader, ColumnRoot } from "./KanbanColumn.styles";
import Card from "../Card/Card";
import Button from "../Button/Button.styles";
import DirectionalButton from "../DirectionalButton/DirectionalButton";

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
  const isLoggedIn = false; // TODO: REPLACE WITH AUTH CONTEXT
  const cards: CardType[] | undefined = [];
  const previousColumnCards: CardType[] | undefined = [];
  const nextColumnCards: CardType[] | undefined = [];

  const handleColumnDelete = () => {
    console.log("TODO: DELETE COLUMN API CALL");
  };

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

      {cards &&
        cards.map((card, cardIndex) => {
          const previousCardId = cards[cardIndex - 1]?.id || null;
          const previousPreviousCardId = cards[cardIndex - 2]?.id || null;
          const nextCardId = cards[cardIndex + 1]?.id || null;
          const nextNextCardId = cards[cardIndex + 2]?.id || null;
          const handleCardDelete = () => {
            console.log("TODO: DELETE CARD API CALL");
          };
          const handleCardUp =
            typeof previousCardId === "number"
              ? () => {
                  console.log("TODO: UPDATE CARD API CALL");
                }
              : undefined;
          const handleCardDown =
            typeof nextCardId === "number"
              ? () => {
                  console.log("TODO: UPDATE CARD API CALL");
                }
              : undefined;
          const handleCardLeft =
            previousColumnId && previousColumnCards
              ? () => {
                  console.log("TODO: UPDATE CARD API CALL");
                }
              : undefined;
          const handleCardRight =
            nextColumnId && nextColumnCards
              ? () => {
                  console.log("TODO: UPDATE CARD API CALL");
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
