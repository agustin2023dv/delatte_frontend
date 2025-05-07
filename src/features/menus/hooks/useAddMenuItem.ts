import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMenuItem } from '../services/menuItemApiService';
import { IAddMenuItemDTO } from '@delatte/shared/dtos';

export const useAddMenuItem = (restaurantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: IAddMenuItemDTO) => addMenuItem(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', restaurantId] });
    },
  });
};
