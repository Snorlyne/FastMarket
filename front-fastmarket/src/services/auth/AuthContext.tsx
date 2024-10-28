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
      if (token) {
        setIsAuthenticated(true);
        history.replace("/dashboard"); // Redirige si hay token
      }
    };
    checkToken();
  }, [history]); // Asegura que se incluya 'history' como dependencia para evitar advertencias de hooks

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    history.replace("/"); // Redirigir al home después de logout
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
