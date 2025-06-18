// src/features/menus/hooks/useUpdateMenu.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMenu } from '../services/menuBaseApiService';

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, data }: { menuId: string; data: any }) =>
      updateMenu(menuId, data),
    onSuccess: (_, { menuId }) => {
      // Invalida solo el menú actualizado
      queryClient.invalidateQueries({ queryKey: ['menu', menuId] });
    },
  });
};
