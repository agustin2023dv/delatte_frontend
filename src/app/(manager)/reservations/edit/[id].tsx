// src/app/(manager)/reservations/edit/[id].tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';


import { useGetRestaurantsByManager } from '@features/restaurant/hooks/useGetRestaurantsByManager';
import { useUpdateReservation } from '@features/reservation/hooks/useUpdateReservation';
import { useGetReservationById } from '@features/reservation/hooks/useGetReservationById';

import { DateTimePicker } from '@shared/components/ui/DateTimePicker';
import { Dropdown } from 'react-native-element-dropdown';

import { IUpdateReservationDTO } from '@delatte/shared/dtos';
import { useAuthContext } from 'src/core/context/AuthContext';

export default function EditReservationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthContext();

  const { reservation, loading, error } = useGetReservationById(id);
  const mutation = useUpdateReservation();

  const {
    restaurants,
    loading: loadingRestaurants,
    error: errorRestaurants,
  } = useGetRestaurantsByManager(user?._id ?? '');

  const [form, setForm] = useState<Omit<IUpdateReservationDTO, 'restauranteId'>>({
    fecha: '',
    horario: '',
    cantidadAdultos: 1,
    cantidadNinios: 0,
    notas: '',
  });

  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  type ReservationErrors = Partial<Record<keyof Omit<IUpdateReservationDTO, 'restauranteId'>, string>>;
  const [errors, setErrors] = useState<ReservationErrors>({});

  useEffect(() => {
    if (reservation) {
      const { restaurante, ...rest } = reservation;
      setForm(rest);
      setSelectedRestaurantId(restaurante._id);
    }
  }, [reservation]);

  const handleChange = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: ReservationErrors = {};

    if (!form.fecha) newErrors.fecha = 'La fecha es obligatoria.';
    if (!form.horario) newErrors.horario = 'El horario es obligatorio.';
    if ((form.cantidadAdultos ?? 0) < 1)
      newErrors.cantidadAdultos = 'Debe haber al menos un adulto.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await mutation.mutateAsync({
        id,
        data: form,
      });
      router.back();
    } catch (error) {
      console.error('Error al actualizar', error);
    }
  };

  if (loading || loadingRestaurants) {
    return (
      <View style={styles.centered}>
        <Text>Cargando reserva...</Text>
      </View>
    );
  }

  if (error || errorRestaurants || !reservation) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>
          {error || errorRestaurants || 'No se pudo cargar la reserva.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Reserva</Text>

      {/* Selector de restaurante (solo visualización) */}
      <Text style={styles.label}>Restaurante actual</Text>
      <Dropdown
        style={styles.dropdown}
        data={restaurants}
        labelField="identity.nombre"
        valueField="_id"
        placeholder="Selecciona un restaurante"
        value={selectedRestaurantId}
        onChange={(item) => setSelectedRestaurantId(item._id)}
        disable
      />

      {/* Fecha */}
      <DateTimePicker
        mode="date"
        label="Fecha de reserva"
        value={new Date(form.fecha || Date.now())}
        onChange={(date) =>
          handleChange('fecha', date.toISOString().split('T')[0])
        }
      />
      {errors.fecha && <Text style={styles.error}>{errors.fecha}</Text>}

      {/* Horario */}
      <DateTimePicker
        mode="time"
        label="Horario de reserva"
        value={new Date(`2024-01-01T${form.horario}`)}
        onChange={(time) =>
          handleChange('horario', time.toTimeString().slice(0, 5))
        }
      />
      {errors.horario && <Text style={styles.error}>{errors.horario}</Text>}

      {/* Adultos */}
      <Text style={styles.label}>Adultos</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.cantidadAdultos ?? '')}
        onChangeText={(text) =>
          handleChange('cantidadAdultos', parseInt(text) || 0)
        }
      />

      {/* Niños */}
      <Text style={styles.label}>Niños</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.cantidadNinios ?? '')}
        onChangeText={(text) =>
          handleChange('cantidadNinios', parseInt(text) || 0)
        }
      />

      {/* Notas */}
      <Text style={styles.label}>Notas</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={form.notas ?? ''}
        onChangeText={(text) => handleChange('notas', text)}
      />

      {/* Botón de submit */}
      <Button title="Guardar Cambios" onPress={handleSubmit} color="#2980b9" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});