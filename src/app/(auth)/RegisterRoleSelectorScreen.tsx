/**
 * 🧭 Pantalla `RegisterRoleSelectorScreen`
 *
 * Permite al usuario elegir el tipo de cuenta que desea crear:
 * - Cliente (registro simple con opción Google)
 * - Manager de restaurante (registro + creación de restaurante)
 *
 * 🔗 Navega a:
 * - `Register` → Registro de cliente
 * - `RegisterManager` → Registro de manager + restaurante
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DelatteButton from '@ui/DelatteButton';
import { useNavigation } from '@react-navigation/native';

const RegisterRoleSelectorScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué tipo de cuenta deseas crear?</Text>

      <DelatteButton
        title="Cuenta de Cliente"
        onPress={() => navigation.navigate('Register')}
      />

      <DelatteButton
        title="Cuenta de Manager"
        onPress={() => navigation.navigate('RegisterManager')}
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
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default RegisterRoleSelectorScreen;
