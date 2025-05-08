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
import { jwtDecode } from 'jwt-decode';
import { IAuthenticatedUser } from '../types/IAuthenticatedUser';
import { IUserRole } from '@delatte/shared/interfaces/User/IUserRole';
import {
  clearToken,
  getToken,
  saveToken,
} from '../../features/auth/services/authService';

/**
 * Estructura del contexto de autenticación global.
 * Almacena un usuario autenticado y su token JWT.
 */
type AuthContextType = {
  user: IAuthenticatedUser | null;
  token: string | null;
  isLoading: boolean; // ⏳ Indica si se está cargando el token al iniciar
  userRole: IUserRole['role'] | null; // ✅ Derivado automáticamente del user
  userId: string | null; // ✅ Derivado automáticamente del user
  login: (userData: IAuthenticatedUser, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Valida si el token JWT no está expirado.
 */
const isTokenValid = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

/**
 * Proveedor global de autenticación.
 * Inicializa el token desde almacenamiento seguro (SecureStore) al montar.
 * Expone `login` y `logout` para modificar el estado.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IAuthenticatedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoredToken = async () => {
      const storedToken = await getToken();
      if (storedToken && isTokenValid(storedToken)) {
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
      } else {
        await clearToken();
        setToken(null);
        setUser(null);
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

  // 🔁 Derivados útiles
  const userId: string | null = user?._id ?? null;
  const userRole: IUserRole['role'] | null = user?.role ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        userRole,
        userId,
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
