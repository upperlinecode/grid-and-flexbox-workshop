import styled from "styled-components";
import { Direction } from "./DirectionalButton.types";

const HORIZONTAL = ["up", "down"];
const VERTICAL = ["left", "right"];

export const Button = styled.button<{ direction: Direction }>`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  position: absolute;
  top: ${({ direction }) => (direction === "down" ? "calc(100% - 18px)" : "2px")};
  left: ${({ direction }) =>
    direction === "right" ? "calc(100% - 18px)" : direction === "left" ? "2px" : "18px"};
  padding: 0;
  height: ${({ direction }) => (VERTICAL.indexOf(direction) !== -1 ? "calc(100% - 4px)" : "16px")};
  width: ${({ direction }) =>
    HORIZONTAL.indexOf(direction) !== -1 ? "calc(100% - 36px)" : "16px"};
  ${(props) => (props.direction === "down" ? "transform: rotate(180deg);" : "")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
