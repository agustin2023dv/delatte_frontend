/**
 * ℹ️ Componente `RestaurantInfoBlock`
 *
 * Muestra la información pública y administrativa de un restaurante,
 * incluyendo:
 * - Carrusel de fotos
 * - Cabecera (nombre, dirección, contacto, estado, rating)
 * - Información extendida (horarios, etiquetas, capacidad, actualización)
 * - Menús (visualización y edición si es manager)
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { IRestaurant, IUserRole } from '@delatte/shared/interfaces';
import { useGetRestaurantGallery } from '@features/restaurant/hooks/useGetRestaurantGallery';
import RestaurantHeaderInfo from './RestaurantHeaderInfo';
import RestaurantExtraInfo from './RestaurantExtraInfo';
import RestaurantMenusBlock from './RestaurantMenusBlock';
import RestaurantPhotoCarousel from '@features/restaurant/components/restaurant-photo-carousel/RestaurantPhotoCarousel';
type Props = {
  restaurant: IRestaurant;
  viewerRole: Extract<IUserRole['role'], 'customer' | 'manager'>;
};

const RestaurantInfoBlock = ({ restaurant, viewerRole }: Props) => {
  const restaurantId = `${restaurant._id}`;
  const { data: photos, isLoading: loadingPhotos } = useGetRestaurantGallery(restaurantId);

  return (
    <View style={styles.container}>
      {loadingPhotos && <ActivityIndicator />}
      
      {Array.isArray(photos) && photos.length > 0 && (
        <RestaurantPhotoCarousel photos={photos} />
      )}

      <RestaurantHeaderInfo restaurant={restaurant} />
      <RestaurantExtraInfo restaurant={restaurant} viewerRole={viewerRole} />
      <RestaurantMenusBlock restaurantId={restaurantId} viewerRole={viewerRole} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginBottom: 20,
  },
});

export default RestaurantInfoBlock;
