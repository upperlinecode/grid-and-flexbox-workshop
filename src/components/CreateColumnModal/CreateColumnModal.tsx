import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useKanban } from "../../context/kanbanContext";
import { useColumnCreate } from "../../react-query/useColumns";
import Button from "../Button/Button.styles";
import { Form } from "../Form/Form.styles";
import Modal from "../Modal/Modal";

interface Props {
  isOpen?: boolean;
  handleClose: () => void;
  boardId?: number;
}

const CreateColumnModal = ({ handleClose, isOpen, boardId }: Props) => {
  const { createColumn } = useKanban();
  const createColumnMutation = useColumnCreate();
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
    // createColumn(data).then(onClose);
    if (!boardId || !title) {
      return;
    }

    await createColumnMutation.mutate({ title, boardId });
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
