// src/app/features/reviews/hooks/useAddReviewReply.ts

import { useMutation } from '@tanstack/react-query';
import { addReviewReply } from '../services/reviewBaseApiService';
import { Alert } from 'react-native';

/**
 * Hook para agregar una respuesta a una reseña.
 */
export const useAddReviewReply = (reviewId: string, onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: (mensaje: string) => addReviewReply(reviewId, mensaje),
    onSuccess: () => {
      Alert.alert('✅ Respuesta enviada', 'Tu respuesta fue agregada correctamente.');
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      console.error('[❌ ERROR AL RESPONDER]', error);
      Alert.alert('❌ Error', error?.response?.data?.message || 'No se pudo enviar la respuesta.');
    },
  });
};
