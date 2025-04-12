/**
 * Punto de entrada principal de la aplicación.
 *
 * Estructura jerárquica de providers:
 * - `ThemeProvider`: gestiona el modo claro/oscuro y variables de diseño.
 * - `AuthProvider`: contexto global de autenticación y sesión de usuario.
 * - `NavigationContainer`: habilita la navegación entre pantallas.
 *
 * Toda la lógica de navegación condicional por rol está contenida en `AppNavigator`.
 */

// src/App.tsx

import React from 'react';
import { ThemeProvider, useThemeContext } from './src/app/theme/ThemeProvider';
import AppNavigator from './src/app/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

const AppContent = () => {
  const { theme } = useThemeContext(); 
  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};
export default App;
