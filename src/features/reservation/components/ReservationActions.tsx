// src/shared/components/reservations/ReservationActions.tsx

import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { IReservationResponseDTO } from '@delatte/shared/dtos';
import { useRouter } from 'expo-router';
import { useMyReservations } from '../hooks/useMyReservations';
import { cancelReservation } from '../services/reservationBaseApiService';

type Props = {
  reservation: IReservationResponseDTO;
};

const ReservationActions: React.FC<Props> = ({ reservation }) => {
  const { estado, _id } = reservation;
  const { refetch } = useMyReservations();
  const router = useRouter();

  const handleCancel = async () => {
    try {
      await cancelReservation(_id);
      await refetch();
      Alert.alert('Éxito', 'Reserva cancelada con éxito.');
    } catch (err) {
      Alert.alert('Error', 'No se pudo cancelar la reserva.');
    }
  };

  const handleEdit = () => {
    router.push({
      pathname: '/reservations/edit/[id]',
      params: { id: reservation._id},
    });
  };

  if (estado !== 'Confirmada') return null;

  return (
    <View style={styles.container}>
      <Button title="Cancelar" onPress={handleCancel} color="#c0392b" />
      <View style={styles.spacer} />
      <Button title="Modificar" onPress={handleEdit} color="#2980b9" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  spacer: {
    width: 12,
  },
});

export default ReservationActions;
