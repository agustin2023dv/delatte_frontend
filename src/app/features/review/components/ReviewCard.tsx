import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IReviewResponseDTO } from '@delatte/shared/dtos';

interface Props {
  review: IReviewResponseDTO;
}

const ReviewCard: React.FC<Props> = ({ review }) => {
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
      {/* Calificación */}
      <Text style={styles.title}>⭐ {calificacion}/5</Text>

      {/* Comentario */}
      <Text style={styles.comment}>"{comentario}"</Text>

      {/* Información del usuario (nombre y apellido) */}
      {usuario?.nombre && (
        <Text style={styles.meta}>👤 {usuario.nombre} {usuario.apellido}</Text>
      )}

      {/* Nombre del restaurante */}
      {restaurante?.nombre && (
        <Text style={styles.meta}>📍 {restaurante.nombre}</Text>
      )}

      {/* Fecha formateada */}
      <Text style={styles.meta}>🗓️ {formattedDate}</Text>
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