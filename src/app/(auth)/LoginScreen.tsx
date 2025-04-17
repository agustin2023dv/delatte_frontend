// src/app/(auth)/LoginScreen.tsx

/**
 * 🧩 Pantalla `LoginScreen`
 *
 * Permite iniciar sesión como cliente o manager mediante:
 * - Google OAuth 2.0
 * - Email y contraseña (login tradicional)
 *
 * 🔐 Usa hooks reutilizables:
 *    - `useOAuth` para obtener token de Google
 *    - `useGoogleOAuthLogin` para enviar el token al backend
 *    - `useLogin` para login con email/contraseña
 * 📦 El backend se encarga de detectar el rol del usuario
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
import { useGoogleOAuthLogin } from '@features/auth/hooks/useGoogleOAuthLogin';
import { useLogin } from '@features/auth/hooks/useLogin';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const router = useRouter();

  const { startAuthentication } = useOAuth(onGoogleLogin);
  const { handleGoogleLogin } = useGoogleOAuthLogin();
  const { handleLogin, loading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onGoogleLogin(accessToken: string) {
    try {
      await handleGoogleLogin(accessToken);
    } catch (_) {
      // El error ya fue mostrado en el hook
    }
  }

  const onLoginWithCredentials = async () => {
    try {
      await handleLogin({ email, password });
    } catch {
      Alert.alert('Error de inicio de sesión', error || 'Verifica tus datos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

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

      <TouchableOpacity onPress={() => router.push('/(auth)/ForgotPasswordScreen')}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <DelatteButton
        title={loading ? 'Cargando...' : 'Iniciar sesión'}
        onPress={onLoginWithCredentials}
        disabled={loading}
      />

      <DelatteButton title="Continuar con Google" onPress={startAuthentication} />

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
