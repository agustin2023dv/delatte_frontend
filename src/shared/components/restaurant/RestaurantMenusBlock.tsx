/**
 * 🍽️ Componente `RestaurantMenusBlock`
 *
 * Muestra los menús del restaurante con soporte para:
 * - Ver menús (todos los roles)
 * - Crear menú (solo managers)
 * - Editar tipo de menú (solo managers)
 * - Eliminar menú (solo managers)
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { IMenuResponseDTO } from '@delatte/shared/dtos';
import { IUserRole } from '@delatte/shared/interfaces';
import { useDeleteMenu } from '@features/menus/hooks/useDeleteMenu';
import { useGetMenusByRestaurant } from '@features/menus/hooks/useGetMenusByRestaurant';
import { useUpdateMenu } from '@features/menus/hooks/useUpdateMenu';
import MenuCard from '@features/menus/components/MenuCard';
import EditMenuModal from '@features/menus/components/EditMenuModal';
import CreateMenuModal from '@features/menus/components/CreateMenuModal';

interface Props {
  restaurantId: string;
  viewerRole: Extract<IUserRole['role'], 'customer' | 'manager'>;
}

const RestaurantMenusBlock = ({ restaurantId, viewerRole }: Props) => {
  const { data: menus, isLoading } = useGetMenusByRestaurant(restaurantId);
  const { mutate: deleteMenu } = useDeleteMenu(restaurantId);
  const { mutate: updateMenu } = useUpdateMenu(restaurantId);

  const [editingMenu, setEditingMenu] = useState<IMenuResponseDTO | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleUpdateTipo = (newTipo: 'Comida' | 'Bebidas' | 'Postres') => {
    if (!editingMenu) return;
    updateMenu({ menuId: editingMenu._id, data: { tipo: newTipo } });
    setEditingMenu(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menús disponibles</Text>

      {isLoading && <ActivityIndicator size="small" />}

      {menus?.map(menu => (
        <MenuCard
          key={menu._id}
          menu={menu}
          onDeleteMenu={viewerRole === 'manager' ? () => deleteMenu(menu._id) : undefined}
          onEditMenu={viewerRole === 'manager' ? () => setEditingMenu(menu) : undefined}
        />
      ))}

      {viewerRole === 'manager' && (
        <Button title="Agregar menú" onPress={() => setShowCreateModal(true)} />
      )}

      {/* Modales */}
      <EditMenuModal
        visible={!!editingMenu}
        currentTipo={editingMenu?.tipo ?? 'Comida'}
        onClose={() => setEditingMenu(null)}
        onSave={handleUpdateTipo}
      />

      <CreateMenuModal
        visible={showCreateModal}
        restauranteId={restaurantId}
        onClose={() => setShowCreateModal(false)}
        onCreate={() => setShowCreateModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RestaurantMenusBlock;
