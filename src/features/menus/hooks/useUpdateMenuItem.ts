import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMenuItem } from '../services/menuItemApiService';
import { IUpdateMenuItemDTO } from '@delatte/shared/dtos';

export const useUpdateMenuItem = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: IUpdateMenuItemDTO) => updateMenuItem(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', restaurantId] });
    },
  });
};
