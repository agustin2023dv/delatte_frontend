// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/app/context/AuthContext';
import AppNavigator from './src/app/navigation/AppNavigator';

/**
 * Punto de entrada principal de la aplicación.
 * 
 * Envuelve toda la app con el contexto de autenticación (`AuthProvider`),
 * y configura el contenedor de navegación (`NavigationContainer`).
 * 
 * La lógica de navegación condicional según el rol o estado de sesión
 * está encapsulada en `AppNavigator`.
 */
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
