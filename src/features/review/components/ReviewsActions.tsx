/**
 * 🔧 Componente `ReviewsActions`
 *
 * Muestra los botones "Editar" y "Eliminar" para una reseña,
 * solo si el usuario autenticado es un `customer` y es el autor de la reseña.
 *
 * ✅ Seguridad:
 * - No renderiza nada si no es el dueño (internamente protegido por `isOwner`)
 *
 * Se usa típicamente dentro de `ReviewCard` en la pantalla de "Mis Reseñas".
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IReviewResponseDTO } from '@delatte/shared/dtos';
import { useAuthContext } from 'src/core/context/AuthContext';
import { useRouter } from 'expo-router';

type Props = {
  review: IReviewResponseDTO;
  onDelete: () => void;
};

const ReviewsActions = ({ review, onDelete }: Props) => {
  const { user } = useAuthContext();
  const router = useRouter();

  const isOwner =
    user?.role === 'customer' && review.usuario._id === user._id;

  if (!isOwner) return null;

  const handleEdit = () => {
    router.push(`/reviews/edit/${review._id}`);
  };

  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={handleEdit} style={styles.button}>
        <Text style={styles.buttonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={[styles.button, styles.delete]}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#4B9CD3',
  },
  delete: {
    backgroundColor: '#D9534F',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default ReviewsActions;
