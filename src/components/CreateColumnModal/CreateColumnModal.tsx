import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button.styles";
import { Form } from "../Form/Form.styles";
import Modal from "../Modal/Modal";

interface Props {
  isOpen?: boolean;
  handleClose: () => void;
  boardId?: number;
}

const CreateColumnModal = ({ handleClose, isOpen, boardId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onClose = () => {
    reset();
    handleClose();
  };
  const onSubmit = async ({ title }: { title?: string }) => {
    if (!boardId || !title) {
      return;
    }

    console.log("TODO: CREATE COLUMN API CALL");

    onClose();
  };

  return (
    <Modal isOpen={!!isOpen} handleClose={onClose} header="New Column">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="column-title">Title</label>
        <input type="text" id="column-title" {...register("title", { required: true })} />

        <Button type="submit">Create Column</Button>
      </Form>
    </Modal>
  );
};

export default CreateColumnModal;
