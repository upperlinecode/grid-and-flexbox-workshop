import react from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { useKanban } from "../../context/kanbanContext";
import { useCardCreate } from "../../react-query/useCards";
import Button from "../Button/Button.styles";
import { Form } from "../Form/Form.styles";
import Modal from "../Modal/Modal";

interface Props {
  isOpen?: boolean;
  handleClose: () => void;
  columnId: number | null;
}

const CreateCardModal = ({ handleClose, isOpen, columnId }: Props) => {
  // context
  const { createCard } = useKanban();
  // react-query
  const createCardMutation = useCardCreate();
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
    const body = { title, description, columnId };
    // await createCard(body);
    await createCardMutation.mutateAsync(body);
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
