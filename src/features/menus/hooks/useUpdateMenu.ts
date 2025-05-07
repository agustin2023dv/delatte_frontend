import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMenu } from '../services/menuBaseApiService';

export const useUpdateMenu = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, data }: { menuId: string; data: any }) =>
      updateMenu(menuId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', restaurantId] });
    },
  });
};
