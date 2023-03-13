import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button.styles";
import { Form } from "../Form/Form.styles";
import Modal from "../Modal/Modal";

interface Props {
  isOpen?: boolean;
  handleClose: () => void;
  columnId: number | null;
}

const CreateCardModal = ({ handleClose, isOpen, columnId }: Props) => {
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
  const onSubmit = async ({ title, description }: { title?: string; description?: string }) => {
    if (!title || !columnId) {
      throw new Error("Required fields missing");
    }

    console.log("TODO: CREATE CARD API CALL");

    onClose();
  };

  return (
    <Modal isOpen={!!isOpen} handleClose={onClose} header="New Card">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="card-title">Title</label>
        <input type="text" id="card-title" {...register("title", { required: true })} />

        <label htmlFor="card-description">Description</label>
        <input type="text" id="card-description" {...register("description")} />

        <Button kind="add" type="submit">
          Create Card
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateCardModal;
