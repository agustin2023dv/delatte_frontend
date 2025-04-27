import React, { useState } from 'react';
import { View, Button, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUploadRestaurantPhoto } from '../../hooks/useUploadRestaurantPhoto';

interface Props {
  restaurantId: string;
}

const RestaurantPhotoUploaderMobile: React.FC<Props> = ({ restaurantId }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { mutateAsync, isPending } = useUploadRestaurantPhoto(restaurantId);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setPreview(asset.uri);

      const file = {
        uri: asset.uri,
        name: asset.fileName || 'photo.jpg',
        type: asset.type || 'image/jpeg',
      } as unknown as File;

      try {
        await mutateAsync(file);
        Alert.alert('Éxito', 'Imagen subida correctamente');
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al subir la imagen');
      }
    }
  };

  return (
    <View>
      {preview && (
        <Image
          source={{ uri: preview }}
          style={{ width: 200, height: 200, marginBottom: 16 }}
        />
      )}

      <Button
        title={isPending ? 'Subiendo...' : 'Subir imagen'}
        onPress={pickImage}
        disabled={isPending}
      />

      {isPending && <ActivityIndicator style={{ marginTop: 12 }} />}
    </View>
  );
};

export default RestaurantPhotoUploaderMobile;