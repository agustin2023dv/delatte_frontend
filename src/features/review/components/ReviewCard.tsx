/**
 * 💬 Componente `ReviewCard`
 *
 * Muestra visualmente una reseña completa:
 * - Calificación
 * - Comentario
 * - Autor (nombre y apellido)
 * - Restaurante
 * - Fecha
 *
 * Este componente es reutilizable en múltiples contextos:
 * - Vista pública de un restaurante (sin acciones)
 * - Vista de "Mis Reseñas" (puede recibir un slot `actionsComponent`)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IReviewResponseDTO } from '@delatte/shared/dtos';

interface Props {
  review: IReviewResponseDTO;
  actionsComponent?: React.ReactNode; // Slot opcional para botones Editar/Eliminar
}

const ReviewCard: React.FC<Props> = ({ review, actionsComponent }) => {
  const {
    comentario,
    calificacion,
    fecha,
    usuario, 
    restaurante,
  } = review;

  const formattedDate = new Date(fecha).toLocaleDateString();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>⭐ {calificacion}/5</Text>
      <Text style={styles.comment}>"{comentario}"</Text>

      {usuario?.nombre && (
        <Text style={styles.meta}>👤 {usuario.nombre} {usuario.apellido}</Text>
      )}

      {restaurante?.nombre && (
        <Text style={styles.meta}>📍 {restaurante.nombre}</Text>
      )}

      <Text style={styles.meta}>🗓️ {formattedDate}</Text>

      {actionsComponent && (
        <View style={{ marginTop: 10 }}>
          {actionsComponent}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 4,
  },
  comment: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  meta: {
    fontSize: 13,
    color: '#777',
  },
});

export default ReviewCard;