// src/app/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { IAuthenticatedUser } from '../../core/types/IAuthenticatedUser';

/**
 * Estado global de autenticación, incluyendo datos mínimos del usuario
 * y su token JWT para llamadas autenticadas.
 */
type AuthContextType = {
  user: IAuthenticatedUser | null;
  token: string | null;
  login: (userData: IAuthenticatedUser, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Proveedor del contexto de sesión. Envuelve la aplicación para compartir
 * el estado de autenticación entre componentes.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IAuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (userData: IAuthenticatedUser, token: string) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al estado de sesión desde cualquier componente.
 * Lanza un error si se usa fuera del provider.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return context;
};
