// src/app/(auth)/reset-password.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useResetPassword } from '@features/auth/hooks/useResetPassword';
import DelatteButton from '@shared/components/ui/DelatteButton';

const ResetPasswordScreen = () => {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const {
    handleResetPassword,
    loading,
    successMessage,
    errorMessage,
  } = useResetPassword();

  const onSubmit = async () => {
    if (!token) {
      Alert.alert('Token faltante', 'No se encontró un token de recuperación válido.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (newPassword.length < 7) {
      Alert.alert('Contraseña insegura', 'Debe tener al menos 7 caracteres.');
      return;
    }

    await handleResetPassword({ token, newPassword, confirmNewPassword });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer contraseña</Text>
      <Text style={styles.subtitle}>Ingresá tu nueva contraseña y confirmala.</Text>

      <TextInput
        placeholder="Nueva contraseña"
        secureTextEntry
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        placeholder="Confirmar nueva contraseña"
        secureTextEntry
        style={styles.input}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      <DelatteButton
        title={loading ? 'Procesando...' : 'Restablecer'}
        onPress={onSubmit}
        disabled={loading}
      />

      {successMessage && <Text style={styles.success}>{successMessage}</Text>}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <DelatteButton
        title="← Volver al login"
        onPress={() => router.push('/(auth)/login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default ResetPasswordScreen;
