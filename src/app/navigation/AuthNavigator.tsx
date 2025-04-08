// src/app/navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterManagerScreen from '../features/auth/screens/RegisterManagerScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import RegisterRoleSelectorScreen from '../features/auth/screens/RegisterRoleSelectorScreen';

/**
 * Flujo de navegación para usuarios no autenticados.
 * Incluye pantallas como Login y Registro.
 */
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="RegisterManager" component={RegisterManagerScreen} />
    <Stack.Screen name="RegisterSelector" component={RegisterRoleSelectorScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
