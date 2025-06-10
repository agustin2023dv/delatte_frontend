// src/shared/components/reservations/ReservationActions.tsx

import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { IReservationResponseDTO } from '@delatte/shared/dtos';
import { useRouter } from 'expo-router';
import { useMyReservations } from '../hooks/useMyReservations';
import { useCancelReservation } from '../hooks/useCancelReservation';

type Props = {
  reservation: IReservationResponseDTO;
};

const ReservationActions: React.FC<Props> = ({ reservation }) => {
  const { estado, _id } = reservation;
  const { refetch } = useMyReservations();
  const { cancelReservation } = useCancelReservation();
  const router = useRouter();

  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (isCancelling) return;

    setIsCancelling(true);
    try {
      await cancelReservation(_id);
      await refetch();
      Toast.show({
        type: 'success',
        text1: 'Éxito',
        text2: 'Reserva cancelada con éxito.',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo cancelar la reserva.',
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const handleEdit = () => {
    router.push({
      pathname: '/reservations/edit/[id]',
      params: { id: reservation._id },
    });
  };

  if (estado !== 'Confirmada') return null;

  return (
    <View style={styles.container}>
      <Button
        title={isCancelling ? 'Cancelando...' : 'Cancelar'}
        onPress={handleCancel}
        color="#c0392b"
        disabled={isCancelling}
      />
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