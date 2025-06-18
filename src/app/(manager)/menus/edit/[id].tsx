// src/app/(manager)/menus/edit/[id].tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUpdateMenu } from '@features/menus/hooks/useUpdateMenu';
import { useGetMenuById } from '@features/menus/hooks/useGetMenuById';
import { IUpdateMenuDTO } from '@delatte/shared/dtos';
import { Ionicons } from '@expo/vector-icons';

let PickerComponent: any;
if (Platform.OS === 'web') {
  const Select = require('react-select').default;
  PickerComponent = Select;
} else {
  const { Picker } = require('@react-native-picker/picker');
  PickerComponent = Picker;
}

const isWeb = Platform.OS === 'web';
const ITEMS_PER_PAGE = 5;

const allowedTipos = ['Comida', 'Bebidas', 'Postres'] as const;
type TipoMenu = typeof allowedTipos[number];

const isTipoValido = (value: any): value is TipoMenu =>
  allowedTipos.includes(value);

interface Option {
  value: TipoMenu | undefined;
  label: string;
}

const optionsTipoMenu: Option[] = [
  { value: undefined, label: 'Seleccionar tipo' },
  { value: 'Comida', label: 'Comida' },
  { value: 'Bebidas', label: 'Bebidas' },
  { value: 'Postres', label: 'Postres' },
];

type EditableMenuItem = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
};

const EditMenuScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: menu, isLoading } = useGetMenuById(id!);
  const updateMenuMutation = useUpdateMenu();

  const [form, setForm] = useState<IUpdateMenuDTO>({
    tipo: undefined,
    items: [],
  });

  const [editingItem, setEditingItem] = useState<EditableMenuItem | null>(null);
  const [newItem, setNewItem] = useState<Omit<EditableMenuItem, '_id'>>({
    nombre: '',
    descripcion: '',
    precio: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const paginatedItems = form.items?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ) || [];
  const totalPages = Math.ceil((form.items?.length ?? 0) / ITEMS_PER_PAGE);

  useEffect(() => {
    if (menu) {
      const itemsWithId: EditableMenuItem[] = menu.items.map((item, index) => ({
        ...item,
        _id: index.toString(),
      }));
      setForm({ tipo: menu.tipo, items: itemsWithId });
    }
  }, [menu]);

  const handleSubmit = () => {
    if (!form.tipo || !isTipoValido(form.tipo)) {
      Alert.alert('Error', 'Debes seleccionar un tipo de menú válido');
      return;
    }

    if (!form.items || form.items.length === 0) {
      Alert.alert('Error', 'El menú debe tener al menos un ítem');
      return;
    }

    updateMenuMutation.mutate(
      {
        menuId: id!,
        data: {
          tipo: form.tipo,
          items: form.items.map(({ nombre, descripcion, precio }) => ({
            nombre,
            descripcion,
            precio,
          })),
        },
      },
      {
        onSuccess: () => {
          Alert.alert('Éxito', 'Menú actualizado correctamente');
          router.back();
        },
        onError: (error) => {
          console.error('Error updating menu:', error);
          Alert.alert('Error', 'No se pudo actualizar el menú');
        },
      }
    );
  };

  const handleAddItem = () => {
    if (!newItem.nombre || newItem.precio <= 0) {
      Alert.alert('Error', 'Nombre y precio son requeridos');
      return;
    }

    setForm((prev) => ({
      ...prev,
      items: [...(prev.items ?? []), { ...newItem, _id: Date.now().toString() }],
    }));
    setNewItem({ nombre: '', descripcion: '', precio: 0 });
  };

  const handleUpdateItem = () => {
    if (!editingItem || !editingItem._id) return;

    setForm((prev) => ({
      ...prev,
      items: (prev.items ?? []).map((item) =>
        item._id === editingItem._id ? editingItem : item
      ),
    }));
    setEditingItem(null);
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este ítem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setForm((prev) => ({
              ...prev,
              items: (prev.items ?? []).filter((item) => item._id !== itemId),
            }));
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Menú</Text>

      <Text style={styles.label}>Tipo de menú</Text>
      {isWeb ? (
        <PickerComponent
          options={optionsTipoMenu}
          value={optionsTipoMenu.find((opt) => opt.value === form.tipo)}
          onChange={(selectedOption: Option) => {
            if (isTipoValido(selectedOption.value)) {
              setForm({ ...form, tipo: selectedOption.value });
            }
          }}
          styles={{
            control: (base: any) => ({
              ...base,
              borderColor: '#ccc',
              borderRadius: 4,
              marginBottom: 16,
            }),
            menu: (base: any) => ({ ...base, zIndex: 9999 }),
          }}
        />
      ) : (
        <PickerComponent
          selectedValue={form.tipo}
          onValueChange={(value: string) => {
            if (isTipoValido(value)) {
              setForm({ ...form, tipo: value });
            }
          }}
        >
          <PickerComponent.Item label="Seleccionar tipo" value={undefined} />
          <PickerComponent.Item label="Comida" value="Comida" />
          <PickerComponent.Item label="Bebidas" value="Bebidas" />
          <PickerComponent.Item label="Postres" value="Postres" />
        </PickerComponent>
      )}

      <Text style={styles.sectionTitle}>Ítems del Menú</Text>

      {paginatedItems.map((item) => (
        <View key={item._id} style={styles.itemCard}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.nombre}</Text>
            <Text style={styles.itemPrice}>${item.precio.toFixed(2)}</Text>
            {item.descripcion && <Text style={styles.itemDesc}>{item.descripcion}</Text>}
          </View>
          <View style={styles.itemActions}>
            <TouchableOpacity onPress={() => setEditingItem(item)}>
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item._id!)}>
              <Ionicons name="trash" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {totalPages > 1 && (
        <View style={styles.pagination}>
          <Button
            title="Anterior"
            disabled={currentPage === 1}
            onPress={() => setCurrentPage((prev) => prev - 1)}
          />
          <Text style={styles.pageIndicator}>{`Página ${currentPage} de ${totalPages}`}</Text>
          <Button
            title="Siguiente"
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage((prev) => prev + 1)}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>
        {editingItem ? 'Editar Ítem' : 'Agregar Nuevo Ítem'}
      </Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={editingItem?.nombre || newItem.nombre}
        onChangeText={(text) =>
          editingItem
            ? setEditingItem({ ...editingItem, nombre: text })
            : setNewItem({ ...newItem, nombre: text })
        }
        placeholder="Nombre del ítem"
      />

      <Text style={styles.label}>Descripción (Opcional)</Text>
      <TextInput
        style={styles.input}
        value={editingItem?.descripcion || newItem.descripcion}
        onChangeText={(text) =>
          editingItem
            ? setEditingItem({ ...editingItem, descripcion: text })
            : setNewItem({ ...newItem, descripcion: text })
        }
        placeholder="Descripción del ítem"
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={
          editingItem
            ? editingItem.precio.toString()
            : newItem.precio.toString()
        }
        onChangeText={(text) => {
          const price = parseFloat(text) || 0;
          editingItem
            ? setEditingItem({ ...editingItem, precio: price })
            : setNewItem({ ...newItem, precio: price });
        }}
        keyboardType="numeric"
        placeholder="Precio"
      />

      {editingItem ? (
        <View style={styles.buttonRow}>
          <Button title="Cancelar" onPress={() => setEditingItem(null)} color="#999" />
          <Button title="Actualizar Ítem" onPress={handleUpdateItem} color="#007AFF" />
        </View>
      ) : (
        <Button title="Agregar Ítem" onPress={handleAddItem} color="#34C759" />
      )}

      <View style={styles.spacer} />
      <Button title="Guardar Cambios en Menú" onPress={handleSubmit} color="#2980b9" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
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
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
    fontSize: 16,
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#34C759',
    marginVertical: 4,
  },
  itemDesc: {
    color: '#666',
    fontSize: 14,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  pageIndicator: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  spacer: {
    height: 20,
  },
});

export default EditMenuScreen;
