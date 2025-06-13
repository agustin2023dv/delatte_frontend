// src/app/(manager)/reservations/create/index.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

// Components
import { DateTimePicker } from '@shared/components/ui/DateTimePicker';

// Hooks
import { useCreateReservation } from '../../../../features/reservation/hooks/useCreateReservation';
import { useGetRestaurantsByManager } from '@features/restaurant/hooks/useGetRestaurantsByManager';

// DTO
import { ICreateReservationDTO } from '@delatte/shared/dtos';

// UI
import { Dropdown } from 'react-native-element-dropdown';

// Toast
import Toast from 'react-native-toast-message';

// Context
import { useRouter } from 'expo-router';
import { useAuthContext } from 'src/core/context/AuthContext';

// Definimos los campos que pueden tener errores
type FormErrorFields = keyof Omit<ICreateReservationDTO, 'restauranteId'> | 'restauranteId';

interface FormErrors extends Partial<Record<FormErrorFields, string>> {}

export default function CreateReservationByManagerScreen() {
  const router = useRouter();
  const { user } = useAuthContext();
  const managerId = user?._id;

  const { createReservation } = useCreateReservation();

  // Estados del formulario
  const [form, setForm] = useState<Omit<ICreateReservationDTO, 'restauranteId'>>({
    fecha: '',
    horario: '',
    cantidadAdultos: 1,
    cantidadNinios: 0,
    notas: '',
    usuarioId: '',
  });

  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  if (!managerId) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>No se encontró el ID del manager.</Text>
      </View>
    );
  }

  const { restaurants, loading, error } = useGetRestaurantsByManager(managerId);

  const handleChange = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fecha) newErrors.fecha = 'La fecha es obligatoria.';
    if (!form.horario) newErrors.horario = 'El horario es obligatorio.';
    if (form.cantidadAdultos < 1)
      newErrors.cantidadAdultos = 'Debe haber al menos un adulto.';
    if (!selectedRestaurantId) newErrors.restauranteId = 'Selecciona un restaurante.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await createReservation({
        restauranteId: selectedRestaurantId!,
        ...form,
      });
      Toast.show({
        type: 'success',
        text1: 'Éxito',
        text2: 'Reserva creada correctamente.',
      });
      router.back(); // Volver a la lista
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo crear la reserva.',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Cargando restaurantes...</Text>
      </View>
    );
  }

  if (error || !restaurants.length) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>
          {error || 'No tienes restaurantes asociados.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Reserva</Text>

      {/* Selector de restaurante */}
      <Text style={styles.label}>Selecciona un restaurante</Text>
      <Dropdown
        style={styles.dropdown}
        data={restaurants}
        labelField="identity.nombre"
        valueField="_id"
        placeholder="Selecciona un restaurante"
        value={selectedRestaurantId}
        onChange={(item) => {
          setSelectedRestaurantId(item._id);
        }}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.dropdownText}
        inputSearchStyle={styles.dropdownInputSearch}
        containerStyle={styles.dropdownContainer}
      />
      {errors.restauranteId && (
        <Text style={styles.error}>{errors.restauranteId}</Text>
      )}

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
        value={String(form.cantidadAdultos)}
        onChangeText={(text) => handleChange('cantidadAdultos', parseInt(text) || 0)}
      />
      {errors.cantidadAdultos && (
        <Text style={styles.error}>{errors.cantidadAdultos}</Text>
      )}

      {/* Niños */}
      <Text style={styles.label}>Niños</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(form.cantidadNinios)}
        onChangeText={(text) => handleChange('cantidadNinios', parseInt(text) || 0)}
      />

      {/* Notas */}
      <Text style={styles.label}>Notas</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={form.notas}
        onChangeText={(text) => handleChange('notas', text)}
      />

      {/* Botón de submit */}
      <Button title="Crear Reserva" onPress={handleSubmit} color="#2980b9" />
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
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#777',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownInputSearch: {
    height: 40,
    fontSize: 16,
  },
  dropdownContainer: {
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});