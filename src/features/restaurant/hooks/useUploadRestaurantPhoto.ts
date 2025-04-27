// src/app/features/restaurant/hooks/useUploadRestaurantPhoto.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cloudinarySignatureApiService } from '../../integrations/services/cloudinarySignatureApiService';
import { uploadToCloudinary } from '../../integrations/utils/uploadToCloudinary';
import { restaurantGalleryApiService } from '../services/restaurantGalleryApiService'; 

export const useUploadRestaurantPhoto = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      // 1. Obtener firma para la galería del restaurante
      const signatureData = await cloudinarySignatureApiService.getRestaurantGallerySignature();

      // 2. Subir imagen a Cloudinary
      const uploadedImage = await uploadToCloudinary(file, {
        timestamp: signatureData.timestamp,
        signature: signatureData.signature,
        folder: signatureData.folder || `restaurants/${restaurantId}/gallery`,
      });

      // 3. Agregar la URL subida a la galería en la base de datos
      await restaurantGalleryApiService.addPhotoUrlToGallery(
        restaurantId,
        uploadedImage.secure_url // asegurate que uploadToCloudinary devuelve `secure_url`
      );

      return uploadedImage.secure_url;
    },
    onSuccess: () => {
      // 4. Invalidar caché para recargar fotos
      queryClient.invalidateQueries({
        queryKey: ['restaurantGallery', restaurantId],
      });
    },
  });
};
