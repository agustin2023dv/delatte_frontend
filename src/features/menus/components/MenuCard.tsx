/**
 * 🧩 Componente `MenuCard`
 *
 * Muestra información general de un menú y permite expandir para ver los ítems.
 * Si el usuario autenticado es el manager del restaurante, se muestran botones para editar/eliminar el menú y sus ítems.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IMenuResponseDTO } from '@delatte/shared/dtos';
import MenuItemCard from './MenuItemCard';
import EditMenuItemModal from './EditMenuItemModal';
import { useAuthContext } from 'src/core/context/AuthContext';
import { IMenuItemWithId } from '@delatte/shared/interfaces/Menu/IMenuItemWithId';

interface Props {
  menu: IMenuResponseDTO;
  onEditMenu?: () => void;
  onDeleteMenu?: () => void;
  onEditItem?: (itemId: string, updatedItem: IMenuItemWithId) => void;
  onDeleteItem?: (itemId: string) => void;
}

const MenuCard = ({
  menu,
  onEditMenu,
  onDeleteMenu,
  onEditItem,
  onDeleteItem,
}: Props) => {
  const { userId, userRole } = useAuthContext();
  const [expanded, setExpanded] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const isMyRestaurant =
    userRole === 'manager' &&
    (menu.restaurante.managerPrincipal === userId ||
      (menu.restaurante.coManagers ?? []).includes(userId ?? ''));

  const handleEditItem = (updatedItem: IMenuItemWithId) => {
    if (onEditItem) {
      onEditItem(updatedItem._id, updatedItem);
    }
    setEditingItemId(null); // Cierra el modal
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{menu.tipo}</Text>
          <Text style={styles.subtitle}>Ítems: {menu.items.length}</Text>
        </View>

        {isMyRestaurant && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEditMenu}>
              <Text style={styles.actionText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDeleteMenu}>
              <Text style={styles.actionText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => setExpanded(prev => !prev)}>
        <Text style={styles.toggle}>
          {expanded ? 'Ocultar ítems ▲' : 'Ver ítems ▼'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.itemsContainer}>
          {menu.items.map(item => (
            <MenuItemCard
              key={item._id}
              item={item}
              isAuthorized={isMyRestaurant}
              onEdit={() => setEditingItemId(item._id)}
              onDelete={onDeleteItem ? () => onDeleteItem(item._id) : undefined}
            />
          ))}
        </View>
      )}

      {/* Modal de edición */}
      {editingItemId && (
        <EditMenuItemModal
          item={menu.items.find(i => i._id === editingItemId)!}
          visible={!!editingItemId}
          onSave={handleEditItem}
          onClose={() => setEditingItemId(null)}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
  },
  actions: {
    alignItems: 'flex-end',
    gap: 4,
  },
  actionText: {
    color: '#007bff',
    fontWeight: '500',
  },
  toggle: {
    marginTop: 8,
    color: '#007bff',
    fontWeight: '500',
  },
  itemsContainer: {
    marginTop: 10,
    gap: 8,
  },
});

export default MenuCard;
