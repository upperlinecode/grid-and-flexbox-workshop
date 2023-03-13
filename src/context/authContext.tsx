import React, { createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
import { LoginBody, SignUpBody, User } from "../utils/apiTypes";
import { noop } from "../utils/noop";

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

const defaultContext = {
  user: null,
  login: noop,
  signUp: noop,
  logout: noop,
  isLoggedIn: false,
};
const AuthContext = createContext<{
  user: null | User;
  login: (credentials: LoginBody) => Promise<User | null>;
  signUp: (user: SignUpBody) => Promise<{ isSuccess: boolean }>;
  logout: () => void;
  isLoggedIn: boolean;
}>(defaultContext);

function AuthProvider(props: { children: React.ReactNode }) {
  const user = null as User | null;
  const signUp = async (user: SignUpBody) => {
    console.log("TODO: ADD SIGNUP FUNCTIONALITY");
    return { isSuccess: false };
  };
  const login = async (credentials: LoginBody) => {
    console.log("TODO: ADD LOGIN FUNCTIONALITY");
  };
  const logout = () => {
    console.log("TODO: ADD LOGOUT FUNCTIONALITY");
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, isLoggedIn: Boolean(user) }}>
      {props.children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
