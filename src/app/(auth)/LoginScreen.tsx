// src/app/(auth)/LoginScreen.tsx

/**
 * 🧩 Pantalla `LoginScreen`
 *
 * Permite iniciar sesión como cliente o manager mediante:
 * - Google OAuth 2.0
 * - Email y contraseña (login tradicional)
 *
 * 🔐 Usa hooks reutilizables:
 *    - `useOAuth` para login/register con Google
 *    - `useLogin` para login con email/contraseña (cualquier rol)
 * 📦 El backend se encarga de detectar el rol del usuario
 * 🔁 Actualiza el `AuthContext` global con los datos de sesión
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DelatteButton from '@shared/components/ui/DelatteButton';
import { useOAuth } from '@shared/hooks/useOAuth';
import { useRouter } from 'expo-router';
import { useLogin } from '@features/auth/hooks/useLogin';

const LoginScreen = () => {
  const router = useRouter();
  console.log('Router:', router);
  const { startAuthentication } = useOAuth();
  const { handleLogin, loading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginWithCredentials = async () => {
    try {
      await handleLogin({ email, password });
      // ✅ El AuthContext redirige automáticamente según el rol
    } catch {
      Alert.alert('Error de inicio de sesión', error || 'Verifica tus datos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* 🧾 Login tradicional */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* 🔗 Recuperar contraseña */}
      <TouchableOpacity onPress={() => router.push('/(auth)/ForgotPasswordScreen')}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* 🔘 Botones de acción */}
      <DelatteButton
        title={loading ? 'Cargando...' : 'Iniciar sesión'}
        onPress={onLoginWithCredentials}
        disabled={loading}
      />

      {/* 🔐 Login con Google */}
      <DelatteButton title="Continuar con Google" onPress={startAuthentication} />

      {/* 🆕 Ir a registro */}
      <DelatteButton
        title="¿No tenés cuenta? Crear cuenta"
        onPress={() => router.push('/(auth)/RegisterRoleSelectorScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  forgotText: {
    color: '#007BFF',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
  },
});

export default LoginScreen;
