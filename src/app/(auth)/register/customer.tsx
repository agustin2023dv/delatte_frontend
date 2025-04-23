/**
 * 🧾 Pantalla `RegisterCustomer`
 *
 * Permite registrar un nuevo usuario con rol `customer`, de forma:
 * - Manual: completando nombre, apellido, email y contraseña
 * - OAuth: mediante Google
 *
 * ⚠️ Usuarios con rol "manager" deben registrarse en otro formulario exclusivo.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import DelatteButton from '@shared/components/ui/DelatteButton';
import { useRouter } from 'expo-router';
import { useOAuth } from '@shared/hooks/useOAuth';
import { useGoogleOAuthRegister } from '@features/auth/hooks/useGoogleOAuthRegister';
import { useRegisterUser } from '@features/auth/hooks/useRegisterUser';

const RegisterCustomer = () => {
  const router = useRouter();

  const { startAuthentication } = useOAuth(onGoogleRegister);
  const { handleRegister, loading, error } = useRegisterUser();
  const { handleGoogleRegister } = useGoogleOAuthRegister();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const handleManualRegister = async () => {
    if (password !== confirmarPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      await handleRegister({
        nombre,
        apellido,
        email,
        password,
      });

      Alert.alert('✅ Registro exitoso', 'Te enviamos un email para verificar tu cuenta.');
      router.push('/(auth)/login');
    } catch {
      Alert.alert('Error al registrarse', error || 'Ocurrió un problema inesperado.');
    }
  };

  async function onGoogleRegister(accessToken: string) {
    try {
      const newUser = await handleGoogleRegister(accessToken);
      Alert.alert('✅ Registro exitoso', `Te registraste como ${newUser.profile.nombre}`);
      router.push('/(auth)/login');
    } catch (_) {
      // Error ya fue mostrado en el hook
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear cuenta como cliente</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar contraseña"
        style={styles.input}
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
        secureTextEntry
      />

      <DelatteButton
        title={loading ? 'Registrando...' : 'Registrarme manualmente'}
        onPress={handleManualRegister}
        disabled={loading}
      />

      <DelatteButton title="Registrarme con Google" onPress={startAuthentication} />
      <DelatteButton
        title="Ya tengo cuenta"
        onPress={() => router.push('/(auth)/login')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 12,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default RegisterCustomer;
