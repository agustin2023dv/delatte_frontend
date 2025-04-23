import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IReservationResponseDTO } from '@delatte/shared/dtos';

interface Props {
  reservation: IReservationResponseDTO;
}

const ReservationCard: React.FC<Props> = ({ reservation }) => {
  const {
    restaurante,
    fecha,
    horario,
    cantidadAdultos,
    cantidadNinios,
    notas,
  } = reservation;

  const formattedDate = new Date(fecha).toLocaleDateString();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📍 {restaurante?.nombre}</Text>
      <Text style={styles.meta}>🗓️ {formattedDate} — 🕒 {horario}</Text>
      <Text style={styles.meta}>
        👤 Adultos: {cantidadAdultos} — 🧒 Niños: {cantidadNinios}
      </Text>
      {notas && (
        <Text style={styles.notes}>📝 {notas}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  notes: {
    marginTop: 6,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default ReservationCard;
