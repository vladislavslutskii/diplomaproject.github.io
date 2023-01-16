import React, { createContext, FC, ReactNode, useContext } from "react";

const DEFAULT_VALUE = {};

const AuthContext = createContext(DEFAULT_VALUE);

type ThemeProviderProps = {
  children: ReactNode;
  value: any;
};

const AuthProvider: FC<ThemeProviderProps> = ({ children, value }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthValue = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
