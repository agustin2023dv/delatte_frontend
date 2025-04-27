import { useQuery } from '@tanstack/react-query';
import { restaurantGalleryApiService } from '../services/restaurantGalleryApiService';

export const useGetRestaurantGallery = (restaurantId: string) => {
  return useQuery({
    queryKey: ['restaurantGallery', restaurantId],
    queryFn: () => restaurantGalleryApiService.getGalleryPhotos(restaurantId),
    enabled: !!restaurantId, // Solo corre si restaurantId existe
  });
};
