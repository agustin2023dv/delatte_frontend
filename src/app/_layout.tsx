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
  
    if (!user) {
      router.replace(AUTH_ROUTES.LOGIN);
    } else if (user.role === 'customer') {
      router.replace(CUSTOMER_ROUTES.HOME);
    } else if (user.role === 'manager') {
      router.replace(MANAGER_ROUTES.HOME);
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
