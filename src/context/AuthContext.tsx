/**
 * Contexto global de autenticación para la app móvil.
 *
 * 🔐 Centraliza el manejo de sesión:
 * - Guarda el token JWT y los datos del usuario autenticado
 * - Persiste el token usando SecureStore
 * - Expone `login()` y `logout()` para modificar la sesión
 * - Provee un hook `useAuthContext` para acceso seguro desde componentes
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {jwtDecode} from 'jwt-decode';
import { IAuthenticatedUser } from '../core/types/IAuthenticatedUser';
import {
  clearToken,
  getToken,
  saveToken,
} from '../app/features/auth/services/authService';

/**
 * Estructura del contexto de autenticación global.
 * Almacena un usuario autenticado y su token JWT.
 */
type AuthContextType = {
  user: IAuthenticatedUser | null;
  token: string | null;
  isLoading: boolean; // ⏳ Indica si se está cargando el token al iniciar
  login: (userData: IAuthenticatedUser, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Proveedor global de autenticación.
 * Inicializa el token desde almacenamiento seguro (SecureStore) al montar.
 * Expone `login` y `logout` para modificar el estado.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Recupera el token almacenado localmente al iniciar la app
   * para mantener la sesión persistente (sin re-login manual).
   */
  useEffect(() => {
    const loadStoredToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        try {
          const decodedUser: IAuthenticatedUser = jwtDecode(storedToken);
          setUser(decodedUser);
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          await clearToken();
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    loadStoredToken();
  }, []);

  /**
   * Establece el usuario autenticado y guarda el token localmente.
   * Se llama después de un login exitoso.
   */
  const login = async (userData: IAuthenticatedUser, token: string) => {
    setUser(userData);
    setToken(token);
    await saveToken(token); // Persistencia en SecureStore
  };

  /**
   * Cierra la sesión eliminando datos locales y token persistido.
   * Ideal para logout manual o expiración de sesión.
   */
  const logout = async () => {
    setUser(null);
    setToken(null);
    await clearToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para consumir el contexto de autenticación.
 * Protege contra el uso fuera del `AuthProvider`.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return context;
};
