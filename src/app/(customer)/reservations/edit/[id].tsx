// src/app/(customer)/reservations/edit/[id].tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IUpdateReservationDTO } from '@delatte/shared/dtos';
import { getReservationById, updateReservation } from '@features/reservation/services/reservationBaseApiService';

const EditReservationScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<IUpdateReservationDTO>({
    fecha: '',
    horario: '',
    cantidadAdultos: 1,
    cantidadNinios: 0,
    notas: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getReservationById(id!);
        setForm({
          fecha: data.fecha.slice(0, 10),
          horario: data.horario,
          cantidadAdultos: data.cantidadAdultos,
          cantidadNinios: data.cantidadNinios,
          notas: data.notas || '',
        });
      } catch (err) {
        Alert.alert('Error', 'No se pudo cargar la reserva.');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReservation();
  }, [id]);

  const handleChange = (key: keyof IUpdateReservationDTO, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await updateReservation(id!, form);
      Alert.alert('Éxito', 'Reserva actualizada.');
      router.back();
    } catch {
      Alert.alert('Error', 'No se pudo actualizar la reserva.');
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={form.fecha} onChangeText={(text) => handleChange('fecha', text)} />

      <Text style={styles.label}>Horario (HH:mm)</Text>
      <TextInput style={styles.input} value={form.horario} onChangeText={(text) => handleChange('horario', text)} />

      <Text style={styles.label}>Cantidad de Adultos</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={String(form.cantidadAdultos)} onChangeText={(text) => handleChange('cantidadAdultos', Number(text))} />

      <Text style={styles.label}>Cantidad de Niños</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={String(form.cantidadNinios)} onChangeText={(text) => handleChange('cantidadNinios', Number(text))} />

      <Text style={styles.label}>Notas</Text>
      <TextInput style={styles.input} value={form.notas} onChangeText={(text) => handleChange('notas', text)} />

      <Button title="Guardar Cambios" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
  },
});

export default EditReservationScreen;
