import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { login as loginApi, signUp as signUpApi } from "../utils/api";
import { LoginBody, SignUpBody } from "../utils/apiTypes";
import {
  clearAccessToken,
  getAccessToken,
  isAccessTokenExpired,
  setAccessToken,
} from "../utils/accessTokenStorage";
import { noop } from "../utils/noop";

export interface User {
  email: string;
  exp: number;
  firstName: string;
  iat: number;
  id: string;
  lastName: string;
}

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
  const [user, setUser] = useState<User | null>(defaultContext.user);
  const signUp = (user: SignUpBody) => {
    return signUpApi(user);
  };
  const logout = () => {
    clearAccessToken();
    setUser(null);
  };
  const login = async (credentials: LoginBody) => {
    try {
      const jwt = await loginApi(credentials);
      const accessToken = jwt["access_token"];
      if (!accessToken) {
        throw new Error("No access token");
      }
      setAccessToken(accessToken);
      const userResponse = jwt_decode<User>(accessToken);
      setUser(userResponse);
      return userResponse;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const storedAccessToken = getAccessToken();
    if (storedAccessToken) {
      const storedUser = jwt_decode<User>(storedAccessToken);
      if (isAccessTokenExpired(storedUser.exp)) {
        clearAccessToken();
      } else {
        setUser(storedUser);
      }
    }
  }, []);

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
