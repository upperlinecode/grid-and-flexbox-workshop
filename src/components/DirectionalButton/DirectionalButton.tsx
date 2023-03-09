import React from "react";
import { Button } from "./DirectionalButton.styles";
import { Direction } from "./DirectionalButton.types";

interface Props {
  direction: Direction;
  kind: "card" | "column";
  onClick: React.HTMLAttributes<HTMLButtonElement>["onClick"];
}

const directionMap: { [key in Props["direction"]]: string } = {
  up: "^",
  down: "^",
  left: "<",
  right: ">",
};

const DirectionalButton = ({ direction, kind, onClick }: Props) => {
  const text = `Move ${kind} ${direction}`;
  return (
    <Button aria-label={text} direction={direction} onClick={onClick} title={text}>
      {directionMap[direction]}
    </Button>
  );
};

export default DirectionalButton;
