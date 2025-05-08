/**
 * 🧩 Componente `MenuItemCard`
 * 
 * Muestra un ítem individual del menú, incluyendo nombre, descripción y precio.
 * Si `isAuthorized` es `true`, muestra botones para editar y eliminar.
 */

import { IMenuItemWithId } from '@delatte/shared/interfaces/Menu/IMenuItemWithId';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  item: IMenuItemWithId;
  isAuthorized: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MenuItemCard = ({ item, isAuthorized, onEdit, onDelete }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.price}>${item.precio.toFixed(2)}</Text>
      </View>

      <Text style={styles.description}>{item.descripcion}</Text>

      {isAuthorized && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.actionText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    fontWeight: '600',
    color: '#4caf50',
  },
  description: {
    color: '#666',
    fontSize: 13,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionText: {
    color: '#007bff',
    fontWeight: '500',
  },
});

export default MenuItemCard;
