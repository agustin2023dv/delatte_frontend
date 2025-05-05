// src/shared/components/reservations/ReservationCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IReservationResponseDTO } from '@delatte/shared/dtos';
import ReservationActions from './ReservationActions';

type Props = {
  reservation: IReservationResponseDTO;
};

const ReservationCard: React.FC<Props> = ({ reservation }) => {
  const {
    restaurante,
    fecha,
    horario,
    cantidadAdultos,
    cantidadNinios,
    notas,
    estado,
    createdAt,
  } = reservation;

  const formattedDate = new Date(fecha).toLocaleDateString();
  const formattedCreated = new Date(createdAt).toLocaleString();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{restaurante.nombre}</Text>
      <Text style={styles.meta}>
        📍 {restaurante.direccion}
      </Text>
      <Text style={styles.meta}>
        🗓️ {formattedDate} — 🕒 {horario}
      </Text>
      <Text style={styles.meta}>
        👤 Adultos: {cantidadAdultos} — 🧒 Niños: {cantidadNinios}
      </Text>
      {notas && <Text style={styles.notes}>📝 {notas}</Text>}
      <Text style={styles.status}>Estado: {estado}</Text>
      <ReservationActions reservation={reservation} />
      <Text style={styles.createdAt}>📅 Creada: {formattedCreated}</Text>
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
  status: {
    marginTop: 8,
    fontWeight: '500',
    color: '#333',
  },
  createdAt: {
    marginTop: 10,
    fontSize: 12,
    color: '#888',
  },
});

export default ReservationCard;
