import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useAuthContext } from 'src/core/context/AuthContext';
import { useGetRestaurantsByManager } from '@features/restaurant/hooks/useGetRestaurantsByManager';
import { useGetMenusByRestaurant } from '@features/menus/hooks/useGetMenusByRestaurant';
import MenuCard from '@features/menus/components/MenuCard';
import { useDeleteMenu } from '@features/menus/hooks/useDeleteMenu';
import { useDeleteMenuItem } from '@features/menus/hooks/useDeleteMenuItem';
import { useUpdateMenuItem } from '@features/menus/hooks/useUpdateMenuItem';
import { IUpdateMenuItemDTO, IRemoveMenuItemDTO } from '@delatte/shared/dtos';
import { IRestaurant } from '@delatte/shared/interfaces'; 
import { useRouter } from 'expo-router';

const ManagerMenusScreen = () => {
   const router = useRouter();  
  const { user } = useAuthContext();
  const managerId = user?._id ?? '';

  const {
    restaurants,
    loading: loadingRestaurants,
    error: errorRestaurants,
    refetch: refetchRestaurants
  } = useGetRestaurantsByManager(managerId);

  const renderRestaurantMenus = (restaurant: IRestaurant) => {
    const restaurantId = restaurant._id.toString();
    const { data: menus, isLoading, error } = useGetMenusByRestaurant(restaurantId);

    // Inicializar hooks con el restaurantId
    const deleteMenuMutation = useDeleteMenu(restaurantId);
    const deleteItemMutation = useDeleteMenuItem(restaurantId);
    const updateItemMutation = useUpdateMenuItem(restaurantId);

    const handleDeleteMenu = (menuId: string) => {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que deseas eliminar este menú?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Eliminar', 
            style: 'destructive',
            onPress: () => {
              deleteMenuMutation.mutate(menuId, {
                onSuccess: () => refetchRestaurants()
              });
            }
          }
        ]
      );
    };


    const handleDeleteItem = (itemId: string) => {
      const deleteData: IRemoveMenuItemDTO = {
        menuId: restaurantId,
        itemId: itemId
      };
      
      Alert.alert(
        'Eliminar ítem',
        '¿Confirmas que deseas eliminar este ítem del menú?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Eliminar', 
            style: 'destructive',
            onPress: () => deleteItemMutation.mutate(deleteData)
          }
        ]
      );
    };

    const handleEditItem = (itemId: string, updatedItem: any) => {
      const updateData: IUpdateMenuItemDTO = {
        menuId: restaurantId,
        itemId: itemId,
        item: {
          nombre: updatedItem.nombre,
          descripcion: updatedItem.descripcion,
          precio: updatedItem.precio
        }
      };
      
      updateItemMutation.mutate(updateData);
    };

       const handleEditMenu = (menuId: string) => {
            router.push(`/menus/edit/${menuId}`);
    };

    return (
      <View key={restaurantId} style={styles.section}>
        <Text style={styles.restaurantName}>{restaurant.identity.nombre}</Text>

        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : error ? (
          <Text style={styles.error}>Error al cargar los menús</Text>
        ) : menus?.length ? (
          menus.map((menu) => (
            <MenuCard
              key={menu._id.toString()}
              menu={menu}
              onDeleteMenu={() => handleDeleteMenu(menu._id)}
              onEditMenu={() => handleEditMenu(menu._id)} 
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
            />
          ))
        ) : (
          <Text style={styles.empty}>No hay menús disponibles.</Text>
        )}
      </View>
    );
  };

  if (loadingRestaurants) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorRestaurants || !restaurants.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>
          {errorRestaurants || 'No gestionás ningún restaurante actualmente.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Menús por restaurante</Text>
      {restaurants.map((restaurant) => renderRestaurantMenus(restaurant))}
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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  empty: {
    color: '#777',
    fontStyle: 'italic',
    fontSize: 14,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

export default ManagerMenusScreen;