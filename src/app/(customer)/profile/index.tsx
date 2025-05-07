import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import { useUserProfile } from '@features/users/hooks/useUserProfile';
import { useUserAddresses } from '@features/users/hooks/useUserAddresses';

const ProfileScreen = () => {
  const { profile, loading, error } = useUserProfile();
  const {
    addresses,
    loading: loadingAddresses,
    error: addressError,
    addAddress,
    deleteAddress,
  } = useUserAddresses();

  const [newAddress, setNewAddress] = useState('');

  if (loading) return <ActivityIndicator size="large" style={styles.centered} />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!profile) return null;

  const { nombre, apellido, email, dob, phone, profileImage } = profile;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: profileImage }} style={styles.avatar} />

      <Text style={styles.label}>Nombre</Text>
      <Text style={styles.value}>
        {nombre} {apellido}
      </Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{email}</Text>

      {dob && (
        <>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <Text style={styles.value}>{new Date(dob).toLocaleDateString()}</Text>
        </>
      )}

      {phone && (
        <>
          <Text style={styles.label}>Teléfono</Text>
          <Text style={styles.value}>{phone}</Text>
        </>
      )}

      <View style={styles.addressSection}>
        <Text style={styles.label}>Direcciones</Text>

        {loadingAddresses ? (
          <ActivityIndicator />
        ) : addressError ? (
          <Text style={styles.error}>{addressError}</Text>
        ) : (
          addresses.map((address, index) => (
            <View key={index} style={styles.addressRow}>
              <Text style={styles.value}>• {address}</Text>
              <Button title="Eliminar" onPress={() => deleteAddress(address)} />
            </View>
          ))
        )}

        <TextInput
          placeholder="Nueva dirección"
          value={newAddress}
          onChangeText={setNewAddress}
          style={styles.input}
        />
        <Button
          title="Agregar dirección"
          onPress={async () => {
            if (newAddress.trim()) {
              await addAddress(newAddress.trim());
              setNewAddress('');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  addressSection: {
    marginTop: 30,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;
