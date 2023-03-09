import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import Button from "../Button/Button.styles";
import { Form } from "../Form/Form.styles";
import Modal from "../Modal/Modal";

interface Props {
  isOpen?: boolean;
  handleClose: () => void;
}

const LoginModal = ({ handleClose, isOpen }: Props) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [failedLogin, setFailedLogin] = useState(false);
  const close = () => {
    handleClose();
    // reset to initial state
    reset();
    setFailedLogin(false);
  };
  const onSubmit = (data: any) => {
    login(data).then((user) => {
      if (user) {
        close();
      } else {
        setFailedLogin(true);
      }
    });
  };

  return (
    <Modal isOpen={!!isOpen} handleClose={close} header="Log In">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("username", { required: true })} />

        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />

        <Button kind="add" type="submit">
          Log In
        </Button>

        {failedLogin && <p>Login failed</p>}
      </Form>
    </Modal>
  );
};

export default LoginModal;
