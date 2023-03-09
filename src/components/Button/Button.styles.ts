import styled from "styled-components";

type ButtonKind = "add" | "delete";

const COLOR_KIND_MAP = {
  add: "forestgreen",
  delete: "firebrick",
};

const Button = styled.button<{ kind?: ButtonKind }>`
  background-color: transparent;
  border: 0;
  border-radius: 4px;
  color: ${({ kind }) => (kind ? COLOR_KIND_MAP[kind] ?? "black" : "black")};
  cursor: pointer;
  padding: 4px 8px;

  &:focus,
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export default Button;
