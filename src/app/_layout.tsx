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

import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuthContext } from 'src/context/AuthContext';
import { ThemeProvider } from 'src/theme/ThemeProvider';

function RootContent() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace('/(auth)/login');
    } else if (user.role === 'customer') {
      router.replace('/(customer)/home');
    } else if (user.role === 'manager') {
      router.replace('/(manager)/home');
    }
  }, [user, isLoading]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
