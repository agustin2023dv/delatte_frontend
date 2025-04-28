// src/app/features/integrations/utils/uploadPhotoFromDevice.ts

import * as ImagePicker from 'expo-image-picker';

/**
 * 📸 Permite al usuario seleccionar una imagen del dispositivo
 * y la convierte en un formato `File` para ser subida a Cloudinary.
 *
 * @returns Un `File` listo para subir, o `null` si el usuario cancela.
 */
export const uploadPhotoFromDevice = async (): Promise<File | null> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7, // Opcional: reducimos peso para optimizar carga
  });

  if (!result.canceled && result.assets.length > 0) {
    const asset = result.assets[0];
    
    const file = {
      uri: asset.uri,
      name: asset.fileName || 'photo.jpg',
      type: asset.type || 'image/jpeg',
    } as unknown as File; // Forzamos a tipo File para usarlo en el flujo de Cloudinary

    return file;
  }

  // Si el usuario cancela o no hay imagen
  return null;
};
