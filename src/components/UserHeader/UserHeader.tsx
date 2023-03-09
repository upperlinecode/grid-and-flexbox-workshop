import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import Button from "../Button/Button.styles";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import { AuthHeading, Header, Heading } from "./UserHeader.styles";

const UserHeader = () => {
  const { user, logout } = useAuth();
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <Header>
        {user ? (
          <Heading>
            Welcome {user.firstName} <Button onClick={logout}>Log Out</Button>
          </Heading>
        ) : (
          <AuthHeading>
            <Button onClick={() => setIsSignUpModalOpen(true)}>Sign Up</Button>
            <Button onClick={() => setIsLoginModalOpen(true)}>Log In</Button>
          </AuthHeading>
        )}
      </Header>

      <SignUpModal isOpen={isSignUpModalOpen} handleClose={() => setIsSignUpModalOpen(false)} />

      <LoginModal isOpen={isLoginModalOpen} handleClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default UserHeader;
