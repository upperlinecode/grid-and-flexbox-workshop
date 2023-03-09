import React from "react";
import ReactModal from "react-modal";
import { ModalClose, ModalHeader } from "./Modal.styles";

interface Props {
  contentLabel?: string;
  handleClose: () => void;
  header: string;
  isOpen?: boolean;
  children: React.ReactNode;
}

const Modal = ({ handleClose, header, isOpen, contentLabel, children }: Props) => {
  return (
    <ReactModal
      appElement={document.getElementById("root") || undefined}
      isOpen={!!isOpen}
      onRequestClose={handleClose}
      contentLabel={header || contentLabel}
    >
      <ModalHeader>
        <h1>{header}</h1>

        <ModalClose aria-label="Close" onClick={handleClose} title="Close">
          x
        </ModalClose>
      </ModalHeader>

      {children}
    </ReactModal>
  );
};

export default Modal;
