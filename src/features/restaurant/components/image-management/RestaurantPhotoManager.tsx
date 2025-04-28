// src/app/features/restaurant/components/image-management/RestaurantPhotoManager.tsx

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image, Alert } from 'react-native';
import { useGetRestaurantGallery } from '@features/restaurant/hooks/useGetRestaurantGallery';
import { useUploadRestaurantPhoto } from '@features/restaurant/hooks/useUploadRestaurantPhoto';
import { restaurantGalleryApiService } from '@features/restaurant/services/restaurantGalleryApiService';
import { uploadPhotoFromDevice } from '@features/integrations/utils/uploadPhotoFromDevice';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  restaurantId: string;
}

/**
 * 📸 Componente `RestaurantPhotoManager`
 * 
 * Permite gestionar la galería de un restaurante:
 * - Ver fotos actuales
 * - Subir nuevas fotos
 * - Eliminar fotos
 */
const RestaurantPhotoManager = ({ restaurantId }: Props) => {
  const { data: photos, isLoading: isLoadingGallery, refetch } = useGetRestaurantGallery(restaurantId);
  const { mutateAsync: uploadPhoto, isPending: isUploading } = useUploadRestaurantPhoto(restaurantId);

  const handlePickAndUpload = async () => {
    try {
      const file = await uploadPhotoFromDevice();
      if (file) {
        await uploadPhoto(file);
        await refetch();
        Alert.alert('Éxito', 'Imagen subida correctamente');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo subir la imagen');
    }
  };

  const handleDeletePhoto = async (photoUrl: string) => {
    try {
      await restaurantGalleryApiService.removePhotoFromGallery(restaurantId, photoUrl);
      await refetch();
      Alert.alert('Éxito', 'Imagen eliminada correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar la imagen');
    }
  };

  if (isLoadingGallery) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ gap: 16 }}>
      {/* Botón para subir una nueva imagen */}
      <TouchableOpacity
        onPress={handlePickAndUpload}
        style={{
          backgroundColor: '#007bff',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}
        disabled={isUploading}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {isUploading ? 'Subiendo...' : 'Subir nueva foto'}
        </Text>
      </TouchableOpacity>

      {/* Mostrar galería de fotos actuales */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        {photos?.map((photoUrl, idx) => (
          <View key={idx} style={{ position: 'relative' }}>
            <Image
              source={{ uri: photoUrl }}
              style={{ width: 120, height: 120, borderRadius: 8 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: 12,
                padding: 4,
              }}
              onPress={() => handleDeletePhoto(photoUrl)}
            >
              <Ionicons name="trash" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RestaurantPhotoManager;
