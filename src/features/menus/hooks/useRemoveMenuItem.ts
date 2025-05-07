import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeMenuItem } from '../services/menuItemApiService';
import { IRemoveMenuItemDTO } from '@delatte/shared/dtos';

export const useRemoveMenuItem = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: IRemoveMenuItemDTO) => removeMenuItem(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', restaurantId] });
    },
  });
};
