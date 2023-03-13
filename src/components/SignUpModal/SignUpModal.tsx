import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button.styles";
import { Form } from "../Form/Form.styles";
import Modal from "../Modal/Modal";

interface Props {
  isOpen?: boolean;
  handleClose: () => void;
}

const SignUpModal = ({ handleClose, isOpen }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [hasFailedSubmit, setHasFailedSubmit] = useState(false);
  const close = () => {
    handleClose();
    // reset to initial state
    reset();
    setHasFailedSubmit(false);
  };
  const onSubmit = (data: any) => {
    console.log("TODO: SIGNUP API CALL");
  };

  return (
    <Modal isOpen={!!isOpen} handleClose={close} header="Sign Up">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true })} />

        <label>First Name</label>
        <input type="text" {...register("firstName", { required: true })} />

        <label>Last Name</label>
        <input type="text" {...register("lastName", { required: true })} />

        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />

        <label>Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: true,
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Confirm Password must match Password";
              }
            },
          })}
        />

        <Button kind="add" type="submit">
          Sign Up
        </Button>

        {hasFailedSubmit && <p>Failed submit</p>}
      </Form>
    </Modal>
  );
};

export default SignUpModal;
