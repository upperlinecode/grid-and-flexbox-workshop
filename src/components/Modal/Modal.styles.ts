import styled from "styled-components";

export const ModalClose = styled.button`
  background: transparent;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 0px;
  height: 44px;
  width: 44px;

  &:focus,
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const ModalHeader = styled.header``;
