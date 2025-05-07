import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMenu } from '../services/menuBaseApiService';

export const useCreateMenu = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', restaurantId] });
    },
  });
};
