/**
 * 🧾 Pantalla `RegisterScreen`
 *
 * Permite registrar un nuevo usuario con rol `customer`, de forma:
 * - Manual: completando nombre, apellido, email y contraseña
 * - OAuth: mediante Google
 *
 * ⚠️ Usuarios con rol "manager" deben registrarse en otro formulario exclusivo.
 */

// src/features/auth/screens/RegisterScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useOAuth } from '@hooks/useOAuth';
import DelatteButton from '@ui/DelatteButton';
import { useNavigation } from '@react-navigation/native';
import { useRegisterUser } from '../features/auth/hooks/useRegisterUser';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { startAuthentication } = useOAuth();
  const { handleRegister, loading, error } = useRegisterUser(); 

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
      console.log("Data a enviar:",nombre,apellido,email,password)
      await handleRegister({
        nombre,
        apellido,
        email,
        password,
      });

      Alert.alert(
        '✅ Registro exitoso',
        'Te enviamos un email para verificar tu cuenta.'
      );

      navigation.navigate('Login');
    } catch {
      Alert.alert(
        'Error al registrarse',
        error || 'Ocurrió un problema inesperado.'
      );
    }
  };

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
        onPress={() => navigation.navigate('Login')}
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

export default RegisterScreen;
