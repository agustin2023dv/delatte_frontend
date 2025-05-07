import { useQuery } from '@tanstack/react-query';
import { getMenusByRestaurant } from '../services/menuBaseApiService';

export const useGetMenusByRestaurant = (restaurantId: string) => {
  return useQuery({
    queryKey: ['menus', restaurantId],
    queryFn: () => getMenusByRestaurant(restaurantId),
    enabled: !!restaurantId,
  });
};
