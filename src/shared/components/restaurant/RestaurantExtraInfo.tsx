/**
 * 📚 Componente `RestaurantExtraInfo`
 *
 * Muestra información extendida del restaurante:
 * - Horarios de atención
 * - Etiquetas (tags)
 * - Capacidad de mesas (si es manager)
 * - Última actualización (si es manager)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IRestaurant, IUserRole } from '@delatte/shared/interfaces';

interface Props {
  restaurant: IRestaurant;
  viewerRole: Extract<IUserRole['role'], 'customer' | 'manager'>;
}

const RestaurantExtraInfo = ({ restaurant, viewerRole }: Props) => {
  const { tradingHours, tags, capacity, metadata } = restaurant;

  const tagList = tags?.tags ?? [];

  return (
    <View style={styles.container}>
      {/* 📅 Horarios */}
      {tradingHours?.horarios?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horarios de atención</Text>
          {tradingHours.horarios.map((h, idx) => (
            <Text key={idx} style={styles.subItem}>
              {h.dia}: {h.horaApertura} - {h.horaCierre}
            </Text>
          ))}
        </View>
      )}

      {/* 🏷️ Etiquetas */}
      {tagList.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Etiquetas</Text>
          <Text style={styles.subItem}>{tagList.join(', ')}</Text>
        </View>
      )}

      {/* 🪑 Capacidad (solo manager) */}
      {viewerRole === 'manager' && capacity?.capacidadMesas?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capacidad de mesas</Text>
          {capacity.capacidadMesas.map((m, idx) => (
            <Text key={idx} style={styles.subItem}>
              {m.cantidad} mesas de {m.personasPorMesa} personas
            </Text>
          ))}
        </View>
      )}

      {/* 🕓 Última actualización (solo manager) */}
      {viewerRole === 'manager' && metadata?.ultimaActualizacion && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Última actualización: {new Date(metadata.ultimaActualizacion).toLocaleDateString()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginTop: 12,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  subItem: {
    fontSize: 13,
    color: '#444',
  },
});

export default RestaurantExtraInfo;
