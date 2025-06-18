// src/app/(manager)/menus/create/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCreateMenu } from '@features/menus/hooks/useCreateMenu';
import { ICreateMenuDTO } from '@delatte/shared/dtos';
import { Ionicons } from '@expo/vector-icons';

const CreateMenuScreen = () => {
  const router = useRouter();
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const createMenuMutation = useCreateMenu(restaurantId);

  const [form, setForm] = useState<Omit<ICreateMenuDTO, 'restauranteId'>>({
    tipo: 'Comida',
    items: [],
  });

  const [newItem, setNewItem] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
  });

  const handleAddItem = () => {
    if (!newItem.nombre || newItem.precio <= 0) {
      Alert.alert('Error', 'Nombre y precio son requeridos');
      return;
    }

    setForm((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    setNewItem({ nombre: '', descripcion: '', precio: 0 });
  };

  const handleRemoveItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!form.tipo || form.items.length === 0) {
      Alert.alert('Error', 'Debes completar el tipo y al menos un ítem');
      return;
    }

    createMenuMutation.mutate(
      {
        restauranteId: restaurantId!,
        ...form,
      },
      {
        onSuccess: () => {
          Alert.alert('Éxito', 'Menú creado correctamente');
          router.back();
        },
        onError: () => Alert.alert('Error', 'No se pudo crear el menú'),
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nuevo Menú</Text>

      <Text style={styles.label}>Tipo de menú</Text>
      <TextInput
        style={styles.input}
        value={form.tipo}
        onChangeText={(text) => setForm({ ...form, tipo: text as any })}
        placeholder="Comida, Bebidas o Postres"
      />

      <Text style={styles.sectionTitle}>Ítems actuales ({form.items.length})</Text>
      {form.items.map((item, index) => (
        <View key={index} style={styles.itemCard}>
          <View>
            <Text style={styles.itemName}>{item.nombre}</Text>
            <Text style={styles.itemPrice}>${item.precio.toFixed(2)}</Text>
            {item.descripcion ? <Text>{item.descripcion}</Text> : null}
          </View>
          <TouchableOpacity onPress={() => handleRemoveItem(index)}>
            <Ionicons name="trash-outline" size={20} color="#ff3b30" />
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Agregar ítem</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={newItem.nombre}
        onChangeText={(text) => setNewItem((prev) => ({ ...prev, nombre: text }))}
        placeholder="Nombre del ítem"
      />

      <Text style={styles.label}>Descripción (opcional)</Text>
      <TextInput
        style={styles.input}
        value={newItem.descripcion}
        onChangeText={(text) => setNewItem((prev) => ({ ...prev, descripcion: text }))}
        placeholder="Descripción"
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={newItem.precio.toString()}
        onChangeText={(text) =>
          setNewItem((prev) => ({
            ...prev,
            precio: parseFloat(text) || 0,
          }))
        }
        keyboardType="numeric"
        placeholder="Precio"
      />

      <Button title="Agregar ítem" onPress={handleAddItem} color="#34C759" />

      <View style={{ height: 24 }} />
      <Button title="Crear Menú" onPress={handleSubmit} color="#2980b9" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
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
  itemCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: '600',
    fontSize: 16,
  },
  itemPrice: {
    color: '#34C759',
    fontWeight: 'bold',
  },
});

export default CreateMenuScreen;
