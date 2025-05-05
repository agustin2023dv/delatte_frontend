// src/app/_layout.tsx

/**
 * 🎯 Entry point global de navegación
 * Determina el grupo de navegación que se debe renderizar
 * según el estado de autenticación del usuario.
 *
 * - (auth): si el usuario no está logueado
 * - (customer): si es cliente
 * - (manager): si es manager de restaurante
 */

import { AUTH_ROUTES } from '@shared/constants/routes.auth';
import { CUSTOMER_ROUTES } from '@shared/constants/routes.customer';
import {MANAGER_ROUTES } from '@shared/constants/routes.manager';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuthContext } from 'src/core/context/AuthContext';
import { ThemeProvider } from 'src/theme/ThemeProvider';

function RootContent() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
  
    if (!user || !user.role) {
      console.log('Redirigiendo a login...');
      router.replace(AUTH_ROUTES.LOGIN);
    } else if (user.role === 'customer') {
      console.log('Redirigiendo a home de cliente...');
      router.replace(CUSTOMER_ROUTES.HOME);
    } else if (user.role === 'manager') {
      console.log('Redirigiendo a home de manager...');
      router.replace(MANAGER_ROUTES.HOME);
    } else {
      console.warn('Rol desconocido:', user.role);
      router.replace(AUTH_ROUTES.LOGIN); // Redirige al login si el rol es desconocido
    }
  }, [user, isLoading]);
  
  

  return <Slot />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <RootContent />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
