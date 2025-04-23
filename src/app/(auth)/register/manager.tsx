import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DelatteButton from '@ui/DelatteButton';
import { useRouter } from 'expo-router';
import { useRegisterRestaurantAndManager } from '../../features/restaurant/hooks/useRegisterRestaurantWithManager';

const RegisterManager = () => {
  const router = useRouter();
  const { handleRegister, loading, error } = useRegisterRestaurantAndManager();

  // 📌 Estado del restaurante
  const [nombreRestaurante, setNombreRestaurante] = useState('');
  const [direccion, setDireccion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  // 👤 Estado del manager
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const onSubmit = async () => {
    if (password !== confirmarPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      await handleRegister(
        {
          nombre: nombreRestaurante,
          direccion,
          codigoPostal,
        },
        {
          nombre,
          apellido,
          email,
          telefono,
          password,
        }
      );

      Alert.alert(
        '✅ Registro exitoso',
        'Tu restaurante ha sido creado. Verifica tu email para activar tu cuenta.'
      );

      router.navigate('/(auth)/login')
    } catch {
      Alert.alert('Error', error || 'Ocurrió un problema al registrar el restaurante.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar restaurante y manager</Text>

      <Text style={styles.sectionTitle}>Datos del restaurante</Text>
      <TextInput
        placeholder="Nombre del restaurante"
        style={styles.input}
        value={nombreRestaurante}
        onChangeText={setNombreRestaurante}
      />
      <TextInput
        placeholder="Dirección"
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        placeholder="Código Postal"
        style={styles.input}
        value={codigoPostal}
        onChangeText={setCodigoPostal}
        keyboardType="numeric"
      />

      <Text style={styles.sectionTitle}>Datos del manager</Text>
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
        placeholder="Teléfono"
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
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
        title={loading ? 'Registrando...' : 'Registrar restaurante'}
        onPress={onSubmit}
        disabled={loading}
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
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default RegisterManager;
