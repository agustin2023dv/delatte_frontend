// src/app/navigation/AppNavigator.tsx
import React from 'react';
import CustomerNavigator from './CustomerNavigator';
import AuthNavigator from './AuthNavigator';
import ManagerNavigator from './ManagerNavigator';
import { useAuthContext } from '../../context/AuthContext';

/**
 * Determina dinámicamente qué flujo de navegación mostrar
 * según el estado de sesión y el rol del usuario.
 * 
 * - No autenticado → flujo de login y registro
 * - Cliente → navegación de cliente
 * - Manager → navegación de manager de restaurante
 */
const AppNavigator = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <AuthNavigator />;
  }

  switch (user.role) {
    case 'customer':
      return <CustomerNavigator />;
    case 'manager':
      return <ManagerNavigator />;
    default:
      return <AuthNavigator />; 
  }
};

export default AppNavigator;
