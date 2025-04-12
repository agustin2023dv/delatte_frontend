// src/app/navigation/AuthNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../(auth)/LoginScreen';
import RegisterManagerScreen from '../(auth)/RegisterManagerScreen';
import RegisterScreen from '../(auth)/RegisterScreen';
import RegisterRoleSelectorScreen from '../(auth)/RegisterRoleSelectorScreen';
import ForgotPasswordScreen from '../(auth)/ForgotPasswordScreen';
import ResetPasswordScreen from '../(auth)/ResetPasswordScreen';

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
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> 
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

    </Stack.Navigator>
  );
};

export default AuthNavigator;
