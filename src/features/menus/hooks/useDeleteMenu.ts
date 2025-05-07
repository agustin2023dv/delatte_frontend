import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMenu } from '../services/menuBaseApiService';

export const useDeleteMenu = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', restaurantId] });
    },
  });
};
