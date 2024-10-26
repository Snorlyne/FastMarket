import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import authService from "../AuthService";

interface AuthContextProps {
  isAuthenticated: boolean;
  logout: () => void;
  login: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const checkToken = async () => {
      const token = await authService.getToken();
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    history.push("/dashboard");
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
