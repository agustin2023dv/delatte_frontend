import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IPromotionResponseDTO } from '@delatte/shared/dtos';

interface PromotionCardProps {
  promotion: IPromotionResponseDTO;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion }) => {
  const {
    titulo,
    descripcion,
    descuento,
    fechaInicio,
    fechaFin,
    estado,
    restaurante,
  } = promotion;

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={[styles.badge, estado === 'activa' ? styles.active : estado === 'expirada' ? styles.expired : styles.scheduled]}>
          {estado.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.discount}>{descuento}% OFF</Text>

      <Text style={styles.description} numberOfLines={2}>
        {descripcion}
      </Text>

      <Text style={styles.meta}>
        📍 {restaurante.nombre} — {restaurante.direccion}
      </Text>

      <Text style={styles.meta}>
        🗓️ {formatDate(fechaInicio)} → {formatDate(fechaFin)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  active: {
    backgroundColor: '#4CAF50',
  },
  expired: {
    backgroundColor: '#F44336',
  },
  scheduled: {
    backgroundColor: '#FF9800',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
    marginRight: 8,
  },
  discount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E91E63',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  meta: {
    fontSize: 13,
    color: '#777',
  },
});

export default PromotionCard;
